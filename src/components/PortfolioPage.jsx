import React from "react";
import ProfileHeader from "./ProfileHeader";
import {
  FiMapPin,
  FiGlobe,
  FiMail,
  FiClock,
  FiFileText,
  FiGithub,
  FiTwitter,
} from "react-icons/fi";
import { RiReactjsLine, RiTailwindCssFill } from "react-icons/ri";
import { SiTypescript } from "react-icons/si";
import Terminal from "./Terminal";

// --- Components for the Left Panel ---

const ContactItem = ({ icon: Icon, text }) => (
  <div className="flex items-center gap-3 text-gray-400">
    <Icon className="w-5 h-5" />
    <span className="text-sm font-mono">{text}</span>
  </div>
);

const ContactDetails = () => {
  return (
    <div className="grid grid-cols-2 gap-y-3 gap-x-8 mb-10">
      <ContactItem icon={FiMapPin} text="Working Remotely" />
      <ContactItem icon={FiGlobe} text="kumarayan.com" />
      <ContactItem icon={FiMail} text="kumarayanatwork@gmail.com" />
      <ContactItem icon={FiClock} text="06:10 PM // same time" />
    </div>
  );
};

const TechBadge = ({ icon: Icon, name, color }) => (
  <span
    className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium bg-gray-800 text-gray-200 border border-gray-700`}
  >
    <Icon className={`w-4 h-4 ${color}`} />
    {name}
  </span>
);

const AboutSection = () => {
  return (
    <div className="mb-10">
      <p
        className="text-gray-300 leading-relaxed text-lg"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        I build interactive web apps using{" "}
        <TechBadge
          icon={SiTypescript}
          name="TypeScript"
          color="text-blue-400"
        />
        , <TechBadge icon={RiReactjsLine} name="React" color="text-cyan-400" />,
        and{" "}
        <TechBadge
          icon={RiTailwindCssFill}
          name="Tailwind CSS"
          color="text-teal-400"
        />
        . With a focus on UI design. Enthusiastic about creating seamless user
        experiences, driven by a keen eye for design.
      </p>
    </div>
  );
};

const SocialButton = ({ icon: Icon, label, href }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-md transition-colors border border-gray-700"
    style={{ fontFamily: "Inter, sans-serif" }}
  >
    <Icon className="w-5 h-5" />
    {label && <span>{label}</span>}
  </a>
);

const SocialIcons = () => {
  return (
    <div className="flex flex-wrap gap-3">
      <SocialButton icon={FiFileText} label="Resume" href="#" />
      <SocialButton
        icon={FiMail}
        label="Contact"
        href="mailto:siddharth@onavix.com"
      />
      <div className="w-px h-8 bg-gray-700 mx-2"></div> {/* Separator */}
      <SocialButton icon={FiTwitter} href="#" />
      <SocialButton icon={FiGithub} href="#" />
      <SocialButton icon={FiMail} href="#" />
    </div>
  );
};

const LeftPanel = () => {
  return (
    <div className="p-12 pt-24 flex flex-col h-full items-start w-full">
      <ProfileHeader />
      <ContactDetails />
      <AboutSection />
      <SocialIcons />
    </div>
  );
};

const PortfolioPage = () => {
  return (
    <div className="min-h-screen text-gray-200 flex items-center justify-center font-sans">
      <div className="container max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 h-full min-h-150">
        {/* For my Primary Details */}
        <div className="flex items-center">
          <LeftPanel />
        </div>

        {/* My Terminal */}
        <div className="flex items-center justify-center p-12">
          <Terminal />
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;
