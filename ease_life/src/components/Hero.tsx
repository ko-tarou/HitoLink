"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const heroImage =
  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1920&q=80";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden"
    >
      {/* Background image with parallax scale */}
      <motion.div style={{ scale }} className="absolute inset-0">
        <Image
          src={heroImage}
          alt="Ease Life - Antique furniture and vintage interior"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-[#2c2416]/60"
          aria-hidden
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-2 text-sm tracking-[0.4em] text-[var(--brass-light)] font-display"
        >
          TOYAMA, JAPAN
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-5xl font-medium tracking-tight text-[var(--cream)] sm:text-7xl md:text-8xl"
        >
          Ease Life
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="font-display-jp mt-4 text-xl text-[var(--cream-dark)] sm:text-2xl"
        >
          イーズライフ
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 max-w-md text-sm tracking-widest text-[var(--cream)]/90 font-display"
        >
          Timeless Value, Crafted for Life.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-16 flex flex-col gap-4 text-sm text-[var(--cream)]/80"
        >
          <span>アンティーク・ヴィンテージ雑貨専門店</span>
          <span className="h-px w-12 self-center bg-[var(--brass)]/60" />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="h-10 w-px bg-[var(--cream)]/50"
        />
      </motion.div>
    </section>
  );
}
