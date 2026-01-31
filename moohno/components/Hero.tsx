"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background image with parallax */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="absolute inset-0 bg-darkgray/20 z-10" />
        <Image
          src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1920&q=80"
          alt="Cafe interior"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-20 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <motion.p
          className="font-display text-offwhite/90 text-sm md:text-base tracking-[0.3em] uppercase mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          Cafe & Zakka
        </motion.p>
        <motion.h1
          className="font-display text-4xl md:text-6xl lg:text-7xl font-medium text-white drop-shadow-lg max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          moohno
        </motion.h1>
        <motion.p
          className="mt-6 max-w-xl text-lg md:text-xl text-white/95 font-light leading-relaxed drop-shadow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
        >
          白に包まれた、癒やしの時間。
          <br />
          アヒルと雑貨と、甘い午後。
        </motion.p>
        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <a
            href="#about"
            className="inline-flex items-center gap-2 rounded-full border-2 border-white/80 bg-white/10 px-6 py-3 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/25 hover:border-white data-[stalker-hover]"
            data-stalker-hover
          >
            <span className="text-sm tracking-wide">コンセプトを見る</span>
            <motion.span
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ↓
            </motion.span>
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className="h-10 w-6 rounded-full border-2 border-white/60 flex justify-center pt-2"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="block h-2 w-2 rounded-full bg-white/80" />
        </motion.div>
      </motion.div>
    </section>
  );
}
