import React from "react";
import { FiGithub, FiFileText, FiMail } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";

const DockItem = ({ icon: Icon, href, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    // Increased padding (p-3) and icon size (size={20}) for the thicker bar
    className="p-3 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/20 active:scale-95"
    title={label}
  >
    <Icon size={20} />
  </a>
);

const Dock = () => {
  const links = [
    { icon: FiFileText, href: "/resume.pdf", label: "Resume" },
    {
      icon: FiGithub,
      href: "https://github.com/devlife15",
      label: "GitHub",
    },
    {
      icon: FaXTwitter,
      href: "https://twitter.com/kumarayan990",
      label: "X (Twitter)",
    },
    { icon: FiMail, href: "mailto:kumarayanatwork@email.com", label: "Email" },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-2 px-4 h-14 rounded-full bg-neutral-900/50 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/40">
        {links.map((link, index) => (
          <React.Fragment key={index}>
            <DockItem {...link} />
            {index < links.length - 1 && (
              <div
                className="w-px h-6 bg-white/10 mx-1"
                aria-hidden="true"
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Dock;
