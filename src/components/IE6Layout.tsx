"use client";

import { ReactNode } from "react";

interface IE6LayoutProps {
  children: ReactNode;
}

export function IE6Layout({ children }: IE6LayoutProps) {
  return (
    <>
      {/* IE6 Compatibility Mode Header */}
      <div style={{
        background: 'linear-gradient(to right, #ff00ff, #00ffff, #ffff00)',
        padding: '4px',
        textAlign: 'center',
        fontFamily: 'Comic Sans MS, cursive',
        fontSize: '12px',
        fontWeight: 'bold'
      }}>
        🔥 Best Viewed in Internet Explorer 6.0 at 800x600 Resolution 🔥
      </div>

      <main style={{
        minHeight: '100vh',
        background: '#c0c0c0',
        fontFamily: 'Comic Sans MS, cursive',
        padding: '20px'
      }}>
        {/* Classic table-based layout */}
        <table width="100%" border={3} cellPadding={10} cellSpacing={0} style={{ backgroundColor: '#ffffff', borderColor: '#0000ff' }}>
          <tbody>
            <tr>
              <td style={{ backgroundColor: '#ff00ff', textAlign: 'center' }}>
                <table width="100%" border={0} cellPadding={0} cellSpacing={0}>
                  <tbody>
                    <tr>
                      <td style={{ textAlign: 'center' }}>
                        <span style={{ fontSize: '36px', color: '#ffff00', fontFamily: 'Comic Sans MS' }}>
                          <b>
                            {/* @ts-expect-error marquee is deprecated but used for retro styling */}
                            <marquee behavior="alternate" scrollamount="10">
                              ⭐ OPENCHAOS.DEV ⭐
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
              <td style={{ backgroundColor: '#ffff00', textAlign: 'center' }}>
                <span style={{ fontSize: '14px', color: '#ff0000', fontFamily: 'Arial' }}>
                  {/* @ts-expect-error marquee is deprecated but used for retro styling */}
                  <marquee scrollamount="5" width="80%">
                    🚧 UNDER CONSTRUCTION 🚧 Welcome to the WORLD WIDE WEB! 🚧 This site is OPTIMIZED for Netscape Navigator 4.0 🚧
                  {/* @ts-expect-error marquee is deprecated but used for retro styling */}
                  </marquee>
                </span>
              </td>
            </tr>

            <tr>
              <td style={{ backgroundColor: '#00ffff', textAlign: 'center', padding: '20px' }}>
                {children}
              </td>
            </tr>

            <tr>
              <td style={{ backgroundColor: '#00ff00', textAlign: 'center' }}>
                <table width="100%" border={0} cellPadding={10}>
                  <tbody>
                    <tr>
                      <td style={{ textAlign: 'center' }}>
                        <span style={{ fontSize: '14px', fontFamily: 'Arial' }}>
                          <b>
                            <a
                              href="https://github.com/skridlevsky/openchaos"
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ color: '#0000ff', textDecoration: 'underline' }}
                            >
                              [Click HERE to Visit Our GitHub]
                            </a>
                          </b>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: 'center' }}>
                        <span style={{ fontSize: '12px', color: '#666666', fontFamily: 'Courier New' }}>
                          {/* @ts-expect-error marquee is deprecated but used for retro styling */}
                          <marquee scrollamount="3" width="60%">
                            👾 You are visitor #999999 👾 Last updated: {new Date().toLocaleDateString()} 👾 Webmaster: skridlevsky@geocities.com 👾
                          {/* @ts-expect-error marquee is deprecated but used for retro styling */}
                          </marquee>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: 'center' }}>
                        <span style={{ fontSize: '12px', color: '#ff0000', fontFamily: 'Comic Sans MS' }}>
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
        <div style={{ height: '20px' }}></div>

        {/* Bottom banner */}
        <table width="100%" border={1} cellPadding={5} style={{ backgroundColor: '#000000' }}>
          <tbody>
            <tr>
              <td style={{ textAlign: 'center' }}>
                <span style={{ color: '#00ff00', fontFamily: 'Courier New', fontSize: '14px' }}>
                  {/* @ts-expect-error marquee is deprecated but used for retro styling */}
                  <marquee>
                    💿 Download Internet Explorer 6 NOW for the BEST browsing experience! 💿 Get Flash Player 8! 💿 Get RealPlayer! 💿
                  {/* @ts-expect-error marquee is deprecated but used for retro styling */}
                  </marquee>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </main>

      <style jsx>{`
        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        
        .blink-text {
          animation: blink 1s infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* IE6 compatibility styles */
        * {
          margin: 0;
          padding: 0;
        }
      `}</style>
    </>
  );
}