use std::sync::atomic::{AtomicU64, AtomicUsize, Ordering};
use std::sync::Arc;
use std::time::Instant;

#[derive(Clone)]
pub struct Metrics {
    pub total_requests: Arc<AtomicUsize>,
    pub total_errors: Arc<AtomicUsize>,
    pub total_response_time_ms: Arc<AtomicU64>,
    pub start_time: Instant,
}

impl Metrics {
    pub fn new() -> Self {
        Self {
            total_requests: Arc::new(AtomicUsize::new(0)),
            total_errors: Arc::new(AtomicUsize::new(0)),
            total_response_time_ms: Arc::new(AtomicU64::new(0)),
            start_time: Instant::now(),
        }
    }

    pub fn record_request(&self, duration_ms: u64) {
        self.total_requests.fetch_add(1, Ordering::Relaxed);
        self.total_response_time_ms.fetch_add(duration_ms, Ordering::Relaxed);
    }

    pub fn record_error(&self) {
        self.total_errors.fetch_add(1, Ordering::Relaxed);
    }

    pub fn get_stats(&self) -> MetricsStats {
        let requests = self.total_requests.load(Ordering::Relaxed);
        let errors = self.total_errors.load(Ordering::Relaxed);
        let total_time = self.total_response_time_ms.load(Ordering::Relaxed);
        
        let avg_response_ms = if requests > 0 {
            total_time / requests as u64
        } else {
            0
        };

        let binary_size = get_binary_size();
        let uptime_seconds = self.start_time.elapsed().as_secs();

        MetricsStats {
            binary_size_bytes: binary_size,
            binary_size_formatted: format_bytes(binary_size),
            avg_response_time_ms: avg_response_ms,
            total_requests: requests,
            total_errors: errors,
            uptime_seconds,
        }
    }
}

#[derive(serde::Serialize)]
pub struct MetricsStats {
    pub binary_size_bytes: u64,
    pub binary_size_formatted: String,
    pub avg_response_time_ms: u64,
    pub total_requests: usize,
    pub total_errors: usize,
    pub uptime_seconds: u64,
}

fn get_binary_size() -> u64 {
    std::env::current_exe()
        .ok()
        .and_then(|path| std::fs::metadata(path).ok())
        .map(|metadata| metadata.len())
        .unwrap_or(0)
}

fn format_bytes(bytes: u64) -> String {
    const KB: u64 = 1024;
    const MB: u64 = KB * 1024;
    const GB: u64 = MB * 1024;

    if bytes >= GB {
        format!("{:.2}GB", bytes as f64 / GB as f64)
    } else if bytes >= MB {
        format!("{:.2}MB", bytes as f64 / MB as f64)
    } else if bytes >= KB {
        format!("{:.2}KB", bytes as f64 / KB as f64)
    } else {
        format!("{}B", bytes)
    }
}
