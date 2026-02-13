import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BootScreen from "./layout/BootScreen";
import Dock from "./features/Dock";
import { useLofi } from "../hooks/useLofi";
import TerminalModal from "./features/terminal/TerminalModal";
import HeroSection from "./sections/HeroSection";
import ProjectSection from "./sections/ProjectSection";
import TechStackSection from "./sections/TechStackSection";
import WorkExpSection from "./sections/WorkExpSection";
import BlogsSection from "./sections/BlogsSection";
import GithubSection from "./sections/GithubSection";
import BooksSection from "./sections/BooksSection";
import ArticleSection from "./sections/ArticleSection";
import PodcastsSection from "./sections/PodcastsSection";
import FooterSection from "./sections/FooterSection";

gsap.registerPlugin(ScrollTrigger);

const PortfolioPage = () => {
  const [hasEntered, setHasEntered] = useState(false);
  const { isPlaying, togglePlay, nextTrack } = useLofi();
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  const headerRef = useRef(null);
  const aboutRef = useRef(null);
  const experienceRef = useRef(null);
  const projectsSectionRef = useRef(null);
  const techSectionRef = useRef(null);
  const writingsSectionRef = useRef(null);
  const activitySectionRef = useRef(null);
  const librarySectionRef = useRef(null);
  const bookmarksSectionRef = useRef(null);
  const podcastsSectionRef = useRef(null);
  const footerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });
      tl.fromTo(
        headerRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      ).fromTo(
        aboutRef.current.querySelectorAll("p"),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power2.out" },
        "-=0.3",
      );

      const scrollReveal = (element) => {
        if (!element) return;
        gsap.fromTo(
          element,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      };
      gsap.fromTo(
        experienceRef.current.querySelectorAll(".work-card"),
        { opacity: 0, y: 50 }, // Start state
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2, // Smoother stagger
          ease: "power3.out",
          scrollTrigger: {
            trigger: experienceRef.current, // Trigger when the section hits view
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );

      gsap.fromTo(
        projectsSectionRef.current.querySelectorAll(".project-card"),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: projectsSectionRef.current,
            start: "top 75%", // Triggers slightly later for better effect
            toggleActions: "play none none none",
          },
        },
      );
      scrollReveal(techSectionRef.current);
      scrollReveal(writingsSectionRef.current);
      scrollReveal(activitySectionRef.current);
      scrollReveal(librarySectionRef.current);
      scrollReveal(bookmarksSectionRef.current);
      scrollReveal(podcastsSectionRef.current);
      scrollReveal(footerRef.current);
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen text-[#888888] font-sans selection:bg-white/20 selection:text-white">
      {!hasEntered && <BootScreen onEnter={() => setHasEntered(true)} />}
      <Dock onTerminalClick={() => setIsTerminalOpen(true)} />
      <TerminalModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        musicState={{ isPlaying, togglePlay, nextTrack }}
      />
      <div className="relative z-10 max-w-150 mx-auto px-6 py-24 md:py-32 flex flex-col gap-15">
        <HeroSection ref={headerRef} aboutRef={aboutRef} />
        <WorkExpSection ref={experienceRef} />
        <ProjectSection ref={projectsSectionRef} />
        {/* <section className={`flex flex-col gap-10`}>
          <h2 className="font-editorial text-[22px] text-[#EEEEEE] italic">
            Featured Projects
          </h2>

          <ProjectList projects={PROJECTS_DATA} />
        </section> */}
        <TechStackSection ref={techSectionRef} />
        <GithubSection ref={activitySectionRef} />
        <BlogsSection ref={writingsSectionRef} />
        <BooksSection ref={librarySectionRef} />
        <ArticleSection ref={bookmarksSectionRef} />
        <PodcastsSection ref={podcastsSectionRef} />
        <FooterSection ref={footerRef} />
      </div>
    </div>
  );
};

export default PortfolioPage;
