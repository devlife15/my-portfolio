import { useState, useEffect } from "react";
import "../spinAnimation.css";

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete(), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-[#0a0a0a] z-50 flex items-center justify-center overflow-hidden">
      {/* Animated geometric shapes in background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-[#00ff88] opacity-20 rotate-45 animate-spin-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 border border-[#00ff88] opacity-10 animate-pulse"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-md px-8">
        {/* Hexagon or circle loader */}
        <div className="mb-12 relative">
          <svg className="w-32 h-32 mx-auto" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#1a1a1a"
              strokeWidth="2"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#00ff88"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
              transform="rotate(-90 50 50)"
              className="transition-all duration-300"
              style={{ filter: "drop-shadow(0 0 8px rgba(0, 255, 136, 0.6))" }}
            />
          </svg>

          {/* Percentage in center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold text-[#00ff88]">
              {progress}%
            </span>
          </div>
        </div>

        {/* Text */}
        <h2 className="text-2xl font-bold text-white mb-2">
          Loading Portfolio
        </h2>
        <p className="text-[#666] text-sm">Preparing your experience</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
