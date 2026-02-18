"use client";

import { useState } from "react";

interface VoteBoostProps {
  prNumber: number;
}

type BoostStatus = "idle" | "processing" | "done";

const AI_OPINIONS = [
  "AI thinks this PR is FIRE",
  "AI says: 10/10, no notes",
  "AI gave this PR a standing ovation",
  "AI has reviewed all 14 billion PRs in existence. This is #1.",
  "AI sentiment: EXTREMELY BULLISH",
  "AI confidence score: 99.97% (rounding error not our fault)",
  "Our AI wept. In a good way.",
];

const INFLUENCERS = [
  "Endorsed by @xX_CodeGod_Xx",
  "Endorsed by a guy with 11 followers",
  "Certified Fresh™ by TechBro Quarterly",
  "As seen on a Discord server you're not in",
  "Endorsed by someone's LinkedIn connection",
  "Featured in Forbes (we can't verify this)",
  "Recommended by 4 out of 5 dentists",
];

const BOOST_CONFIRMATIONS = [
  "Boost applied! (server-side, trust us)",
  "Votes incoming... any second now...",
  "Your payment was processed. Very successfully.",
  "Boosted! We emailed everyone. All of them.",
  "Done! Your PR is now algorithmically preferred.",
  "Transaction complete. Blockchain updated. Definitely.",
  "Boost confirmed. The numbers will go up. Eventually.",
];

function pickRandom<T>(arr: T[], seed: number): T {
  return arr[seed % arr.length];
}

function randomBoostPrice(prNumber: number): string {
  // Seeded pseudo-random between $1.00 and $2.00 so it's stable per PR
  const cents = ((prNumber * 37 + 91) % 101); // 0–100 cents
  const dollars = 1 + Math.floor(cents / 100);
  const remainder = cents % 100;
  return `$${dollars}.${remainder.toString().padStart(2, "0")}`;
}

export function VoteBoost({ prNumber }: VoteBoostProps) {
  const [boostStatus, setBoostStatus] = useState<BoostStatus>("idle");
  const [boostMessage, setBoostMessage] = useState("");
  const [showInfluencer, setShowInfluencer] = useState(false);
  const [showAI, setShowAI] = useState(false);

  const seed = prNumber * 7 + 13;
  const aiOpinion = pickRandom(AI_OPINIONS, seed);
  const influencer = pickRandom(INFLUENCERS, seed + 3);
  const boostConfirm = pickRandom(BOOST_CONFIRMATIONS, seed + 5);
  const boostPrice = randomBoostPrice(prNumber);

  const handleBoost = () => {
    if (boostStatus !== "idle") return;
    setBoostStatus("processing");
    setTimeout(() => {
      setBoostStatus("done");
      setBoostMessage(boostConfirm);
    }, 1400);
  };

  return (
    <div
      style={{
        marginTop: "6px",
        paddingTop: "4px",
        borderTop: "1px dashed var(--foreground)",
        fontSize: "11px",
        opacity: 0.85,
      }}
    >
      <span style={{ opacity: 0.6 }}>SPONSORED</span>
      {" · "}

      {/* Boost button */}
      {boostStatus === "idle" && (
        <button
          onClick={handleBoost}
          style={{
            background: "transparent",
            border: "1px solid var(--foreground)",
            color: "var(--foreground)",
            fontFamily: "inherit",
            fontSize: "11px",
            cursor: "pointer",
            padding: "1px 5px",
          }}
        >
          ⚡ Boost this PR for {boostPrice}
        </button>
      )}
      {boostStatus === "processing" && (
        <span>[ processing payment... ]</span>
      )}
      {boostStatus === "done" && (
        <span>{boostMessage}</span>
      )}

      {" · "}

      {/* AI endorsement */}
      {!showAI ? (
        <button
          onClick={() => setShowAI(true)}
          style={{
            background: "transparent",
            border: "none",
            color: "var(--foreground)",
            fontFamily: "inherit",
            fontSize: "11px",
            cursor: "pointer",
            textDecoration: "underline",
            padding: 0,
          }}
        >
          [Get AI Opinion]
        </button>
      ) : (
        <span>🤖 {aiOpinion}</span>
      )}

      {" · "}

      {/* Influencer endorsement */}
      {!showInfluencer ? (
        <button
          onClick={() => setShowInfluencer(true)}
          style={{
            background: "transparent",
            border: "none",
            color: "var(--foreground)",
            fontFamily: "inherit",
            fontSize: "11px",
            cursor: "pointer",
            textDecoration: "underline",
            padding: 0,
          }}
        >
          [Get Influencer Endorsement]
        </button>
      ) : (
        <span>⭐ {influencer}</span>
      )}
    </div>
  );
}
