use axum::{
    extract::Query,
    response::Json,
    routing::get,
    Router,
};
use serde::{Deserialize, Serialize};
use std::net::SocketAddr;
use tower_http::{
    cors::CorsLayer,
    services::ServeDir,
};

mod github;
use github::GitHubClient;

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

async fn get_pull_requests(Query(params): Query<RepoQuery>) -> Json<PRResponse> {
    let client = GitHubClient::new();
    
    match client.get_open_pull_requests(&params.owner, &params.repo).await {
        Ok(pulls) => {
            let event_time = chrono::Utc::now().to_rfc3339();
            Json(PRResponse { pulls, event_time })
        }
        Err(e) => {
            eprintln!("Error fetching pull requests: {}", e);
            Json(PRResponse {
                pulls: vec![],
                event_time: chrono::Utc::now().to_rfc3339(),
            })
        }
    }
}

#[tokio::main]
async fn main() {
    // Build the application with routes
    let app = Router::new()
        .route("/api/pulls", get(get_pull_requests))
        .fallback_service(ServeDir::new("static"))
        .layer(CorsLayer::permissive());

    // Run the server
    let addr = SocketAddr::from(([127, 0, 0, 1], 3000));
    println!("Server running on http://{}", addr);
    
    let listener = tokio::net::TcpListener::bind(addr).await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
