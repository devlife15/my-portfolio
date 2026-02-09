import React from "react";
import { GitHubCalendar } from "react-github-calendar";

const GithubStats = ({ username }) => {
  const theme = {
    dark: [
      "#333333", // Level 0 (Empty) - Dark Grey (Visible on black bg)
      "#4D4D4D", // Level 1 - Dim Grey
      "#7F7F7F", // Level 2 - Medium Grey
      "#B3B3B3", // Level 3 - Light Grey
      "#FFFFFF", // Level 4 - Pure White
    ],
  };

  return (
    <div className="w-full flex flex-col items-center justify-center py-8">
      <h2 className="text-gray-500 text-xs font-bold tracking-widest uppercase mb-6">
        GITHUB GRAPH
      </h2>
      <div className="p-4 rounded-xl border border-white/5 bg-neutral-900/30">
        <GitHubCalendar
          username={username}
          year="last"
          colorScheme="dark"
          theme={theme}
          blockSize={12}
          blockMargin={4}
          fontSize={12}
          style={{
            color: "#9ca3af",
          }}
        />
      </div>
    </div>
  );
};

export default GithubStats;
