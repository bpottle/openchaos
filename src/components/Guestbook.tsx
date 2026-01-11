"use client";

import { useState } from "react";

export function Guestbook() {
  const [isOpen, setIsOpen] = useState(false);

  const guestbookEntries = [
    {
      name: "xXCoolDude99Xx",
      date: "12/25/1999",
      message: "OMG this site is totally PHAT! The colors are so rad and that marquee is DA BOMB! Keep it real, webmaster! This is all that and a bag of chips!"
    },
    {
      name: "SkaterGrrl4Life",
      date: "11/18/1999",
      message: "Yo this page is the SHIZNIT! So totally tubular and wicked awesome! You're the bomb dot com! This site is off the hook! As if anyone could make something cooler!"
    },
    {
      name: "NetSurfer2000",
      date: "10/31/1999",
      message: "DUDE! This site is PHAT like whoa! Totally radical use of tables and colors! You da man! This is so money! The blink tags are killer! All your base are belong to this awesome site!"
    },
    {
      name: "TechWiz98",
      date: "09/15/1999",
      message: "This site is tight! Super fly and totally bangin'! The layout is choice and those animated GIFs would be off the chain! You got mad skills, homes! This is DOPE! Talk to the hand if you don't like it!"
    },
    {
      name: "CyberChick777",
      date: "08/08/1999",
      message: "OMG this is like, SO AWESOME! This page is all that! Totally fresh and def NOT bogus! You're a l33t webmaster! As if anyone could hate on this! It's the bee's knees! Booyah!"
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
