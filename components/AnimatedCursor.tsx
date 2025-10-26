"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export default function AnimatedCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX - 10);
      cursorY.set(e.clientY - 10);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      {/* Main Emoji Cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] text-2xl select-none"
        style={{
          translateX: cursorXSpring,
          translateY: cursorYSpring,
        }}
      >
        🎉
      </motion.div>

      {/* Subtle glow trail */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
        style={{
          width: 40,
          height: 40,
          background:
            "radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%)",
          translateX: cursorXSpring,
          translateY: cursorYSpring,
        }}
      />
    </>
  );
}
