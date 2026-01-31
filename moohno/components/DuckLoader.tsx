"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function DuckLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-offwhite"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <motion.div
            className="flex flex-col items-center gap-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {/* Walking duck SVG mascot */}
            <motion.div
              className="relative"
              animate={{
                x: [0, 30, 60, 90, 120],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 0.3,
              }}
            >
              <svg
                width="64"
                height="48"
                viewBox="0 0 64 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-md"
              >
                {/* Body */}
                <ellipse cx="32" cy="28" rx="18" ry="14" fill="#F4D03F" />
                {/* Belly */}
                <ellipse cx="32" cy="32" rx="12" ry="8" fill="#F9E79F" />
                {/* Head */}
                <circle cx="50" cy="20" r="12" fill="#F4D03F" />
                {/* Beak */}
                <path
                  d="M58 20 L68 18 L68 22 L58 20 Z"
                  fill="#E67E22"
                  className="origin-left"
                >
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    values="0 58 20; -5 58 20; 0 58 20"
                    dur="0.4s"
                    repeatCount="indefinite"
                  />
                </path>
                {/* Eye */}
                <circle cx="54" cy="18" r="3" fill="#333" />
                <circle cx="55" cy="17" r="1" fill="white" />
                {/* Wing - animated for walking */}
                <ellipse
                  cx="28"
                  cy="26"
                  rx="8"
                  ry="6"
                  fill="#F9E79F"
                  transform="rotate(-15 28 26)"
                >
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    values="-15 28 26; 5 28 26; -15 28 26"
                    dur="0.35s"
                    repeatCount="indefinite"
                  />
                </ellipse>
                {/* Left foot */}
                <motion.path
                  d="M22 40 L26 46 L30 40"
                  stroke="#E67E22"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  animate={{ rotate: [0, 8, -8, 0] }}
                  transition={{ duration: 0.4, repeat: Infinity }}
                />
                {/* Right foot */}
                <motion.path
                  d="M34 40 L38 46 L42 40"
                  stroke="#E67E22"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  animate={{ rotate: [0, -8, 8, 0] }}
                  transition={{ duration: 0.4, repeat: Infinity, delay: 0.2 }}
                />
              </svg>
            </motion.div>
            <motion.p
              className="font-display text-xl text-darkgray/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              moohno
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
