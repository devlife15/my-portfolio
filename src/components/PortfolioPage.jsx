import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Dock from "./Dock";
import GithubStats from "./GithubStats";
import { useLofi } from "../hooks/useLofi";
import ScrambleText from "./ScrambleText";
import Tagline from "./Tagline";
import TerminalModal from "./TerminalModal";
import TechStack from "./TechStack";
import ProjectCard from "./ProjectCard";
import WritingRow from "./WritingRow";
import { FiArrowRight } from "react-icons/fi";
import LibraryRow from "./LibraryRow";
import BookmarkCard from "./BookmarkCard";
import PodcastCard from "./PodcastCard";
import { PROJECTS_DATA } from "../data/projectsData";
import ProjectList from "./ProjectList";
import Footer from "./Footer";

gsap.registerPlugin(ScrollTrigger);

const PortfolioPage = () => {
  const { isPlaying, togglePlay, nextTrack } = useLofi();
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  const headerRef = useRef(null);
  const aboutRef = useRef(null);
  const projectsSectionRef = useRef(null);
  const techSectionRef = useRef(null);
  const writingsSectionRef = useRef(null);
  const activitySectionRef = useRef(null);
  const librarySectionRef = useRef(null);
  const bookmarksSectionRef = useRef(null);
  const podcastsSectionRef = useRef(null);
  const footerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 }); // Small delay after loading screen

      // Header block slides up and fades in
      tl.fromTo(
        headerRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      )

        // About paragraphs stagger in
        .fromTo(
          aboutRef.current.querySelectorAll("p"),
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15, // Each paragraph 0.15s after previous
            ease: "power2.out",
          },
          "-=0.3", // Start slightly before header finishes
        );

      const scrollReveal = (element, options = {}) => {
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
              start: "top 85%", // Trigger when top of element hits 85% of viewport
              toggleActions: "play none none none", // Play once, don't reverse
            },
            ...options,
          },
        );
      };

      scrollReveal(projectsSectionRef.current);

      gsap.fromTo(
        projectsSectionRef.current.querySelectorAll(".project-card"),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: projectsSectionRef.current,
            start: "top 80%",
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

      // Footer
      gsap.fromTo(
        footerRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 95%",
            toggleActions: "play none none none",
          },
        },
      );
    });

    // Cleanup on unmount
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen text-[#888888] font-sans selection:bg-white/20 selection:text-white">
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-neutral-900/40 via-black to-black"></div>

      <Dock onTerminalClick={() => setIsTerminalOpen(true)} />

      <TerminalModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        musicState={{ isPlaying, togglePlay, nextTrack }}
      />

      <div className="relative z-10 max-w-150 mx-auto px-6 py-24 md:py-32 flex flex-col gap-15">
        {/* 1. HEADER - On load animation */}
        <section
          ref={headerRef}
          className="flex flex-col gap-8"
          style={{ opacity: 0 }}
        >
          {" "}
          {/* Start invisible */}
          <div className="flex items-center justify-between w-full">
            {/* LEFT SIDE: Avatar + Name/Tagline */}
            <div className="flex items-center gap-5">
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

            {/* RIGHT SIDE: The Badge */}
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20 shrink-0">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="hidden md:inline">Available for work</span>
              <span className="md:hidden">Available</span>{" "}
              {/* Optional: Shorten text on mobile */}
            </span>
          </div>
          <div
            ref={aboutRef}
            className="font-geist text-[16px] leading-[1.6] space-y-5 text-[#999999]"
          >
            <p>I'm a full-stack engineer based in Kolkata, India.</p>
            <p>
              I care deeply about writing clean code, building thoughtful user
              experiences, and continuously improving my craft.
            </p>
            <p>
              I’m currently seeking opportunities where I can contribute, learn
              fast, and build software that matters. If that sounds aligned with
              what you’re creating, let’s start a conversation.
            </p>
          </div>
        </section>

        <section
          ref={projectsSectionRef}
          className="flex flex-col gap-10"
          style={{ opacity: 0 }}
        >
          <h2 className="font-editorial text-[22px] text-[#EEEEEE] italic">
            Featured Projects
          </h2>
          <div className="flex flex-col gap-12">
            <div className="project-card">
              <ProjectCard
                title={"Help Deskly"}
                description={
                  "A command-line interface portfolio built with React."
                }
                year={"2026"}
                src={"src/assets/her.jpeg"}
              />
              <ProjectCard
                title={"Help Deskly"}
                description={
                  "A command-line interface portfolio built with React."
                }
                year={"2026"}
                src={"src/assets/her.jpeg"}
              />
              <ProjectCard
                title={"Help Deskly"}
                description={
                  "A command-line interface portfolio built with React."
                }
                year={"2026"}
                src={"src/assets/her.jpeg"}
              />
            </div>
          </div>
        </section>

        {/* <section className={`flex flex-col gap-10`}>
          <h2 className="font-editorial text-[22px] text-[#EEEEEE] italic">
            Featured Projects
          </h2>

          <ProjectList projects={PROJECTS_DATA} />
        </section> */}

        <section ref={techSectionRef} style={{ opacity: 0 }}>
          <h2 className="font-editorial text-[22px] text-[#EEEEEE] italic mb-6">
            Tech Stack
          </h2>
          <div className="opacity-60 hover:opacity-100 transition-opacity duration-500 -ml-3">
            <TechStack />
          </div>
        </section>

        <section
          ref={writingsSectionRef}
          className="flex flex-col gap-10"
          style={{ opacity: 0 }}
        >
          <h2 className="font-editorial text-[22px] text-[#EEEEEE] italic">
            Writings
          </h2>
          <div className="flex flex-col">
            {/* Render 5-6 Items */}
            <WritingRow
              title="How I built a terminal portfolio with React"
              date="Oct 2025"
              link="#"
            />
            <WritingRow
              title="Understanding React Server Components"
              date="Sep 2025"
              link="#"
            />
            <WritingRow
              title="The art of micro-interactions"
              date="Aug 2025"
              link="#"
            />
            <WritingRow
              title="Why I switched from VS Code to Neovim"
              date="Jul 2025"
              link="#"
            />
            <WritingRow
              title="Designing for dark mode first"
              date="Jun 2025"
              link="#"
            />
          </div>

          <a
            href="/blog"
            className="group inline-flex items-center gap-2 text-xs font-geistmono text-[#666666] hover:text-white transition-colors mt-2"
          >
            <span>read all posts</span>
            <FiArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </section>

        <section ref={activitySectionRef} style={{ opacity: 0 }}>
          <h2 className="font-editorial text-[18px] text-[#EEEEEE] italic mb-6">
            Github Activity
          </h2>
          <div className="opacity-60 hover:opacity-100 transition-opacity duration-500 -ml-3">
            <GithubStats username="devlife15" />
          </div>
        </section>

        <section
          className={`flex flex-col gap-8`}
          ref={librarySectionRef}
          style={{ opacity: 0 }}
        >
          <h2 className="font-editorial text-[18px] text-[#EEEEEE] italic mb-4">
            Library
          </h2>

          <div className="flex flex-col">
            <LibraryRow
              title="Designing Data-Intensive Applications"
              author="Martin Kleppmann"
              status="Reading"
              cover="https://www.oreilly.com/covers/urn:orm:book:9781491903063/300w/"
              link="https://www.amazon.com/..."
            />

            <LibraryRow
              title="Atomic Habits"
              author="James Clear"
              status="Reading"
              cover="https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1655988385i/40121378.jpg"
              link="#"
            />

            <LibraryRow
              title="The Pragmatic Programmer"
              author="David Thomas & Andrew Hunt"
              status="To Read"
              cover="https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1401432508i/4099.jpg"
              link="#"
            />
          </div>
        </section>

        <section
          className={`flex flex-col gap-6`}
          ref={bookmarksSectionRef}
          style={{ opacity: 0 }}
        >
          <h2 className="font-editorial text-[18px] text-[#EEEEEE] italic">
            Bookmarks
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <BookmarkCard
              title="The end of localhost"
              source="DX Tips"
              link="https://dx.tips/the-end-of-localhost"
            />

            <BookmarkCard
              title="Just JavaScript: The Mental Models"
              source="Dan Abramov"
              link="https://..."
            />

            <BookmarkCard
              title="Design Engineering as a process"
              source="Vercel"
              link="https://..."
            />

            <BookmarkCard
              title="Why I'm betting on Rust"
              source="Discord"
              link="https://..."
            />
          </div>
        </section>

        <section
          className={`flex flex-col gap-8`}
          ref={podcastsSectionRef}
          style={{ opacity: 0 }}
        >
          <h2 className="font-editorial text-[18px] text-[#EEEEEE] italic mb-2">
            Listening
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8">
            <PodcastCard
              show="Syntax.fm"
              title="Should a New Coder Use AI"
              episode="978"
              image="https://is1-ssl.mzstatic.com/image/thumb/Podcasts221/v4/37/48/97/3748974f-e0ae-159f-d869-37e1a146b2ea/mza_6771083142990398129.jpeg/300x300bb.webp"
              link="https://syntax.fm/show/978/should-a-new-coder-use-ai"
            />

            <PodcastCard
              show="Lex Fridman"
              title="Sam Altman: OpenAI, GPT-5, and AGI"
              episode="367"
              image="https://is1-ssl.mzstatic.com/image/thumb/Podcasts115/v4/3e/e3/9c/3ee39c89-de08-47a6-7f3d-3849cef6d255/mza_16657851278549137484.png/300x300bb.webp"
              link="https://..."
            />

            <PodcastCard
              show="Decoder"
              title="Siemens CEO's Mission to Automate Everything"
              image="https://is1-ssl.mzstatic.com/image/thumb/Podcasts112/v4/35/2c/4e/352c4ee6-46db-7aff-4287-fc9b7cc3e1b6/mza_3811812518505699598.jpg/300x300bb.webp"
              link="https://podcasts.apple.com/in/podcast/siemens-ceos-mission-to-automate-everything/id1011668648?i=1000748886990"
            />
          </div>
        </section>
        <Footer ref={footerRef} />
      </div>
    </div>
  );
};

export default PortfolioPage;
