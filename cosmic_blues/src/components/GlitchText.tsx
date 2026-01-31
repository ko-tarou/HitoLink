"use client";

import { motion } from "framer-motion";

interface GlitchTextProps {
  text: string;
  className?: string;
}

const GlitchText = ({ text, className = "" }: GlitchTextProps) => {
  return (
    <motion.span
      className={`relative inline-block ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <span
        className="relative z-10"
        style={{
          textShadow: `
            0 0 10px #00f3ff,
            0 0 20px #00f3ff,
            0 0 40px #00f3ff
          `,
        }}
      >
        {text}
      </span>
      <motion.span
        className="absolute left-0 top-0 z-0 opacity-70"
        style={{
          color: "#00f3ff",
          textShadow: "2px 0 #ff00ff, -2px 0 #00f3ff",
          clipPath: "inset(0 0 0 0)",
        }}
        animate={{
          x: [0, -2, 2, -1, 1, 0],
          opacity: [0.7, 0.5, 0.8, 0.6, 0.7],
        }}
        transition={{
          duration: 0.3,
          repeat: Infinity,
          repeatDelay: 3,
        }}
      >
        {text}
      </motion.span>
      <motion.span
        className="absolute left-0 top-0 z-0 opacity-50"
        style={{
          color: "#ff00ff",
          textShadow: "-2px 0 #00f3ff, 2px 0 #ff00ff",
        }}
        animate={{
          x: [0, 2, -2, 1, -1, 0],
          opacity: [0.5, 0.7, 0.4, 0.6, 0.5],
        }}
        transition={{
          duration: 0.3,
          repeat: Infinity,
          repeatDelay: 3,
          delay: 0.1,
        }}
      >
        {text}
      </motion.span>
    </motion.span>
  );
};

export default GlitchText;
