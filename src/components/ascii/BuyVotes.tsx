"use client";

import { useState } from "react";

const TIERS = [
  {
    id: "bronze",
    name: "Bronze Booster",
    price: "$4.99",
    votes: 5,
    perks: [
      "5 bonus votes",
      "Your PR displayed in slightly bolder font",
      "A warm feeling inside",
    ],
    label: "[BRONZE]",
  },
  {
    id: "silver",
    name: "Silver Syndicate",
    price: "$19.99",
    votes: 25,
    perks: [
      "25 bonus votes",
      "Unofficial 'Trusted Contributor' badge*",
      "Priority support** via Discord",
    ],
    label: "[SILVER]",
  },
  {
    id: "gold",
    name: "Gold Grabber",
    price: "$49.99",
    votes: 100,
    perks: [
      "100 bonus votes",
      "Your name in the Hall of Chaos***",
      "Exclusive 'I Paid For This' flair",
    ],
    label: "[GOLD] <-- MOST POPULAR",
  },
  {
    id: "diamond",
    name: "Diamond Delusion",
    price: "$199.99",
    votes: 500,
    perks: [
      "500 bonus votes",
      "The maintainer will consider learning your name",
      "Custom cursor on your PRs****",
      "Exclusive Discord role: 'Financially Compromised'",
    ],
    label: "[DIAMOND]",
  },
];

const DISCLAIMERS = [
  " * Badge is a PNG you can print at home.",
  " ** Support consists of being @mentioned once.",
  " *** Hall of Chaos entry subject to it existing.",
  " **** Custom cursor: set it yourself in OS settings.",
  " ***** Votes do not actually affect anything. Nothing does.",
  " No refunds. This button does nothing.",
];

type Screen = "list" | "checkout" | "success";

export function BuyVotes() {
  const [screen, setScreen] = useState<Screen>("list");
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [showDisclaimers, setShowDisclaimers] = useState(false);

  const tier = TIERS.find((t) => t.id === selectedTier);

  const handleBuy = (id: string) => {
    setSelectedTier(id);
    setScreen("checkout");
  };

  const handleConfirm = () => {
    setScreen("success");
    setTimeout(() => {
      setScreen("list");
      setSelectedTier(null);
    }, 4000);
  };

  const handleCancel = () => {
    setScreen("list");
    setSelectedTier(null);
  };

  return (
    <div className="ascii-buy-votes">
      <pre>{`+--------------------------------------------------+
| BUY VOTES -- Accelerate Your PR                  |
+--------------------------------------------------+`}</pre>

      {screen === "list" && (
        <>
          <div style={{ marginBottom: "0.5em" }}>
            Why earn votes when you can <em>purchase</em> them?*****
          </div>
          <div>
            {TIERS.map((t) => (
              <div key={t.id} className="ascii-buy-votes-tier">
                <pre>{`  ${t.label}
  ${t.name} -- ${t.price} -- +${t.votes} votes
  Includes:${t.perks.map((p) => `\n    - ${p}`).join("")}`}</pre>
                <div>
                  <button
                    className="ascii-buy-votes-btn"
                    onClick={() => handleBuy(t.id)}
                  >
                    [ Buy {t.name} ]
                  </button>
                </div>
                <br />
              </div>
            ))}
          </div>

          <div>
            <button
              className="ascii-buy-votes-btn"
              onClick={() => setShowDisclaimers(!showDisclaimers)}
            >
              {showDisclaimers ? "[ Hide Terms ]" : "[ Show Terms & Conditions ]"}
            </button>
            {showDisclaimers && (
              <pre className="ascii-buy-votes-disclaimers">
                {DISCLAIMERS.join("\n")}
              </pre>
            )}
          </div>
        </>
      )}

      {screen === "checkout" && tier && (
        <div className="ascii-buy-votes-checkout">
          <pre>{`+--------------------------------------------------+
| CHECKOUT                                         |
+--------------------------------------------------+
  Package : ${tier.name}
  Price   : ${tier.price}
  Votes   : +${tier.votes}

  Card No : 1234 5678 9012 3456  [not real]
  Expiry  : MM/YY                [not real]
  CVV     : ***                  [not real]

  This form is a joke. No payment will be processed.
  No votes will be added. We are sorry for your loss.
+--------------------------------------------------+`}</pre>
          <div>
            <button className="ascii-buy-votes-btn" onClick={handleConfirm}>
              [ Confirm Purchase ]
            </button>
            {"  "}
            <button className="ascii-buy-votes-btn" onClick={handleCancel}>
              [ Cancel ]
            </button>
          </div>
        </div>
      )}

      {screen === "success" && (
        <div className="ascii-buy-votes-success">
          <pre>{`+--------------------------------------------------+
| PAYMENT SUCCESSFUL                               |
+--------------------------------------------------+
|                                                  |
|  Your votes are being processed.                 |
|  Allow 3-5 business eternities for delivery.     |
|                                                  |
|  (Nothing happened. This was always a joke.)     |
|                                                  |
+--------------------------------------------------+`}</pre>
        </div>
      )}
    </div>
  );
}
