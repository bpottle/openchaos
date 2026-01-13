use serde::{Deserialize, Serialize};
use std::env;

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct PullRequest {
    pub id: u64,
    pub number: u32,
    pub title: String,
    pub user: User,
    pub html_url: String,
    pub created_at: String,
    pub updated_at: String,
    #[serde(default)]
    pub reactions: Reactions,
}

#[derive(Debug, Serialize, Deserialize, Clone, Default)]
pub struct Reactions {
    #[serde(rename = "+1")]
    pub plus_one: u32,
    #[serde(rename = "-1")]
    pub minus_one: u32,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
struct GitHubReaction {
    content: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct User {
    pub login: String,
    pub avatar_url: String,
}

pub struct GitHubClient {
    client: reqwest::Client,
}

impl GitHubClient {
    pub fn new() -> Self {
        let mut headers = reqwest::header::HeaderMap::new();
        headers.insert(
            reqwest::header::USER_AGENT,
            reqwest::header::HeaderValue::from_static("openchaos-rust"),
        );
        headers.insert(
            reqwest::header::ACCEPT,
            reqwest::header::HeaderValue::from_static("application/vnd.github.v3+json"),
        );

        // Add GitHub token if available
        if let Ok(token) = env::var("GITHUB_TOKEN") {
            if let Ok(value) = reqwest::header::HeaderValue::from_str(&format!("Bearer {}", token)) {
                headers.insert(reqwest::header::AUTHORIZATION, value);
            }
        }

        Self {
            client: reqwest::Client::builder()
                .default_headers(headers)
                .build()
                .unwrap(),
        }
    }

    pub async fn get_open_pull_requests(
        &self,
        owner: &str,
        repo: &str,
    ) -> Result<Vec<PullRequest>, Box<dyn std::error::Error + Send + Sync>> {
        let mut all_pulls = Vec::new();
        let mut page = 1;

        // Fetch all pages of PRs
        loop {
            let url = format!(
                "https://api.github.com/repos/{}/{}/pulls?state=open&per_page=100&page={}",
                owner, repo, page
            );

            let response = self.client.get(&url).send().await?;

            if !response.status().is_success() {
                return Err(format!("GitHub API error: {}", response.status()).into());
            }

            let pulls: Vec<PullRequest> = response.json().await?;
            
            if pulls.is_empty() {
                break;
            }

            let batch_size = pulls.len();
            all_pulls.extend(pulls);

            if batch_size < 100 {
                break;
            }

            page += 1;
        }

        let reaction_futures: Vec<_> = all_pulls
            .iter()
            .map(|pr| self.get_pr_reactions(owner, repo, pr.number))
            .collect();

        let reactions_results = futures::future::join_all(reaction_futures).await;

        let mut pulls: Vec<PullRequest> = all_pulls
            .into_iter()
            .zip(reactions_results.into_iter())
            .map(|(mut pr, reactions_result)| {
                if let Ok(reactions) = reactions_result {
                    pr.reactions = reactions;
                }
                pr
            })
            .collect();

        // Sort by votes (descending), then by creation date (newest first)
        pulls.sort_by(|a, b| {
            let votes_a = a.reactions.plus_one as i32 - a.reactions.minus_one as i32;
            let votes_b = b.reactions.plus_one as i32 - b.reactions.minus_one as i32;
            
            if votes_b != votes_a {
                votes_b.cmp(&votes_a)
            } else {
                b.created_at.cmp(&a.created_at)
            }
        });

        Ok(pulls)
    }

    async fn get_pr_reactions(
        &self,
        owner: &str,
        repo: &str,
        pr_number: u32,
    ) -> Result<Reactions, Box<dyn std::error::Error + Send + Sync>> {
        let mut all_reactions = Vec::new();
        let mut page = 1;

        // Fetch all pages of reactions
        loop {
            let url = format!(
                "https://api.github.com/repos/{}/{}/issues/{}/reactions?per_page=100&page={}",
                owner, repo, pr_number, page
            );

            let response = self.client
                .get(&url)
                .header(
                    reqwest::header::ACCEPT,
                    "application/vnd.github.squirrel-girl-preview+json",
                )
                .send()
                .await?;

            if !response.status().is_success() {
                break;
            }

            let reactions: Vec<GitHubReaction> = response.json().await?;
            
            if reactions.is_empty() {
                break;
            }

            let batch_size = reactions.len();
            all_reactions.extend(reactions);

            if batch_size < 100 {
                break;
            }

            page += 1;
        }
        
        let plus_one = all_reactions.iter().filter(|r| r.content == "+1").count() as u32;
        let minus_one = all_reactions.iter().filter(|r| r.content == "-1").count() as u32;

        Ok(Reactions {
            plus_one,
            minus_one,
        })
    }
}
