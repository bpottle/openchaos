"use client";

import { ReactNode } from "react";

interface IE6BrowserChromeProps {
  children: ReactNode;
}

export function IE6BrowserChrome({ children }: IE6BrowserChromeProps) {
  return (
    <div className="ie6-browser-window">
      {/* Window Title Bar */}
      <div className="ie6-titlebar">
        <div className="ie6-titlebar-left">
          <img 
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3E%3Cpath fill='%23fff' d='M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zM3.5 8a4.5 4.5 0 0 1 8.59-1.91l-2.24.75A2 2 0 1 0 8 10a2 2 0 0 0 1.85-1.23l2.24-.75A4.5 4.5 0 0 1 3.5 8z'/%3E%3C/svg%3E" 
            alt="Internet Explorer icon" 
            className="ie6-titlebar-icon"
          />
          <span className="ie6-titlebar-text">Microsoft Internet Explorer</span>
        </div>
        <div className="ie6-titlebar-buttons">
          <button className="ie6-titlebar-button ie6-minimize">
            <span style={{ position: 'relative', top: '-2px' }}>_</span>
          </button>
          <button className="ie6-titlebar-button ie6-maximize">
            <span style={{ fontSize: '11px' }}>□</span>
          </button>
          <button className="ie6-titlebar-button ie6-close">
            <span>✕</span>
          </button>
        </div>
      </div>

      {/* Menu Bar */}
      <div className="ie6-menubar">
        <span className="ie6-menu-item">File</span>
        <span className="ie6-menu-item">Edit</span>
        <span className="ie6-menu-item">View</span>
        <span className="ie6-menu-item">Favorites</span>
        <span className="ie6-menu-item">Tools</span>
        <span className="ie6-menu-item">Help</span>
      </div>

      {/* Navigation Toolbar */}
      <div className="ie6-toolbar">
        <div className="ie6-toolbar-buttons">
          <button className="ie6-toolbar-button" title="Back">
            <span className="ie6-button-icon">◀</span>
            <span className="ie6-button-label">Back</span>
          </button>
          <button className="ie6-toolbar-button" title="Forward">
            <span className="ie6-button-icon">▶</span>
            <span className="ie6-button-label">Forward</span>
          </button>
          <button className="ie6-toolbar-button" title="Stop">
            <span className="ie6-button-icon">✕</span>
            <span className="ie6-button-label">Stop</span>
          </button>
          <button className="ie6-toolbar-button" title="Refresh">
            <span className="ie6-button-icon">⟳</span>
            <span className="ie6-button-label">Refresh</span>
          </button>
          <button className="ie6-toolbar-button" title="Home">
            <span className="ie6-button-icon">🏠</span>
            <span className="ie6-button-label">Home</span>
          </button>
        </div>
        <div className="ie6-separator"></div>
        <div className="ie6-toolbar-buttons">
          <button className="ie6-toolbar-button" title="Search">
            <span className="ie6-button-icon">🔍</span>
            <span className="ie6-button-label">Search</span>
          </button>
          <button className="ie6-toolbar-button" title="Favorites">
            <span className="ie6-button-icon">⭐</span>
            <span className="ie6-button-label">Favorites</span>
          </button>
        </div>
      </div>

      {/* Address Bar */}
      <div className="ie6-addressbar">
        <span className="ie6-addressbar-label">Address</span>
        <div className="ie6-addressbar-input">
          <span className="ie6-addressbar-icon">🔒</span>
          <span className="ie6-addressbar-url">http://openchaos.dev</span>
        </div>
        <button className="ie6-addressbar-go">Go</button>
      </div>

      {/* Content Area */}
      <div className="ie6-content-area">
        {children}
      </div>
    </div>
  );
}
