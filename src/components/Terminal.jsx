import { useEffect, useState, useRef } from "react";
import { commands } from "../data/commands";
import { blogArticles } from "../data/blogPublished";
import { codingQuotes } from "../data/codingQuotes";
import { executeCommand } from "../utils/commandExecutor";
import { programmingMemes } from "../data/programmingMemes";
import TerminalPet from "./TerminalPet";
import TerminalOutput from "./TerminalOutput";
import "../customStyle.css";

const Terminal = () => {
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState([
    {
      text: "Welcome to Ayan's Portfolio Terminal v1.25",
      type: "system-title",
    },
    {
      text: "© 2026 Ayan. All rights reserved.",
      type: "system-copyright",
    },
    { text: 'Type "help" to see available commands.', type: "system" },
    { text: "", type: "system" },
    {
      text: '🐱 A friendly cat is keeping you company! Type "treat" to feed it, or "dismiss" to hide it.',
      type: "system",
    },
  ]);
  const [currentDir] = useState("~");
  const [pastCommands, setPastCommands] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isProcessing, setIsProcessing] = useState(false);

  // Pet state
  const [petVisible, setPetVisible] = useState(true);
  const [petMood, setPetMood] = useState("happy"); // happy, hungry, sleeping
  const [lastFed, setLastFed] = useState(Date.now());
  const [petMessage, setPetMessage] = useState("Hello");

  // Blog navigation state
  const [blogIndex, setBlogIndex] = useState(0);

  const terminalRef = useRef(null);
  const inputRef = useRef(null);

  // ===== SCROLL HANDLER =====
  const handleWheel = (e) => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop += e.deltaY;
      e.stopPropagation();
    }
  };

  // ===== FOCUS HANDLER =====
  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // ===== AUTO-SCROLL EFFECT =====
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commandHistory]);

  // ===== AUTO-FOCUS ON MOUNT =====
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // ===== PET ANIMATION EFFECT =====
  // COMPONENT EXTRACTION NOTE: This logic can go into a usePet() custom hook
  useEffect(() => {
    if (!petVisible) return;

    const petInterval = setInterval(() => {
      // DELETE THIS LINE:
      // setPetPosition(prev => (prev + 1) % 100)

      // Check if pet is hungry
      const timeSinceFed = Date.now() - lastFed;
      if (timeSinceFed > 60000) {
        // 1 minute
        setPetMood("hungry");
        setPetMessage("Feed me! 🍽️");
      } else if (timeSinceFed > 120000) {
        // 2 minutes
        setPetMood("sleeping");
        setPetMessage("Zzz... 😴");
      } else {
        if (petMood === "happy" && petMessage !== "Hello visitor! 👋") {
          setPetMessage("");
        }
      }
    }, 200);

    return () => clearInterval(petInterval);
  }, [petVisible, lastFed, petMood, petMessage]);

  // ===== SMOOTH OUTPUT RENDERING =====
  // COMPONENT EXTRACTION NOTE: This can be a custom hook: useTerminalOutput()
  const renderOutput = async (output) => {
    setIsProcessing(true);

    for (let i = 0; i < output.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 20));
      setCommandHistory((prev) => [...prev, output[i]]);
    }

    setIsProcessing(false);
  };

  // ===== KEYBOARD NAVIGATION =====
  // COMPONENT EXTRACTION NOTE: Can be a custom hook: useKeyboardNavigation()
  const handleKeyDown = (e) => {
    // Command history navigation
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (pastCommands.length > 0) {
        const newIndex =
          historyIndex === -1
            ? pastCommands.length - 1
            : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(pastCommands[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= pastCommands.length) {
          setHistoryIndex(-1);
          setInput("");
        } else {
          setHistoryIndex(newIndex);
          setInput(pastCommands[newIndex]);
        }
      }
    }
    // Tab completion
    else if (e.key === "Tab") {
      e.preventDefault();
      const inputLower = input.toLowerCase();
      const matches = Object.keys(commands).filter((cmd) =>
        cmd.startsWith(inputLower),
      );
      if (matches.length === 1) {
        setInput(matches[0]);
      } else if (matches.length > 1 && input) {
        let commonPrefix = matches[0];
        for (let i = 1; i < matches.length; i++) {
          let j = 0;
          while (
            j < commonPrefix.length &&
            j < matches[i].length &&
            commonPrefix[j] === matches[i][j]
          ) {
            j++;
          }
          commonPrefix = commonPrefix.substring(0, j);
        }
        if (commonPrefix.length > input.length) {
          setInput(commonPrefix);
        }
      }
    }
  };

  // ===== FORM SUBMISSION =====
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isProcessing) return;

    if (input.trim() !== "") {
      setPastCommands((prev) => [...prev, input]);
      setHistoryIndex(-1);
      const cmd = input;
      setInput("");

      // Create context object with all needed state/setters
      const context = {
        petVisible,
        setPetVisible,
        setPetMood,
        setLastFed,
        setPetMessage,
        setCommandHistory,
        blogArticles,
        codingQuotes,
        programmingMemes,
      };

      await executeCommand(cmd, context, currentDir, renderOutput);
    }
  };
  return (
    <div
      className="flex flex-col h-full w-full bg-[#0f0f0f] relative" // CHANGED
      onClick={handleTerminalClick}
    >
      <div
        ref={terminalRef}
        className="p-4 text-sm font-mono flex-1 overflow-y-auto custom-scrollbar bg-linear-to-b from-[#121212] to-[#0a0a0a] relative" // CHANGED h-125 to flex-1
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#00ff88 #0f0f0f",
        }}
        onWheel={handleWheel}
      >
        <TerminalOutput commandHistory={commandHistory} />
      </div>

      {/* Input OUTSIDE the scrollable area so it sticks to bottom */}
      <div className="px-4 py-3 border-t border-[#2d3748]/40">
        <form onSubmit={handleSubmit} className="flex items-center group">
          <span className="text-[#00ff88] mr-2 group-hover:text-[#38A89D] transition-colors">
            {currentDir} $
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-[#d4d4d4] caret-[#00ff88]"
            autoComplete="off"
            spellCheck="false"
          />
        </form>
      </div>

      {petVisible && <TerminalPet petMood={petMood} petMessage={petMessage} />}
    </div>
  );
};

export default Terminal;
