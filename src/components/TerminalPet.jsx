import React from "react";

const TerminalPet = () => {
  return (
    <div
      className="absolute bottom-4 transition-all duration-200 pointer-events-none flex flex-col items-center"
      style={{
        left: `${petPosition}%`,
      }}
    >
      {/* Message bubble */}
      {petMessage && (
        <div className="bg-[#1a1a1a] border border-[#00ff88] rounded-lg px-2 py-1 mb-1 text-xs text-[#00ff88] whitespace-nowrap animate-bounce">
          {petMessage}
        </div>
      )}
      {/* Pet character */}
      <div
        className="text-2xl"
        style={{ animation: "petWalk 0.5s steps(2) infinite" }}
      >
        {petMood === "happy" && "🐱"}
        {petMood === "hungry" && "😿"}
        {petMood === "sleeping" && "😴"}
      </div>
    </div>
  );
};

export default TerminalPet;
