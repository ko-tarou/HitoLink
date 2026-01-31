"use client";

import { motion } from "framer-motion";

interface TypewriterTextProps {
  text: string;
  className?: string;
  delay?: number;
}

const TypewriterText = ({ text, className = "", delay = 0 }: TypewriterTextProps) => {
  return (
    <motion.span
      className={`inline-block ${className}`}
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      transition={{
        duration: text.length * 0.05,
        delay,
        ease: "easeInOut",
      }}
      style={{
        overflow: "hidden",
        whiteSpace: "nowrap",
        borderRight: "3px solid #00f3ff",
        display: "inline-block",
      }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.1 }}
      >
        {text}
      </motion.span>
    </motion.span>
  );
};

export default TypewriterText;
