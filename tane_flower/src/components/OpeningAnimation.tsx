"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Props = {
  onComplete: () => void;
  isExiting?: boolean;
};

const SHOP_NAME = "TANE.FLOWER&LIFE LABORATORY";
const SUBTITLE = "タネ";

export default function OpeningAnimation({ onComplete, isExiting = false }: Props) {
  const [hasExited, setHasExited] = useState(false);

  useEffect(() => {
    if (hasExited) onComplete();
  }, [hasExited, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-cream"
      initial={{ opacity: 1 }}
      animate={{
        opacity: isExiting ? 0 : 1,
      }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      onAnimationComplete={() => {
        if (isExiting) setHasExited(true);
      }}
    >
        <div className="overflow-hidden">
          <motion.h1
            className="font-display text-2xl tracking-[0.3em] text-charcoal md:text-4xl md:tracking-[0.5em]"
            style={{ fontFamily: "var(--font-playfair)" }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{
              duration: 1.2,
              delay: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {SHOP_NAME}
          </motion.h1>
        </div>
        <div className="mt-4 overflow-hidden">
          <motion.span
            className="font-serif text-lg tracking-widest text-muted-green md:text-xl"
            style={{ fontFamily: "var(--font-shippori-mincho)" }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{
              duration: 0.9,
              delay: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {SUBTITLE}
          </motion.span>
        </div>
        <motion.div
          className="absolute bottom-12 left-1/2 h-px w-24 -translate-x-1/2 bg-charcoal/30"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            duration: 1,
            delay: 1.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ transformOrigin: "center" }}
        />
      </motion.div>
  );
}
