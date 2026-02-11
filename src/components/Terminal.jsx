import { useEffect, useState, useRef } from "react";
import { commands } from "../data/commands";
import { blogArticles } from "../data/blogPublished";
import { codingQuotes } from "../data/codingQuotes";
import { executeCommand } from "../utils/commandExecutor";
import { programmingMemes } from "../data/programmingMemes";
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
      className="flex flex-col h-full w-full bg-[#0d1117] relative font-mono text-[13px] md:text-xs leading-relaxed selection:bg-green-500/30 selection:text-white"
      onClick={handleTerminalClick}
    >
      {/* 1. Removed gradient: Flat #0d1117 looks cleaner and matches the modal.
         2. Added 'custom-scrollbar': Ensure this class exists in index.css or use standard tailwind scroll classes
      */}
      <div
        ref={terminalRef}
        className="flex-1 p-4 overflow-y-auto bg-[#0d1117] scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#00ff88 #0f0f0f",
        }}
        onWheel={handleWheel}
      >
        <TerminalOutput commandHistory={commandHistory} />
      </div>

      {/* Input Area 
         1. Border: Changed to 'border-white/5' to match the rest of the site.
         2. Background: Matches container.
         3. Padding: Slightly reduced for a tighter feel.
      */}
      <div className="px-4 py-3 border-t border-white/5 bg-[#0d1117]">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          {/* Prompt: Made it non-breaking so it doesn't wrap weirdly */}
          <span className="text-green-500 font-bold shrink-0">
            {currentDir} <span className="text-green-400">$</span>
          </span>

          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-gray-300 placeholder-gray-600 caret-green-500"
            autoComplete="off"
            spellCheck="false"
            autoFocus
          />
        </form>
      </div>
    </div>
  );
};

export default Terminal;
