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
    ) -> Result<Vec<PullRequest>, Box<dyn std::error::Error>> {
        let url = format!(
            "https://api.github.com/repos/{}/{}/pulls?state=open",
            owner, repo
        );

        let response = self.client.get(&url).send().await?;

        if !response.status().is_success() {
            return Err(format!("GitHub API error: {}", response.status()).into());
        }

        let pulls: Vec<PullRequest> = response.json().await?;
        Ok(pulls)
    }
}
