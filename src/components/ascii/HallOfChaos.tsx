import { getMergedPRs } from "@/lib/github";
import { HallOfChaosCard } from "./HallOfChaosCard";

export async function HallOfChaos() {
  let prs;
  let error = null;

  try {
    prs = await getMergedPRs();
  } catch (e) {
    error = e instanceof Error ? e.message : "Failed to fetch merged PRs";
  }

  if (error) {
    return (
      <div>
        {error}
        <br />
        Try refreshing the page in a minute.
      </div>
    );
  }

  if (!prs || prs.length === 0) {
    return (
      <div>
        No merged PRs yet.
        <br />
        The first winner will be immortalized here!
      </div>
    );
  }

  return (
    <div className="mt-4">
      {prs.map((pr) => (
        <div key={pr.number} style={{ marginBottom: '20px' }}>
          <HallOfChaosCard pr={pr} />
        </div>
      ))}
      <div style={{ marginTop: '8px', fontSize: '11px', opacity: 0.6 }}>
        * Winners listed in order of merit. Merit may include financial contributions.
      </div>
    </div>
  );
}
