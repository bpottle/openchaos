use axum::{
    extract::{Query, State},
    response::Json,
    routing::get,
    Router,
};
use serde::{Deserialize, Serialize};
use std::net::SocketAddr;
use std::sync::Arc;
use tower_http::{
    cors::CorsLayer,
    services::ServeDir,
};
use tracing::{error, info};
use tracing_subscriber;

mod github;
use github::GitHubClient;

type SharedClient = Arc<GitHubClient>;

#[derive(Debug, Serialize, Deserialize)]
struct PRResponse {
    pulls: Vec<github::PullRequest>,
    #[serde(rename = "eventTime")]
    event_time: String,
}

#[derive(Debug, Deserialize)]
struct RepoQuery {
    owner: String,
    repo: String,
}

#[axum::debug_handler]
async fn get_pull_requests(
    State(client): State<SharedClient>,
    Query(params): Query<RepoQuery>,
) -> Json<PRResponse> {
    info!("Fetching pull requests for {}/{}", params.owner, params.repo);
    
    match client.get_open_pull_requests(&params.owner, &params.repo).await {
        Ok(pulls) => {
            info!("Successfully fetched {} pull requests", pulls.len());
            let event_time = chrono::Utc::now().to_rfc3339();
            Json(PRResponse { pulls, event_time })
        }
        Err(e) => {
            error!("Error fetching pull requests: {}", e);
            Json(PRResponse {
                pulls: vec![],
                event_time: chrono::Utc::now().to_rfc3339(),
            })
        }
    }
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Initialize tracing
    tracing_subscriber::fmt()
        .with_env_filter(
            tracing_subscriber::EnvFilter::try_from_default_env()
                .unwrap_or_else(|_| "info".into()),
        )
        .init();

    // Create shared GitHub client
    let github_client = Arc::new(GitHubClient::new());
    
    let app = Router::new()
        .route("/api/pulls", get(get_pull_requests))
        .with_state(github_client)
        .fallback_service(ServeDir::new("static"))
        .layer(CorsLayer::permissive());

    let addr = SocketAddr::from(([127, 0, 0, 1], 3000));
    info!("Server running on http://{}", addr);
    
    let listener = tokio::net::TcpListener::bind(addr)
        .await
        .expect("Failed to bind to address");
    
    axum::serve(listener, app)
        .await
        .expect("Server error");
    
    Ok(())
}
