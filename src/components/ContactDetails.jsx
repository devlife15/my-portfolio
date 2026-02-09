import React, { useState, useEffect } from "react";

// --- Clock Component (No hydration errors) ---
const LiveClock = () => {
  const [time, setTime] = useState(null);

  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!time) return null;

  return (
    <span className="tabular-nums">
      {time
        .toLocaleTimeString([], {
          hour12: true,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
        .toUpperCase()}
    </span>
  );
};

// --- Minimal Item Component ---
const MinimalItem = ({ label, value, isLink, href, isCopyable }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!isCopyable) return;
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLink) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-white transition-colors border-b border-transparent hover:border-gray-500"
      >
        {value}
      </a>
    );
  }

  if (isCopyable) {
    return (
      <span
        onClick={handleCopy}
        className="cursor-pointer hover:text-white transition-colors relative group"
        title="Click to copy"
      >
        {copied ? <span className="text-green-400">Copied!</span> : value}
        <span className="absolute -bottom-1 left-0 w-full h-px bg-transparent group-hover:bg-gray-600"></span>
      </span>
    );
  }

  return <span>{value}</span>;
};

const ContactDetails = () => {
  return (
    <div className="flex flex-col gap-0.5 w-full mb-8 font-mono text-sm text-gray-500">
      {/* Row 1: The "Meta" Data Style */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        {/* Phonetic/Name - Optional styling choice based on image */}
        <span className="text-gray-400 italic">/sɪd-ɑːrth/</span>

        <span className="text-gray-700">•</span>

        <span className="text-gray-400">he/him</span>

        <span className="text-gray-700">•</span>

        {/* Live Clock */}
        <div className="flex items-center gap-2 text-gray-400">
          <LiveClock />
          <span className="text-xs font-bold text-green-500 px-1.5 py-0.5 bg-green-500/10 rounded">
            IST
          </span>
        </div>
      </div>

      {/* Row 2: Location & Contact */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <MinimalItem value="Working Remotely" />

        <span className="text-gray-700">•</span>

        <MinimalItem
          value="kumarayan.com"
          isLink
          href="https://kumarayan.com"
        />

        <span className="text-gray-700">•</span>

        <MinimalItem value="kumarayanatwork@gmail.com" isCopyable />
      </div>
    </div>
  );
};

export default ContactDetails;
