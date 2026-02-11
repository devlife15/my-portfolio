import React from "react";

const ProjectCard = ({ title, description, year, src }) => {
  return (
    <div className="group cursor-pointer w-full">
      {/* 1. IMAGE CONTAINER */}
      <div className="w-full aspect-video bg-[#111111] border border-white/5 rounded-sm mb-4 overflow-hidden relative">
        {src ? (
          // REAL IMAGE
          <img
            src={src}
            alt={title}
            className="w-full h-full object-cover opacity-80 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-700 ease-out"
          />
        ) : (
          // FALLBACK PLACEHOLDER (If no image is provided)
          <>
            <div className="absolute inset-0 bg-neutral-900 group-hover:scale-[1.02] transition-transform duration-700 ease-out"></div>
            <div className="absolute inset-0 flex items-center justify-center text-[#333] font-editorial italic">
              Project Image
            </div>
          </>
        )}
      </div>

      {/* 2. TEXT INFO */}
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-1">
          {/* Title: Updated to 'font-editorial' (Italic) */}
          <h3 className="font-editorial text-[18px] italic text-[#EEEEEE] group-hover:text-white transition-colors">
            {title}
          </h3>

          {/* Description: Stays 'font-geist' */}
          <p className="font-geist text-[14px] text-[#888888] line-clamp-2">
            {description}
          </p>
        </div>

        {/* Year */}
        <span className="font-geistmono text-[12px] text-[#444444] mt-1.5 shrink-0">
          {year}
        </span>
      </div>
    </div>
  );
};

export default ProjectCard;
