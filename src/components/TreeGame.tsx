"use client";

import { useState } from "react";

export function TreeGame() {
  const [isOpen, setIsOpen] = useState(false);

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate percentage position for responsiveness
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;
    
    // Winning zone: tiny section in upper-left quadrant
    // Between 15-20% from left and 20-25% from top
    if (xPercent >= 15 && xPercent <= 20 && yPercent >= 20 && yPercent <= 25) {
      alert("YOU WON! Click OK to enter your banking account information.");
    } else {
      alert("Sorry, try again!");
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="tree-game-button"
      >
        <b><span className="spin">💲</span> Win Cash Now! <span className="spin">💲</span></b>
      </button>

      {isOpen && (
        <div className="tree-game-overlay" onClick={() => setIsOpen(false)}>
          <div className="tree-game-modal" onClick={(e) => e.stopPropagation()}>
            <table width="100%" border={3} cellPadding={0} cellSpacing={0} className="tree-game-table">
              <tbody>
                <tr>
                  <td className="tree-game-header">
                    <span className="tree-game-header-text">
                      <b><span className="blink-text">💰 WIN $1 MILLION! 💰</span></b>
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="tree-game-instructions">
                    <span className="tree-game-instructions-text">
                      <b>FIND AND CLICK THE RIGHT LEAF TO WIN $1 MILLION!</b>
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="tree-game-image-container">
                    <img 
                      src="/tree.png" 
                      alt="Click the right leaf!"
                      className="tree-game-image"
                      onClick={handleImageClick}
                      style={{ cursor: 'pointer', maxWidth: '100%', display: 'block' }}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="tree-game-footer">
                    <button 
                      onClick={() => setIsOpen(false)}
                      className="tree-game-close-button"
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
