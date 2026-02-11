import React from "react";
import { FiPlay, FiHeadphones } from "react-icons/fi";

const PodcastCard = ({ title, show, episode, image, link }) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      className="group flex flex-col gap-3 w-full cursor-pointer"
    >
      {/* 1. SQUARE IMAGE CONTAINER */}
      <div className="relative w-full aspect-square bg-[#111] border border-white/5 rounded-sm overflow-hidden">
        {/* Artwork */}
        <img
          src={image}
          alt={show}
          className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 ease-out"
        />

        {/* Play Button Overlay (Hidden by default, appears on hover) */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 backdrop-blur-[2px] transition-all duration-300">
          <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <FiPlay className="fill-current ml-1" />
          </div>
        </div>

        {/* Corner Icon */}
        <div className="absolute top-2 right-2 text-white/50 group-hover:text-white transition-colors">
          <FiHeadphones size={12} />
        </div>
      </div>

      {/* 2. TEXT INFO */}
      <div className="flex flex-col gap-1">
        {/* Show Name (Mono badge style) */}
        <span className="font-geistmono text-[10px] text-[#555555] uppercase tracking-wider">
          {show}
        </span>

        {/* Episode Title */}
        <h3 className="font-editorial text-[16px] leading-tight text-[#CCCCCC] group-hover:text-white transition-colors line-clamp-2">
          {title}
        </h3>

        {/* Optional Episode Number */}
        {episode && (
          <span className="font-geist text-[12px] text-[#444444]">
            Ep. {episode}
          </span>
        )}
      </div>
    </a>
  );
};

export default PodcastCard;
