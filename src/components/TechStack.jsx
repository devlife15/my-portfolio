import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import "../marqueeStyle.css";

const TECH_DATA = {
  core: [
    {
      name: "TypeScript",
      icon: <img src="/assets/ts.svg" alt="Next" className="w-full h-full" />,
    },
    {
      name: "JavaScript",
      icon: <img src="/assets/js.svg" alt="Next" className="w-full h-full" />,
    },
    { name: "Tailwind", icon: "TW" },
    { name: "Shadcn", icon: "//" },
    { name: "Framer", icon: "FM" },
    { name: "FastAPI", icon: "⚡" },
    {
      name: "Node.js",
      icon: (
        <img src="/assets/nodejs.svg" alt="Next" className="w-full h-full" />
      ),
    },
    { name: "Postgres", icon: "PG" },
    {
      name: "Java",
      icon: <img src="/assets/java.svg" alt="Next" className="w-full h-full" />,
    },
  ],
  // For Full List View
  full: [
    {
      category: "Languages",
      items: [
        { name: "Go", icon: "GO" },
        { name: "Python", icon: "PY" },
        { name: "TypeScript", icon: "TS" },
        { name: "JavaScript", icon: "JS" },
        { name: "C++", icon: "C++" },
      ],
    },
    {
      category: "Frontend",
      items: [
        { name: "React", icon: "⚛️" },
        { name: "Next.js", icon: "N" },
        { name: "Tailwind CSS", icon: "TW" },
        { name: "Shadcn UI", icon: "//" },
        { name: "Framer Motion", icon: "FM" },
      ],
    },
    {
      category: "Backend & DB",
      items: [
        { name: "FastAPI", icon: "⚡" },
        { name: "Node.js", icon: "JS" },
        { name: "PostgreSQL", icon: "PG" },
        { name: "MongoDB", icon: "🍃" },
        { name: "Redis", icon: "🔴" },
        { name: "Firebase", icon: "🔥" },
      ],
    },
    {
      category: "Infra & Tools",
      items: [
        { name: "Docker", icon: "🐳" },
        { name: "Google Cloud", icon: "☁️" },
        { name: "Vercel", icon: "▲" },
        { name: "Git", icon: "G" },
        { name: "GitHub", icon: "GH" },
        { name: "Linux", icon: "🐧" },
        { name: "Nginx", icon: "N" },
      ],
    },
    {
      category: "AI & ML",
      items: [
        { name: "Hugging Face", icon: "🤗" },
        { name: "PyTorch", icon: "🔥" },
        { name: "Pandas", icon: "🐼" },
      ],
    },
  ],
};

const TechIcon = ({ icon }) => (
  <div className="w-9 h-9 flex items-center justify-center">{icon}</div>
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
        <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
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

        {/* MODE 1: INFINITE MARQUEE (Only visible when NOT expanded) */}
        {!isExpanded && (
          <div className="relative flex overflow-hidden mask-gradient w-full">
            {/* We duplicate the list to create the infinite loop effect */}
            <div className="animate-marquee flex gap-10 items-center py-4 whitespace-nowrap">
              {[...TECH_DATA.core, ...TECH_DATA.core, ...TECH_DATA.core].map(
                (item, idx) => (
                  <div
                    key={idx}
                    className="text-4xl transition-all duration-500 cursor-pointer"
                  >
                    {/* Using a larger icon for the marquee */}
                    <div className="scale-150">
                      <TechIcon icon={item.icon} />
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
