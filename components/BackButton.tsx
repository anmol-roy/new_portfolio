"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <motion.button
      onClick={() => router.push("/")}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.05, x: -5 }}
      whileTap={{ scale: 0.95 }}
      className="fixed top-6 left-6 z-50 flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-xl border border-white/20 rounded-full text-white font-medium shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </svg>
      <span>Back</span>
    </motion.button>
  );
}
