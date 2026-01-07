"use client";

import { useState, useEffect } from "react";

export function WebCounter() {
  // Start at the classic 1337 (leet)
  const [count, setCount] = useState<number>(1337);

  useEffect(() => {
    const incrementCounter = () => {
      // Random delay between 3-7 seconds (3000-7000ms)
      const randomDelay = Math.floor(Math.random() * 4000) + 3000;
      
      setTimeout(() => {
        setCount((prev) => prev + 1);
        incrementCounter(); // Schedule next increment
      }, randomDelay);
    };

    incrementCounter();
  }, []);

  // Format count to have leading zeros (6 digits)
  const formattedCount = count.toString().padStart(6, "0");
  
  // Split into individual digits for classic counter display
  const digits = formattedCount.split("");

  return (
    <div style={{ textAlign: "center", margin: "20px 0" }}>
      <table 
        border={2} 
        cellPadding={5} 
        cellSpacing={0} 
        className="webcounter-table"
        style={{ 
          margin: "0 auto",
          backgroundColor: "#000000",
          borderColor: "#ffff00"
        }}
      >
        <tbody>
          <tr>
            <td 
              colSpan={6} 
              style={{
                backgroundColor: "#0000ff",
                textAlign: "center",
                padding: "5px"
              }}
            >
              <span 
                style={{
                  fontSize: "14px",
                  color: "#ffff00",
                  fontFamily: "'Comic Sans MS', cursive",
                  fontWeight: "bold"
                }}
              >
                ★ YOU ARE VISITOR NUMBER ★
              </span>
            </td>
          </tr>
          <tr>
            {digits.map((digit, index) => (
              <td 
                key={index}
                style={{
                  backgroundColor: "#ff0000",
                  textAlign: "center",
                  padding: "8px",
                  border: "2px inset #ffffff"
                }}
              >
                <span 
                  style={{
                    fontSize: "28px",
                    color: "#00ff00",
                    fontFamily: "'Courier New', monospace",
                    fontWeight: "bold",
                    textShadow: "2px 2px #000000"
                  }}
                >
                  {digit}
                </span>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
