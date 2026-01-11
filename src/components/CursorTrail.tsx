"use client";

import { useEffect, useState } from "react";

interface CursorPoint {
  id: number;
  x: number;
  y: number;
}

export function CursorTrail() {
  const [cursors, setCursors] = useState<CursorPoint[]>([]);

  useEffect(() => {
    let cursorId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const newCursor: CursorPoint = {
        id: cursorId++,
        x: e.clientX,
        y: e.clientY
      };

      setCursors((prev) => [...prev, newCursor]);

      // Remove cursor after animation completes
      setTimeout(() => {
        setCursors((prev) => prev.filter((c) => c.id !== newCursor.id));
      }, 800);
    };

    // Throttle mouse move events for performance
    let throttleTimer: NodeJS.Timeout | null = null;
    const throttledMouseMove = (e: MouseEvent) => {
      if (!throttleTimer) {
        throttleTimer = setTimeout(() => {
          handleMouseMove(e);
          throttleTimer = null;
        }, 50);
      }
    };

    window.addEventListener("mousemove", throttledMouseMove);

    return () => {
      window.removeEventListener("mousemove", throttledMouseMove);
      if (throttleTimer) clearTimeout(throttleTimer);
    };
  }, []);

  return (
    <div style={{ pointerEvents: "none", position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 9999 }}>
      {cursors.map((cursor) => (
        <div
          key={cursor.id}
          className="cursor-trail-emoji"
          style={{
            position: "absolute",
            left: cursor.x,
            top: cursor.y,
            transform: "translate(-50%, -50%)",
            fontSize: "24px",
            userSelect: "none"
          }}
        >
          🦋
        </div>
      ))}
    </div>
  );
}
