import React, { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import Terminal from "./Terminal";
import Leo from "./Leo";

const TerminalModal = ({ isOpen, onClose, musicState }) => {
  const [isRendered, setIsRendered] = useState(false);

  const playSound = (type) => {
    const audio = new Audio(
      type === "open"
        ? "/songs/terminal-open.wav"
        : "/songs/terminal-close.wav",
    );
    audio.volume = 0.4;
    audio.play().catch((e) => console.error("Audio failed:", e));
  };

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      playSound("open");
    } else {
      setTimeout(() => setIsRendered(false), 300);
    }
  }, [isOpen]);

  const handleClose = () => {
    playSound("close");
    onClose();
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
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      ></div>

      <div
        className={`relative w-full max-w-4xl bg-[#0d1117] rounded-xl border border-white/10 shadow-2xl overflow-hidden flex flex-col transform transition-all duration-300 ${
          isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-10"
        }`}
        style={{ height: "min(550px, 75vh)" }}
      >
        <div className="h-10 shrink-0 bg-[#161b22] border-b border-white/5 flex items-center justify-between px-4 select-none">
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
          <div className="text-xs font-mono text-gray-500 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            ayan@portfolio:~/
          </div>
          <div className="w-10"></div>
        </div>

        <div className="flex-1 overflow-hidden relative">
          <Terminal musicState={musicState} />
        </div>
      </div>

      <Leo isOpen={isOpen} />
    </div>
  );
};

export default TerminalModal;
