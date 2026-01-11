"use client";

import { ReactNode, useState } from "react";
import { Guestbook } from "./Guestbook";

interface IE6LayoutProps {
  children: ReactNode;
}

export function IE6Layout({ children }: IE6LayoutProps) {
  const [showRealPlayer, setShowRealPlayer] = useState(false);

  return (
    <>
      {/* RealPlayer Modal - Rendered at top level */}
      {showRealPlayer && (
        <div className="realplayer-modal-overlay" onClick={() => setShowRealPlayer(false)}>
          <div className="realplayer-modal" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setShowRealPlayer(false)}
              className="realplayer-close-button"
            >
              <b>[X] CLOSE</b>
            </button>
            <img
              src="/rp.png"
              alt="RealPlayer"
              className="realplayer-image"
            />
          </div>
        </div>
      )}
      {/* IE6 Compatibility Mode Header */}
      <div className="ie6-header">
        🔥 Best Viewed in Internet Explorer 6.0 at 800x600 Resolution 🔥
      </div>

      <main className="ie6-main">
        {/* Classic table-based layout */}
        <table width="100%" border={3} cellPadding={10} cellSpacing={0} className="ie6-main-table">
          <tbody>
            <tr>
              <td className="ie6-header-cell">
                <table width="100%" border={0} cellPadding={0} cellSpacing={0}>
                  <tbody>
                    <tr>
                      <td className="ie6-header-cell">
                        <span className="ie6-header-text">
                          <b>
                            {/* @ts-expect-error marquee is deprecated but used for retro styling */}
                            <marquee behavior="alternate" scrollamount="10">
                              <span className="sparkle-rotate-glint">⭐</span> OPENCHAOS.DEV <span className="sparkle-rotate-glint sparkle-delay-2">⭐</span>
                            {/* @ts-expect-error marquee is deprecated but used for retro styling */}
                            </marquee>
                          </b>
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>

            <tr>
              <td className="ie6-marquee-cell">
                <span className="ie6-marquee-text">
                  {/* @ts-expect-error marquee is deprecated but used for retro styling */}
                  <marquee scrollamount="5" width="100%">
                    🚧 UNDER CONSTRUCTION 🚧 Welcome to the WORLD WIDE WEB! 🚧 This site is OPTIMIZED for Netscape Navigator 4.0 🚧
                  {/* @ts-expect-error marquee is deprecated but used for retro styling */}
                  </marquee>
                </span>
              </td>
            </tr>

            <tr>
              <td className="ie6-content-cell">
                {children}
              </td>
            </tr>

            <tr>
              <td className="ie6-footer-cell">
                <table width="100%" border={0} cellPadding={10}>
                  <tbody>
                    <tr>
                      <td className="ie6-footer-cell">
                        <span className="ie6-footer-link">
                          <b>
                            <a
                              href="https://github.com/skridlevsky/openchaos"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              [Click HERE to Visit Our GitHub]
                            </a>
                          </b>
                        </span>
                        <br />
                        <div style={{ marginTop: "10px" }}>
                          <Guestbook />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="ie6-footer-cell">
                        <span className="ie6-visitor-text">
                          {/* @ts-expect-error marquee is deprecated but used for retro styling */}
                          <marquee scrollamount="3">
                            👾 Last updated: {new Date().toLocaleDateString()} 👾 Webmaster: skridlevsky@geocities.com 👾
                          {/* @ts-expect-error marquee is deprecated but used for retro styling */}
                          </marquee>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="ie6-footer-cell">
                        <span className="ie6-warning-text">
                          <b>⚠️ WARNING: This site may cause seizures ⚠️</b>
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Spacer */}
        <div className="ie6-spacer"></div>

        {/* Bottom banner */}
        <table width="100%" border={1} cellPadding={5} className="ie6-bottom-banner">
          <tbody>
            <tr>
              <td className="ie6-footer-cell">
                <span className="ie6-bottom-banner-text">
                  {/* @ts-expect-error marquee is deprecated but used for retro styling */}
                  <marquee>
                    💿 Download Internet Explorer 6 NOW for the BEST browsing experience! 💿 Get Flash Player 8! 💿 Get <span onClick={() => setShowRealPlayer(true)} className="realplayer-link">RealPlayer</span>! 💿
                  {/* @ts-expect-error marquee is deprecated but used for retro styling */}
                  </marquee>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </main>
    </>
  );
}
