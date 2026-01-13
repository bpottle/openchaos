# OpenChaos - Rust Version

A high-performance GitHub Pull Request dashboard built with Rust, Axum, and modern web technologies.

## Features

- 🚀 Fast, async Rust backend using Axum
- 📊 Real-time GitHub PR data via REST API
- 🎨 Beautiful, responsive UI
- 🔄 CORS-enabled for flexibility
- ⚡ Low memory footprint and blazing fast performance

## Tech Stack

- **Backend:** Rust with Axum web framework
- **Runtime:** Tokio async runtime
- **HTTP Client:** Reqwest for GitHub API calls
- **Frontend:** Vanilla HTML/CSS/JavaScript
- **API:** GitHub REST API v3

## Prerequisites

- Rust 1.70+ (install from https://rustup.rs)
- Git
- Optional: GitHub Personal Access Token for higher API rate limits

## Installation

1. Clone the repository:
```bash
git clone https://github.com/skridlevsky/openchaos.git
cd openchaos-rust
```

2. Set up GitHub token (optional but recommended):
```bash
# Windows
set GITHUB_TOKEN=your_token_here

# Linux/Mac
export GITHUB_TOKEN=your_token_here
```

3. Build the project:
```bash
cargo build --release
```

## Running the Application

```bash
cargo run --release
```

The server will start at `http://localhost:3000`

## Development

For development with hot reload:
```bash
cargo watch -x run
```

## Project Structure

```
openchaos-rust/
├── src/
│   ├── main.rs        # Application entry point and routes
│   └── github.rs      # GitHub API client
├── static/
│   └── index.html     # Frontend UI
├── Cargo.toml         # Rust dependencies
└── README-RUST.md     # This file
```

## API Endpoints

### GET /api/pulls

Fetch open pull requests for a repository.

**Query Parameters:**
- `owner` (required): Repository owner
- `repo` (required): Repository name

**Example:**
```bash
curl "http://localhost:3000/api/pulls?owner=facebook&repo=react"
```

**Response:**
```json
{
  "pulls": [
    {
      "id": 123456789,
      "number": 12345,
      "title": "Fix: Update component logic",
      "user": {
        "login": "username",
        "avatar_url": "https://avatars.githubusercontent.com/u/123456"
      },
      "html_url": "https://github.com/facebook/react/pull/12345",
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-02T00:00:00Z"
    }
  ],
  "eventTime": "2024-01-02T12:00:00Z"
}
```

## Configuration

### Environment Variables

- `GITHUB_TOKEN`: Your GitHub Personal Access Token (optional)
  - Increases API rate limit from 60 to 5000 requests per hour
  - Create at: https://github.com/settings/tokens

### Port Configuration

To change the port, modify `src/main.rs`:
```rust
let addr = SocketAddr::from(([127, 0, 0, 1], 3000)); // Change 3000 to your desired port
```

## Building for Production

```bash
cargo build --release
```

The optimized binary will be in `target/release/openchaos` (or `openchaos.exe` on Windows).

## Performance

Rust's performance advantages:
- **Fast startup:** ~10ms
- **Low memory:** ~5-10MB RAM usage
- **High throughput:** Handles thousands of concurrent requests
- **Zero-cost abstractions:** Compiled to native code

## Troubleshooting

### Build Issues on Windows

If you encounter linker errors, you need Visual Studio Build Tools:
1. Download from: https://visualstudio.microsoft.com/downloads/#build-tools-for-visual-studio-2022
2. Install with "Desktop development with C++" workload
3. Restart your terminal and try building again

See `BUILD-STATUS.md` for detailed troubleshooting.

### GitHub API Rate Limiting

Without authentication:
- 60 requests per hour

With GitHub token:
- 5000 requests per hour

Set the `GITHUB_TOKEN` environment variable to use authenticated requests.

## License

MIT License - See LICENSE file for details

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Comparison with Next.js Version

| Feature | Rust | Next.js |
|---------|------|---------|
| Startup Time | ~10ms | ~500ms |
| Memory Usage | ~5-10MB | ~50-100MB |
| Binary Size | ~8MB | N/A (needs Node) |
| Dependencies | Native | Requires Node.js |
| Performance | Native speed | V8 JIT |
| Deployment | Single binary | Needs runtime |

Both versions are fully functional - choose based on your needs!
