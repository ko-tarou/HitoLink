"use client";

import { motion } from "framer-motion";

type Props = {
  text: string;
  className?: string;
  delay?: number;
  once?: boolean;
};

export function TextReveal({ text, className = "", delay = 0, once = true }: Props) {
  const chars = text.split("");

  return (
    <span className={`inline-flex overflow-hidden ${className}`}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once, margin: "-20px 0px -20px 0px" }}
          transition={{
            duration: 0.4,
            delay: delay + i * 0.03,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}
