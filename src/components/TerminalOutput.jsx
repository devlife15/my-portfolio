import React from "react";

const TerminalOutput = ({ commandHistory }) => {
  return commandHistory.map((item, index) => {
    if (item.type === "meme-image") {
      return (
        <div key={index} className="my-4 flex justify-center animate-fadeIn">
          <img
            src={item.imageUrl}
            alt="Programming meme"
            className="max-w-md max-h-96 rounded border-2 border-[#00ff88] cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => window.open(item.imageUrl, "_blank")}
          />
        </div>
      );
    }

    return (
      <div
        key={index}
        className={`mb-1 terminal-line ${
          item.type === "command"
            ? "text-[#d4d4d4] font-bold"
            : item.type === "error"
              ? "text-[#f56565]"
              : item.type === "system-header"
                ? "text-white font-bold"
                : item.type === "system-border"
                  ? "text-[#4a5568]"
                  : item.type === "system-title"
                    ? "text-[#00ff88] font-bold text-lg"
                    : item.type === "system-copyright"
                      ? "text-[#666666] text-xs"
                      : item.type === "comment"
                        ? "text-[#6A9955] italic"
                        : item.type === "skill-category"
                          ? "text-[#00ff88] font-bold"
                          : item.type === "spotify"
                            ? "text-[#1DB954]"
                            : item.type === "quote"
                              ? "text-[#9CDCFE] italic"
                              : item.type === "blog-item"
                                ? "text-[#d4d4d4] cursor-pointer hover:text-[#00ff88]"
                                : item.type === "blog-selected"
                                  ? "text-[#00ff88] font-bold"
                                  : item.type === "ascii-art"
                                    ? "text-[#00ff88] font-mono whitespace-pre"
                                    : "text-[#d4d4d4]"
        }`}
        onClick={() => {
          if (item.type === "blog-clickable" && item.url) {
            window.open(item.url, "_blank");
          }
        }}
      >
        {item.text}
      </div>
    );
  });
};

export default TerminalOutput;
