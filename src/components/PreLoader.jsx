import React, { useState, useEffect } from "react";

const languages = [
  "Hello", // English
  "Namaste", // Hindi
  "Bonjour", // French
  "Ciao", // Italian
  "Hola", // Spanish
  "Guten Tag", // German
  "Hallå", // Swedish
];

const Preloader = ({ onComplete }) => {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true); // For text fade-in/out effect
  const [isExiting, setIsExiting] = useState(false); // Triggers the slide-up animation

  useEffect(() => {
    // 1. Cycle through words
    if (index < languages.length - 1) {
      const timeout = setTimeout(() => {
        setFade(false); // Start fading out
        setTimeout(() => {
          setIndex((prev) => prev + 1);
          setFade(true); // Fade new word in
        }, 200); // Wait for fade out to finish
      }, 250); // Duration to stay visible
      return () => clearTimeout(timeout);
    }

    // 2. End of list -> Trigger Exit
    else {
      const timeout = setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => {
          onComplete(); // Tell parent component we are done
        }, 800); // Wait for slide-up animation to finish
      }, 1000); // Keep the final "Hello" on screen for a second
      return () => clearTimeout(timeout);
    }
  }, [index, onComplete]);

  // Don't render if completed (handled by parent, but safe check)
  if (!languages[index]) return null;

  return (
    <div
      className={`fixed inset-0 z-100 flex items-center justify-center bg-black text-white transition-transform duration-700 ease-in-out ${
        isExiting ? "-translate-y-full rounded-b-[3rem]" : "translate-y-0"
      }`}
    >
      {/* TECH VIBE: Subtle Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] opacity-20"></div>

      {/* TECH VIBE: Moving "Scanner" Line */}
      {!isExiting && (
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-green-500/50 to-transparent animate-scan"></div>
      )}

      {/* Center Content */}
      <div className="relative flex items-center gap-3">
        {/* The Dot (Pulsing) */}
        <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>

        {/* The Text */}
        <h1
          className={`text-4xl md:text-4xl font-editorial tracking-tight transition-opacity duration-200 ${
            fade ? "opacity-100 blur-0" : "opacity-0 blur-sm"
          }`}
        >
          {languages[index]}
        </h1>

        {/* Tech Vibe: Blinking Cursor */}
        <span className="text-4xl md:text-6xl font-light text-green-500 animate-blink">
          _
        </span>
      </div>

      {/* Loading Percentage (Bottom Right) */}
      <div className="absolute bottom-10 right-10 font-mono text-xs text-gray-500">
        LOADING_ASSETS...{" "}
        {Math.min(100, Math.round(((index + 1) / languages.length) * 100))}%
      </div>
    </div>
  );
};

export default Preloader;
