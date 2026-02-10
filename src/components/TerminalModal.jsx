import Terminal from "./Terminal";

import React, { useEffect, useState } from "react";
import { FiX, FiMinus, FiMaximize2 } from "react-icons/fi"; // Your existing terminal component

const TerminalModal = ({ isOpen, onClose, musicState }) => {
  const [isRendered, setIsRendered] = useState(false);

  const playSound = (type) => {
    const audio = new Audio(
      type === "open"
        ? "/songs/terminal-open.wav"
        : "/songs/terminal-close.wav",
    );
    audio.volume = 0.4; // Keep it subtle (40% volume)
    audio.play().catch((e) => console.error("Audio playback failed:", e));
  };

  // Handle Animation mounting/unmounting
  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      playSound("open");
    } else setTimeout(() => setIsRendered(false), 300); // Wait for exit animation
  }, [isOpen]);

  const handleClose = () => {
    playSound("close"); // Play sound immediately
    onClose(); // Trigger the state change in parent
  };

  if (!isRendered) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      {/* 1. Backdrop Blur (Click to close) */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      ></div>

      {/* 2. The Window Container */}
      <div
        className={`relative w-full max-w-3xl bg-[#0d1117] rounded-xl border border-white/10 shadow-2xl overflow-hidden transform transition-all duration-300 ${
          isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-10"
        }`}
      >
        {/* Window Title Bar (Mac OS Style) */}
        <div className="h-10 bg-[#161b22] border-b border-white/5 flex items-center justify-between px-4 select-none">
          {/* Traffic Lights */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleClose}
              className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors flex items-center justify-center group"
            >
              <FiX
                size={8}
                className="text-red-900 opacity-0 group-hover:opacity-100"
              />
            </button>
            <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors"></div>
            <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors"></div>
          </div>

          {/* Title */}
          <div className="text-xs font-mono text-gray-500 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            ayan@portfolio:~
          </div>

          {/* Spacer for balance */}
          <div className="w-10"></div>
        </div>

        {/* 3. The Actual Terminal Content */}
        <div className="h-[70vh] flex flex-col overflow-hidden">
          {/* We pass 'musicState' down so the terminal commands can still control music */}
          <Terminal musicState={musicState} />
        </div>
      </div>
    </div>
  );
};

export default TerminalModal;
