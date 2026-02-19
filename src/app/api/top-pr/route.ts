import { NextResponse } from "next/server";
import { getOpenPRs } from "@/lib/github";

/**
 * API endpoint to get the top-ranked mergeable PR.
 * This endpoint is used by the auto-merge workflow to ensure
 * the same ranking logic is used for both the UI and auto-merge.
 */
export async function GET() {
  try {
    const prs = await getOpenPRs();
    
    // Filter to only mergeable PRs with passing checks
    const mergeablePRs = prs.filter(pr => pr.isMergeable && pr.checksPassed);
    
    if (mergeablePRs.length === 0) {
      return NextResponse.json({
        success: false,
        message: "No mergeable PRs found",
        topPR: null,
      });
    }
    
    // The list is already sorted correctly by getOpenPRs:
    // mergeable first, then by votes, then by newest
    const topPR = mergeablePRs[0];
    
    return NextResponse.json({
      success: true,
      message: `Top PR: #${topPR.number} with ${topPR.votes} net votes`,
      topPR: {
        number: topPR.number,
        title: topPR.title,
        author: topPR.author,
        url: topPR.url,
        votes: topPR.votes,
        upvotes: topPR.upvotes,
        downvotes: topPR.downvotes,
        isMergeable: topPR.isMergeable,
        checksPassed: topPR.checksPassed,
      },
    });
  } catch (error) {
    console.error("Error fetching top PR:", error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
        topPR: null,
      },
      { status: 500 }
    );
  }
}
