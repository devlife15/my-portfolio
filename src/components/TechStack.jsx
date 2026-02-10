import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

import { TECH_DATA } from "../data/techData";
import "../marqueeStyle.css";

// const TechIcon = ({ icon, name }) => (
//   <div className="w-7 h-7 flex items-center justify-center">
//     <img
//       src={icon}
//       alt={name}
//       className="w-full h-full invert brightness-0 hover:invert-0 hover:brightness-100"
//     />
//   </div>
// );

const TechIcon = ({ icon, name }) => (
  // 1. Add 'group' and 'relative' here so the tooltip can position itself relative to this box
  <div className="group relative w-7 h-7 flex items-center justify-center">
    {/* 2. THE TOOLTIP (Positioned Absolute) */}
    <div
      className="absolute -top-10 left-1/2 -translate-x-1/2 
                    bg-gray-800 text-white text-[10px] font-bold px-2 py-1 rounded-md 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                    whitespace-nowrap pointer-events-none z-50 shadow-lg"
    >
      {name}

      {/* Optional: Tiny Triangle Arrow pointing down */}
      <div
        className="absolute -bottom-1 left-1/2 -translate-x-1/2 
                      border-4 border-transparent border-t-gray-800"
      ></div>
    </div>

    {/* 3. THE ICON */}
    <img
      src={icon}
      alt={name}
      className="w-full h-full object-contain invert brightness-0 transition-all duration-300 
                 group-hover:invert-0 group-hover:brightness-100"
    />
  </div>
);

const CategoryColumn = ({ title, items }) => (
  <div className="flex flex-col gap-4">
    <h3 className="text-gray-500 text-xs font-bold tracking-widest uppercase mb-2 border-b border-gray-800 pb-2 w-max">
      {title}
    </h3>
    <div className="flex flex-col gap-3">
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center gap-3 group">
          <div className="grayscale group-hover:grayscale-0 transition-all duration-300">
            <TechIcon icon={item.icon} />
          </div>
          <span className="text-gray-400 group-hover:text-gray-200 text-sm font-medium transition-colors">
            {item.name}
          </span>
        </div>
      ))}
    </div>
  </div>
);

const TechStack = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="w-full mt-24 mb-12">
      {/* Header Text */}
      <div className="mb-8">
        <h2 className="text-gray-500 text-xs font-bold tracking-widest uppercase mb-4">
          Tech Stack
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl leading-relaxed font-editorial">
          I'm a generalist at heart who can build with anything, but here's the
          core stack I've spent the most time with:
        </p>
      </div>

      {/* VIEW TOGGLE (Marquee vs Grid) */}
      <div className="relative">
        {/* Toggle Button (Top Right) */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-xs font-bold tracking-wider text-gray-500 hover:text-white transition-colors uppercase"
          >
            {isExpanded ? "Show Less" : "View Full Stack"}
            {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
          </button>
        </div>

        {/* For Marquee (Lags a bit) */}
        {!isExpanded && (
          <div className="relative flex overflow-hidden mask-gradient w-full">
            <div className="animate-marquee flex gap-14 items-center py-14 whitespace-nowrap">
              {[...TECH_DATA.core, ...TECH_DATA.core, ...TECH_DATA.core].map(
                (item, idx) => (
                  <div
                    key={idx}
                    className="text-4xl transition-all duration-500 cursor-pointer"
                  >
                    {/* Using a larger icon for the marquee */}
                    <div className="scale-130">
                      <TechIcon icon={item.icon} name={item.name} />
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        )}

        {/* MODE 2: EXPANDED GRID (Only visible when expanded) */}
        {isExpanded && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12 animate-in fade-in slide-in-from-top-4 duration-500">
            {TECH_DATA.full.map((category, idx) => (
              <CategoryColumn
                key={idx}
                title={category.category}
                items={category.items}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TechStack;
