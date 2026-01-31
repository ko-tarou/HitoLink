"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80"
          alt="植物に覆われたアンティーク空間"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-[var(--color-forest-deep)]/60 via-[var(--color-forest-deep)]/40 to-[var(--color-forest-deep)]/80"
          aria-hidden
        />
      </div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="font-[family-name:var(--font-serif)] text-[var(--color-brass-light)] tracking-[0.3em] text-sm md:text-base mb-4"
        >
          ANTIQUE & REUSE SELECT SHOP
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="font-[family-name:var(--font-serif)] text-4xl md:text-6xl lg:text-7xl text-[var(--color-offwhite)] font-medium tracking-wide max-w-4xl leading-tight"
        >
          時を超え、物語をつなぐ場所
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-6 text-[var(--color-cream)]/90 text-sm md:text-base tracking-widest"
        >
          TOBIRA - トベラ -
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.a
          href="#about"
          aria-label="下へスクロール"
          className="flex flex-col items-center gap-2 text-[var(--color-offwhite)]/80 hover:text-[var(--color-brass-light)] transition-colors"
          whileHover={{ y: 4 }}
        >
          <span className="text-xs tracking-widest">SCROLL</span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ChevronDown size={24} strokeWidth={1.5} />
          </motion.span>
        </motion.a>
      </motion.div>
    </section>
  );
}
