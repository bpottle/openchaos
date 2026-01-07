"use client";

import { useState, useEffect } from "react";

function getNextSunday8PM(): Date {
  const now = new Date();
  const target = new Date(now);

  // Set to next Sunday
  const daysUntilSunday = (7 - now.getUTCDay()) % 7;
  target.setUTCDate(now.getUTCDate() + (daysUntilSunday === 0 ? 7 : daysUntilSunday));

  // Set to 09:00 UTC
  target.setUTCHours(9, 0, 0, 0);

  // If it's Sunday but before 09:00 UTC, use today
  if (now.getUTCDay() === 0 && now.getUTCHours() < 9) {
    target.setUTCDate(now.getUTCDate());
  }

  return target;
}

function getTimeRemaining(target: Date): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
} {
  const now = new Date();
  const diff = Math.max(0, target.getTime() - now.getTime());

  const seconds = Math.floor((diff / 1000) % 60);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const hours = Math.floor((diff / 1000 / 60 / 60) % 24);
  const days = Math.floor(diff / 1000 / 60 / 60 / 24);

  return { days, hours, minutes, seconds };
}

function pad(n: number): string {
  return n.toString().padStart(2, "0");
}

export function Countdown() {
  const [target] = useState(() => getNextSunday8PM());
  const [time, setTime] = useState(() => getTimeRemaining(target));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setTime(getTimeRemaining(target));
    }, 1000);

    return () => clearInterval(interval);
  }, [target]);

  if (!mounted) {
    return (
      <table border="3" cellPadding="15" bgcolor="#ff00ff" style={{ borderColor: '#ffff00' }}>
        <tbody>
          <tr>
            <td align="center">
              <font size="7" color="#00ff00" face="Courier New">
                <b>--d --h --m --s</b>
              </font>
              <br />
              <font size="3" color="#ffff00" face="Comic Sans MS">
                <b>⏰ until next merge ⏰</b>
              </font>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }

  return (
    <table border="3" cellPadding="15" bgcolor="#ff00ff" style={{ borderColor: '#ffff00' }}>
      <tbody>
        <tr>
          <td align="center">
            <font size="7" color="#00ff00" face="Courier New">
              <b className="blink-countdown">
                {time.days}d {pad(time.hours)}h {pad(time.minutes)}m {pad(time.seconds)}s
              </b>
            </font>
            <br />
            <font size="3" color="#ffff00" face="Comic Sans MS">
              <b>⏰ until next merge ⏰</b>
            </font>
          </td>
        </tr>
      </tbody>
      <style jsx>{`
        @keyframes blink-countdown {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0.7; }
        }
        
        .blink-countdown {
          animation: blink-countdown 1s infinite;
        }
      `}</style>
    </table>
  );
}