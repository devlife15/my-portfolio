import { FiPause, FiPlay, FiSkipForward } from "react-icons/fi";

const LofiWidget = ({ isPlaying, togglePlay, nextTrack }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center h-14 pl-4 pr-6 rounded-full bg-neutral-900/50 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/40 transition-all hover:border-green-500/30 group">
      <div
        className={`relative w-9 h-9 shrink-0 flex items-center justify-center rounded-full bg-black border border-gray-700 mr-4 ${isPlaying ? "animate-spin-slow" : ""}`}
      >
        <div className="w-2.5 h-2.5 bg-gray-200 rounded-full border border-gray-500"></div>

        <div className="absolute top-0 right-0 w-3 h-1.5 bg-gray-500 origin-bottom-right rotate-45 transform"></div>
      </div>

      <div className="flex flex-col justify-center mr-5">
        <span className="text-[9px] font-bold text-gray-500 tracking-widest uppercase mb-0.5">
          {isPlaying ? "Now Playing" : "Lofi Radio"}
        </span>

        <div className="flex items-center gap-3">
          <button
            onClick={togglePlay}
            className="text-white hover:text-green-400 transition-colors flex items-center"
          >
            {isPlaying ? <FiPause size={14} /> : <FiPlay size={14} />}
          </button>

          <button
            onClick={nextTrack}
            className="text-gray-400 hover:text-white transition-colors flex items-center"
          >
            <FiSkipForward size={14} />
          </button>
        </div>
      </div>

      <div className="flex items-end gap-0.5 h-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`w-1 bg-green-500/80 rounded-t-sm transition-all duration-300 ${isPlaying ? "animate-pulse" : "h-1 bg-gray-600/30"}`}
            style={{
              height: isPlaying
                ? `${Math.max(20, Math.random() * 100)}%`
                : "4px",
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LofiWidget;
