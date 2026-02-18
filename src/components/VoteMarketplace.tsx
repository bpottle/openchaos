"use client";

import { useState } from "react";

const PACKAGES = [
  { id: "starter",    label: "Starter Pack",    votes: 10,   price: "$9.99",       badge: "" },
  { id: "pro",        label: "Pro Pack",         votes: 100,  price: "$420.00",     badge: "[POPULAR]" },
  { id: "enterprise", label: "Enterprise Pack",  votes: 9999, price: "$69,000.00",  badge: "[BEST VALUE]" },
];

const CHECKOUT_LINES = [
  "Connecting to vote servers...",
  "Verifying payment...",
  "Payment accepted (obviously).",
  "Distributing votes...",
  "Covering tracks...",
  "Done! Votes delivered. Probably.",
];

export function VoteMarketplace() {
  const [selected, setSelected] = useState<string | null>(null);
  const [checkoutStep, setCheckoutStep] = useState(-1);
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const startCheckout = (id: string) => {
    setSelected(id);
    setCheckoutStep(0);
    const advance = (step: number) => {
      if (step <= CHECKOUT_LINES.length) {
        setTimeout(() => {
          setCheckoutStep(step);
          advance(step + 1);
        }, 420);
      }
    };
    advance(1);
  };

  const isDone = checkoutStep >= CHECKOUT_LINES.length;

  return (
    <div
      style={{
        border: "2px solid var(--foreground)",
        padding: "12px",
        marginBottom: "16px",
        fontFamily: "inherit",
        fontSize: "12px",
        position: "relative",
      }}
    >
      <button
        onClick={() => setDismissed(true)}
        title="Close"
        style={{
          position: "absolute",
          top: "6px",
          right: "8px",
          background: "transparent",
          border: "none",
          color: "var(--foreground)",
          fontFamily: "inherit",
          fontSize: "12px",
          cursor: "pointer",
          opacity: 0.6,
        }}
      >
        [x]
      </button>

      <div style={{ fontWeight: "bold", marginBottom: "6px" }}>
        ╔═══════════════════════════════════════════╗
        <br />
        ║&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; VOTE MARKETPLACE — BUY VOTES NOW&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;║
        <br />
        ╚═══════════════════════════════════════════╝
      </div>

      <div style={{ opacity: 0.7, marginBottom: "8px" }}>
        Tired of earning votes the old-fashioned way? Upgrade your PR&apos;s democratic standing today.
        All packages are FREE (for a limited time — offer expires never).
      </div>

      {!selected && (
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              style={{
                border: "1px solid var(--foreground)",
                padding: "8px 12px",
                minWidth: "140px",
              }}
            >
              <div style={{ fontWeight: "bold" }}>
                {pkg.label} {pkg.badge && <span style={{ opacity: 0.8 }}>{pkg.badge}</span>}
              </div>
              <div style={{ margin: "4px 0" }}>
                +{pkg.votes} votes · {pkg.price}
              </div>
              <button
                onClick={() => startCheckout(pkg.id)}
                style={{
                  background: "var(--foreground)",
                  color: "var(--background)",
                  border: "none",
                  fontFamily: "inherit",
                  fontSize: "11px",
                  padding: "2px 8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  marginTop: "4px",
                }}
              >
                [ Buy Now ]
              </button>
            </div>
          ))}
        </div>
      )}

      {selected && (
        <div style={{ marginTop: "4px" }}>
          <div style={{ marginBottom: "6px", fontWeight: "bold" }}>
            &gt; Checkout: {PACKAGES.find((p) => p.id === selected)?.label}
          </div>
          {CHECKOUT_LINES.slice(0, Math.max(checkoutStep, 0)).map((line, i) => (
            <div key={i} style={{ opacity: i < checkoutStep - 1 ? 0.6 : 1 }}>
              &gt;&gt; {line}
            </div>
          ))}
          {!isDone && checkoutStep >= 0 && (
            <div style={{ opacity: 0.5 }}>&gt;&gt; _</div>
          )}
          {isDone && (
            <div style={{ marginTop: "8px" }}>
              <span style={{ fontWeight: "bold" }}>✅ Transaction complete.</span>
              {" "}Your votes are on the way.*
              <br />
              <span style={{ opacity: 0.5, fontSize: "10px" }}>
                *Vote delivery is non-binding, theoretical, and subject to the laws of physics.
                No refunds. No votes. No regrets.
              </span>
              <br />
              <button
                onClick={() => { setSelected(null); setCheckoutStep(-1); }}
                style={{
                  background: "transparent",
                  border: "1px solid var(--foreground)",
                  color: "var(--foreground)",
                  fontFamily: "inherit",
                  fontSize: "11px",
                  padding: "2px 8px",
                  cursor: "pointer",
                  marginTop: "6px",
                }}
              >
                [ Buy More ]
              </button>
            </div>
          )}
        </div>
      )}

      <div style={{ marginTop: "10px", opacity: 0.45, fontSize: "10px" }}>
        OpenChaos VoteMarketplace™ is not affiliated with democracy. Results not guaranteed.
        Votes are purely cosmetic and have absolutely no effect on the outcome.
        Void where prohibited by common sense.
      </div>
    </div>
  );
}
