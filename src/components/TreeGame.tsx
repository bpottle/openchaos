"use client";

import { useState, useEffect } from "react";

export function TreeGame() {
  const [isOpen, setIsOpen] = useState(false);
  const [showDebug, setShowDebug] = useState(false);
  const [keySequence, setKeySequence] = useState("");

  // Handle "w-i-n" key sequence to toggle debug overlay
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      const newSequence = (keySequence + e.key.toLowerCase()).slice(-3);
      setKeySequence(newSequence);
      
      if (newSequence === "win") {
        setShowDebug((prev) => !prev);
        setKeySequence(""); // Reset after toggle
      }
    };

    window.addEventListener("keypress", handleKeyPress);
    return () => window.removeEventListener("keypress", handleKeyPress);
  }, [isOpen, keySequence]);

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate percentage position for responsiveness
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;
    
    // Winning zone: tiny section in upper-left quadrant
    // Between 17-18.25% from left and 22-23.25% from top (1.25% x 1.25%)
    if (xPercent >= 17 && xPercent <= 18.25 && yPercent >= 22 && yPercent <= 23.25) {
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
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                      <img 
                        src="/tree.png" 
                        alt="Click the right leaf!"
                        className="tree-game-image"
                        onClick={handleImageClick}
                        style={{ cursor: 'pointer', maxWidth: '100%', display: 'block' }}
                      />
                      {/* Winning zone overlay - Type "w-i-n" to toggle */}
                      {showDebug && (
                        <div 
                          style={{
                            position: 'absolute',
                            left: '17%',
                            top: '22%',
                            width: '1.25%',
                            height: '1.25%',
                            backgroundColor: 'rgba(0, 255, 0, 0.3)',
                            border: '2px solid lime',
                            pointerEvents: 'none'
                          }}
                          title="Winning zone (17-18.25% x, 22-23.25% y)"
                        />
                      )}
                    </div>
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
