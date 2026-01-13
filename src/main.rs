use axum::{
    extract::{Query, State},
    http::Request,
    middleware::{self, Next},
    response::{IntoResponse, Json, Response},
    routing::get,
    Router,
};
use serde::{Deserialize, Serialize};
use std::net::SocketAddr;
use std::sync::Arc;
use std::time::Instant;
use tower_http::{
    cors::CorsLayer,
    services::ServeDir,
};
use tracing::{error, info};
use tracing_subscriber;

mod github;
mod metrics;

use github::GitHubClient;
use metrics::Metrics;

#[derive(Clone)]
struct AppState {
    github_client: Arc<GitHubClient>,
    metrics: Metrics,
}

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

async fn metrics_middleware(
    State(state): State<AppState>,
    req: Request<axum::body::Body>,
    next: Next,
) -> Response {
    let start = Instant::now();
    let response = next.run(req).await;
    let duration = start.elapsed();
    
    state.metrics.record_request(duration.as_millis() as u64);
    
    // Record error if status code is 4xx or 5xx
    if response.status().is_client_error() || response.status().is_server_error() {
        state.metrics.record_error();
    }
    
    response
}

#[axum::debug_handler]
async fn get_pull_requests(
    State(state): State<AppState>,
    Query(params): Query<RepoQuery>,
) -> Json<PRResponse> {
    info!("Fetching pull requests for {}/{}", params.owner, params.repo);
    
    match state.github_client.get_open_pull_requests(&params.owner, &params.repo).await {
        Ok(pulls) => {
            info!("Successfully fetched {} pull requests", pulls.len());
            let event_time = chrono::Utc::now().to_rfc3339();
            Json(PRResponse { pulls, event_time })
        }
        Err(e) => {
            error!("Error fetching pull requests: {}", e);
            state.metrics.record_error();
            Json(PRResponse {
                pulls: vec![],
                event_time: chrono::Utc::now().to_rfc3339(),
            })
        }
    }
}

async fn get_metrics(State(state): State<AppState>) -> impl IntoResponse {
    let stats = state.metrics.get_stats();
    Json(stats)
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

    // Create shared state
    let state = AppState {
        github_client: Arc::new(GitHubClient::new()),
        metrics: Metrics::new(),
    };
    
    let app = Router::new()
        .route("/api/pulls", get(get_pull_requests))
        .route("/api/metrics", get(get_metrics))
        .layer(middleware::from_fn_with_state(state.clone(), metrics_middleware))
        .with_state(state)
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
