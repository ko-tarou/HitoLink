"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Leaf } from "lucide-react";

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-forest-950"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Ambient particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-gold-300/40"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0.2, 0.8, 0.2],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 1.5,
                }}
              />
            ))}
          </div>

          {/* Sprouting plant animation */}
          <div className="relative flex flex-col items-center">
            {/* Pot */}
            <motion.div
              className="w-20 h-14 rounded-b-2xl border-4 border-earth-400 bg-earth-300/30"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{
                borderTopWidth: 2,
                borderTopColor: "transparent",
                clipPath: "polygon(10% 0, 90% 0, 100% 100%, 0 100%)",
              }}
            />

            {/* Stem */}
            <motion.div
              className="absolute -top-8 left-1/2 w-1 bg-forest-400 origin-bottom"
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{
                duration: 1.2,
                delay: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ height: 40, marginLeft: -2 }}
            />

            {/* Leaves */}
            <motion.div
              className="absolute -top-12 left-1/2 flex gap-4 -translate-x-1/2"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 1.2,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Leaf
                className="w-8 h-8 text-forest-500 -rotate-12"
                strokeWidth={1.5}
                fill="currentColor"
              />
              <Leaf
                className="w-10 h-10 text-forest-400 rotate-6"
                strokeWidth={1.5}
                fill="currentColor"
              />
              <Leaf
                className="w-8 h-8 text-forest-500 rotate-12"
                strokeWidth={1.5}
                fill="currentColor"
              />
            </motion.div>
          </div>

          {/* Store name */}
          <motion.p
            className="mt-24 font-serif text-cream-100 text-sm tracking-[0.3em]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            森の雑貨やさん
          </motion.p>
          <motion.p
            className="font-serif text-gold-300 text-xl tracking-[0.5em]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.5 }}
          >
            MARL MARL
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
