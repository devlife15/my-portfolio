import React from "react";

const TerminalPet = ({ petMessage, petMood }) => {
  return (
    <div
      className="absolute bottom-4 right-4 pointer-events-none flex flex-col items-end"
      // REMOVE the left style, it stays at right-4 now
    >
      {/* Message bubble */}
      {petMessage && (
        <div className="bg-[#1a1a1a] border border-[#00ff88] rounded-lg px-2 py-1 mb-1 text-xs text-[#00ff88] whitespace-nowrap">
          {petMessage}
        </div>
      )}

      {/* Pet character - no walking animation */}
      <div className="text-2xl">
        {petMood === "happy" && "🐱"}
        {petMood === "hungry" && "😿"}
        {petMood === "sleeping" && "😴"}
      </div>
    </div>
  );
};

export default TerminalPet;
