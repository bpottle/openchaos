"use client";

import { useState } from "react";

const TIERS = [
  {
    id: "bronze",
    name: "Bronze Booster",
    price: "$4.99",
    votes: 5,
    perks: ["Your PR displayed in slightly bolder font", "Bragging rights over anyone who voted for free", "A receipt"],
    color: "#cd7f32",
    gradient: "linear-gradient(to bottom, #e8a04a 0%, #cd7f32 100%)",
    borderColor: "#a0601a",
    badge: "BRONZE",
  },
  {
    id: "silver",
    name: "Silver Syndicate",
    price: "$19.99",
    votes: 25,
    perks: ["Unofficial 'Trusted Contributor' badge*", "Priority support** via Discord", "5x the votes of the Bronze tier (this is just math)"],
    color: "#aaa9ad",
    gradient: "linear-gradient(to bottom, #d0cfcf 0%, #9a9999 100%)",
    borderColor: "#777",
    badge: "SILVER",
  },
  {
    id: "gold",
    name: "Gold Grabber",
    price: "$49.99",
    votes: 100,
    perks: ["Your name in the Hall of Chaos***", "Exclusive 'I Paid For This' flair", "The satisfaction of having spent $49.99 on a voting contest"],
    color: "#e6a817",
    gradient: "linear-gradient(to bottom, #f5c842 0%, #e6a817 100%)",
    borderColor: "#b07800",
    badge: "GOLD",
    popular: true,
  },
  {
    id: "diamond",
    name: "Diamond Delusion",
    price: "$199.99",
    votes: 500,
    perks: [
      "The maintainer will consider learning your name",
      "Custom cursor on your PRs****",
      "Exclusive Discord role: 'Financially Compromised'",
      "20x the votes of the Bronze tier (still just math)",
    ],
    color: "#b9f2ff",
    gradient: "linear-gradient(to bottom, #e0f8ff 0%, #a0e8f8 100%)",
    borderColor: "#60c0e0",
    badge: "DIAMOND",
  },
];

const DISCLAIMERS = [
  "* Badge is a PNG you can print at home.",
  "** Support consists of being @mentioned once.",
  "*** Hall of Chaos entry is subject to the Hall of Chaos not existing yet.",
  "**** Custom cursor requires you to set it yourself in your OS settings.",
  "***** Votes do not actually affect the outcome. Nothing does. This is chaos.",
  "No refunds. This button does nothing. We are not responsible for any decisions made after reading this page.",
];

export function BuyVotes() {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  const handleBuy = (tierId: string) => {
    setSelectedTier(tierId);
  };

  const handleConfirm = () => {
    setConfirmed(true);
    setTimeout(() => {
      setConfirmed(false);
      setSelectedTier(null);
    }, 4000);
  };

  const tier = TIERS.find((t) => t.id === selectedTier);

  return (
    <div className="web2-section buy-votes-section">
      <div className="web2-section-header">
        <span className="web2-section-title">Buy Votes — Accelerate Your PR</span>
        <span className="buy-votes-new-badge">NEW!</span>
      </div>
      <div className="web2-section-body">
        <p className="buy-votes-tagline">
          Why earn votes when you can <em>purchase</em> them?
          Our completely legitimate vote-boosting packages give your PR the edge it deserves.*****
        </p>

        <div className="buy-votes-tiers">
          {TIERS.map((t) => (
            <div
              key={t.id}
              className={`buy-votes-tier ${t.popular ? "buy-votes-tier-popular" : ""}`}
              style={{ borderColor: t.borderColor }}
            >
              {t.popular && (
                <div className="buy-votes-popular-ribbon">MOST POPULAR</div>
              )}
              <div
                className="buy-votes-tier-header"
                style={{ background: t.gradient, borderBottomColor: t.borderColor }}
              >
                <span className="buy-votes-badge" style={{ color: t.color, borderColor: t.borderColor }}>
                  {t.badge}
                </span>
                <div className="buy-votes-tier-name">{t.name}</div>
                <div className="buy-votes-tier-price">{t.price}</div>
                <div className="buy-votes-tier-votes">+{t.votes} votes</div>
              </div>
              <div className="buy-votes-tier-body">
                <ul className="buy-votes-perks">
                  {t.perks.map((perk, i) => (
                    <li key={i} className="buy-votes-perk">
                      <span className="buy-votes-check">&#10003;</span> {perk}
                    </li>
                  ))}
                </ul>
                <button
                  className="buy-votes-buy-btn"
                  style={{ background: t.gradient, borderColor: t.borderColor }}
                  onClick={() => handleBuy(t.id)}
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="buy-votes-disclaimers">
          <button
            className="buy-votes-disclaimer-toggle"
            onClick={() => setShowDisclaimer(!showDisclaimer)}
          >
            {showDisclaimer ? "Hide" : "Show"} Terms &amp; Conditions
          </button>
          {showDisclaimer && (
            <ul className="buy-votes-disclaimer-list">
              {DISCLAIMERS.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* "Checkout" Modal */}
      {selectedTier && tier && !confirmed && (
        <div className="buy-votes-modal-overlay" onClick={() => setSelectedTier(null)}>
          <div className="buy-votes-modal" onClick={(e) => e.stopPropagation()}>
            <div className="buy-votes-modal-header" style={{ background: tier.gradient }}>
              <span>{tier.name}</span>
              <button className="buy-votes-modal-close" onClick={() => setSelectedTier(null)}>
                X
              </button>
            </div>
            <div className="buy-votes-modal-body">
              <p>You are about to purchase <strong>{tier.name}</strong> for <strong>{tier.price}</strong>.</p>
              <p className="buy-votes-modal-note">
                You will receive {tier.votes} votes, added to your selected PR within 3&ndash;5 business eternities.
              </p>
              <div className="buy-votes-modal-fake-form">
                <label>Credit Card Number</label>
                <input type="text" placeholder="1234 5678 9012 3456" className="buy-votes-fake-input" />
                <label>Expiry</label>
                <input type="text" placeholder="MM/YY" className="buy-votes-fake-input buy-votes-fake-input-sm" />
                <label>CVV</label>
                <input type="text" placeholder="***" className="buy-votes-fake-input buy-votes-fake-input-sm" />
              </div>
              <p className="buy-votes-modal-disclaimer">
                This form is a joke. No payment will be processed. No votes will be added.
                We are deeply sorry for your loss.
              </p>
              <div className="buy-votes-modal-actions">
                <button
                  className="buy-votes-confirm-btn"
                  style={{ background: tier.gradient, borderColor: tier.borderColor }}
                  onClick={handleConfirm}
                >
                  Confirm Purchase
                </button>
                <button className="buy-votes-cancel-btn" onClick={() => setSelectedTier(null)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success state */}
      {confirmed && (
        <div className="buy-votes-modal-overlay">
          <div className="buy-votes-modal buy-votes-success-modal">
            <div className="buy-votes-success-icon">&#10003;</div>
            <div className="buy-votes-success-title">Payment Successful!</div>
            <div className="buy-votes-success-body">
              Your votes are being processed. Please allow 3&ndash;5 business eternities for delivery.
              <br /><br />
              (Nothing happened. This was always a joke.)
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
