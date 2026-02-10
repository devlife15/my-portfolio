import React, { useState } from "react";
import LofiWidget from "./LofiWidget";
import Dock from "./Dock";
import GithubStats from "./GithubStats";
import { useLofi } from "../hooks/useLofi";
import ScrambleText from "./ScrambleText";
import Tagline from "./Tagline";
import TerminalModal from "./TerminalModal";

const PortfolioPage = () => {
  const { isPlaying, togglePlay, nextTrack } = useLofi();
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  return (
    // Base text color adjusted to a slightly softer gray for less eye strain
    <div className="min-h-screen text-[#888888] font-sans selection:bg-white/20 selection:text-white">
      {/* Background Gradient (Subtle) */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-neutral-900/40 via-black to-black"></div>

      {/* Widgets */}
      <LofiWidget
        isPlaying={isPlaying}
        togglePlay={togglePlay}
        nextTrack={nextTrack}
      />

      <Dock onTerminalClick={() => setIsTerminalOpen(true)} />

      {/* --- THE TERMINAL MODAL --- */}
      <TerminalModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        musicState={{ isPlaying, togglePlay, nextTrack }}
      />

      {/* MAIN CONTAINER
         - max-w-[600px]: Tighter width to match the small font size (prevents lines from getting too long).
         - py-32: Generous vertical whitespace.
      */}
      <div className="relative z-10 max-w-150 mx-auto px-6 py-24 md:py-32 flex flex-col gap-20">
        {/* 1. HEADER & INTRO */}
        <section className="flex flex-col gap-8">
          {/* Header Block */}
          <div className="flex items-center gap-5">
            {/* Avatar: Small & Sharp (48px - 56px range) */}
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-neutral-800 border border-white/5 overflow-hidden shadow-inner shrink-0">
              <img
                src="https://github.com/devlife15.png"
                alt="Ayan"
                className="w-full h-full object-cover opacity-90"
              />
            </div>

            <div className="flex flex-col">
              <ScrambleText
                text={"Ayan Kumar"}
                className="font-editorial text-[20px] italic font-light text-[#EEEEEE] leading-tight"
              />
              <Tagline />
            </div>
          </div>

          {/* ABOUT TEXT: 15px (per request) */}
          {/* 'leading-[1.6]' gives it that breathable editorial spacing */}
          <div className="font-geist text-[15px] leading-[1.6] space-y-5 text-[#999999]">
            <p>I'm a frontend engineer based in Kolkata, India.</p>
            <p>
              I love building delightful user interfaces and making the web more
              enjoyable. I care deeply about craft—the kind you notice when it's
              done right, and miss when it's not.
            </p>
            <p>
              Previously, I worked on high-performance dashboards and design
              systems. Currently, I am looking for my next full-time role as a
              design engineer, ideally at a startup where engineering meets art.
            </p>
          </div>

          {/* SOCIALS REMOVED (Moved to Dock) */}
        </section>

        {/* 2. SELECTED WORK */}
        <section className="flex flex-col gap-10">
          {/* SECTION HEADING: 18px (per request) */}
          <h2 className="font-editorial text-[18px] text-[#EEEEEE] italic">
            Work
          </h2>

          <div className="flex flex-col gap-12">
            <ProjectCard
              title="Terminal Portfolio"
              description="A command-line interface portfolio built with React."
              year="2026"
            />
            <ProjectCard
              title="SaaS Dashboard"
              description="Analytics platform for legacy Modbus devices."
              year="2025"
            />
            <ProjectCard
              title="Onavix Studio"
              description="Agency website with WebGL interactions."
              year="2024"
            />
          </div>
        </section>

        {/* 3. ACTIVITY (Github) */}
        <section>
          <h2 className="font-editorial text-[18px] text-[#EEEEEE] italic mb-6">
            Activity
          </h2>
          {/* Opacity lowered to blend with the minimal aesthetic */}
          <div className="opacity-60 hover:opacity-100 transition-opacity duration-500 -ml-3">
            <GithubStats username="devlife15" />
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-12 border-t border-white/5 flex justify-between font-geist text-[12px] text-[#444444] uppercase tracking-wider">
          <span>© 2026 Ayan</span>
          <span>Available for work</span>
        </footer>
      </div>
    </div>
  );
};

// --- Minimal Project Card ---
const ProjectCard = ({ title, description, year }) => (
  <div className="group cursor-pointer">
    {/* Image Container: Clean, sharp corners, subtle border */}
    <div className="w-full aspect-video bg-[#111111] border border-white/5 rounded-sm mb-4 overflow-hidden relative">
      {/* Placeholder for Image */}
      <div className="absolute inset-0 bg-neutral-900 group-hover:scale-[1.02] transition-transform duration-700 ease-out"></div>
      <div className="absolute inset-0 flex items-center justify-center text-[#333] font-editorial italic">
        Preview
      </div>
    </div>

    {/* Text Info */}
    <div className="flex justify-between items-baseline">
      <div>
        <h3 className="font-geist font-medium text-[15px] text-[#DDDDDD] group-hover:underline decoration-white/30 underline-offset-4 transition-all">
          {title}
        </h3>
        <p className="font-geist text-[14px] text-[#666666] mt-1">
          {description}
        </p>
      </div>
      <span className="font-mono text-[12px] text-[#444444]">{year}</span>
    </div>
  </div>
);

export default PortfolioPage;
