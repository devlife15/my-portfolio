import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useCursor } from "../utils/CursorContext";

const CustomCursor = () => {
  const { cursorVariant } = useCursor();

  // 1. Motion Values for raw mouse position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // 2. Spring Physics for the "Lag" (Lerp) effect
  // stiffness: how rigid the spring is (higher = faster)
  // damping: how much friction (higher = less bounce)
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // 3. Track Mouse Movement
  useEffect(() => {
    const moveCursor = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [mouseX, mouseY]);

  // 4. Animation Variants (The Shapes)
  const variants = {
    default: {
      height: 16,
      width: 16,
      backgroundColor: "#ffffff", // White
      borderRadius: "50%",
      mixBlendMode: "difference", // Inverts colors for visibility
    },
    text: {
      height: 32, // Tall
      width: 4, // Thin
      backgroundColor: "#3b82f6", // Blue caret color (optional)
      borderRadius: 0,
      mixBlendMode: "normal",
    },
    button: {
      height: 64, // Big square
      width: 64,
      backgroundColor: "#ffffff",
      borderRadius: "12px", // Rounded corners
      mixBlendMode: "difference",
    },
  };

  return (
    <motion.div
      variants={variants}
      animate={cursorVariant}
      transition={{ type: "spring", stiffness: 500, damping: 28 }} // Smooth shape morph
      className="fixed top-0 left-0 pointer-events-none z-9999"
      style={{
        translateX: cursorX,
        translateY: cursorY,
        // Center the cursor relative to the mouse point
        x: "-50%",
        y: "-50%",
      }}
    />
  );
};

export default CustomCursor;
