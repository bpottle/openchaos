"use client";

import { useState } from "react";

export function Guestbook() {
  const [isOpen, setIsOpen] = useState(false);

  const guestbookEntries = [
    {
      name: "xXCoolDude99Xx",
      date: "12/25/1999",
      message: "Y2K is coming!!! Stock up on canned food and batteries! The government doesn't want you to know! Visit my site: geocities.com/area51/bunker/xXCoolDude99Xx for the TRUTH!!!"
    },
    {
      name: "SkaterGrrl4Life",
      date: "11/18/1999",
      message: "SEND THIS TO 10 PPL OR YOU WILL HAVE BAD LUCK FOR 7 YEARS!!! Britney is my queen btw. ^_^"
    },
    {
      name: "NetSurfer2000",
      date: "10/31/1999",
      message: "FREE MONEY ONLINE!!! Work from home!!! Click here -> www.priceiswrongbitch.net <- I made $5000 last week!!! This really works!!!"
    },
    {
      name: "TechWiz98",
      date: "09/15/1999",
      message: "WHOA this is like THE MATRIX! What if WE'RE in the matrix right now?!?! Email me: TechWiz98@hotmail.com to discuss THEORIES!"
    },
    {
      name: "CyberChick777",
      date: "08/08/1999",
      message: "OpenChaos 4 ever <3 <3 <3 Also my homepage is angelfire.com/cybercutie777 plz visit & sign MY guestbook too!!!! xoxo *~*~*"
    }
  ];

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="guestbook-button"
      >
        <b>📝 Sign My Guestbook! 📝</b>
      </button>

      {isOpen && (
        <div className="guestbook-modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="guestbook-modal" onClick={(e) => e.stopPropagation()}>
            <table width="100%" border={3} cellPadding={0} cellSpacing={0} className="guestbook-modal-table">
              <tbody>
                <tr>
                  <td className="guestbook-modal-header">
                    <span className="guestbook-modal-header-text">
                      <b><span className="sparkle-shine">✨</span> GUESTBOOK <span className="sparkle-shine sparkle-delay-2">✨</span></b>
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="guestbook-modal-subheader">
                    <span className="guestbook-modal-subheader-text">
                      {/* @ts-expect-error marquee is deprecated but used for retro styling */}
                      <marquee scrollamount="3">
                        <span className="sparkle-twinkle">🌟</span> Thanks for visiting! Please read what other visitors have said! <span className="sparkle-twinkle sparkle-delay-1">🌟</span>
                      {/* @ts-expect-error marquee is deprecated but used for retro styling */}
                      </marquee>
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="guestbook-modal-content">
                    <div className="guestbook-entries-container">
                      {guestbookEntries.map((entry, index) => (
                        <table 
                          key={index} 
                          width="100%" 
                          border={2} 
                          cellPadding={8} 
                          cellSpacing={0}
                          className="guestbook-entry-table"
                        >
                          <tbody>
                            <tr>
                              <td className="guestbook-entry-header">
                                <span className="guestbook-entry-name">
                                  <b>{entry.name}</b>
                                </span>
                                <span className="guestbook-entry-date">
                                  {entry.date}
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td className="guestbook-entry-message">
                                {entry.message}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      ))}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="guestbook-modal-footer">
                    <button 
                      onClick={() => setIsOpen(false)}
                      className="guestbook-close-button"
                    >
                      <b>[X] CLOSE</b>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
