"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { images } from "@/lib/images";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Full-bleed flower background with Ken Burns (slow zoom) */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.05 }}
        animate={{ scale: 1.12 }}
        transition={{ duration: 14, ease: "easeInOut" }}
      >
        <Image
          src={images.hero}
          alt=""
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </motion.div>

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 overlay-hero" />

      {/* Content */}
      <div className="relative z-10 px-6 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-8 md:space-y-10"
        >
          <motion.h1
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-medium tracking-tighter text-cream text-display drop-shadow-[0_2px_20px_rgba(0,0,0,0.2)]"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            花メイト
          </motion.h1>
          <motion.p
            className="text-xl sm:text-2xl md:text-3xl text-cream/95 font-light tracking-wide max-w-xl mx-auto drop-shadow-[0_1px_10px_rgba(0,0,0,0.15)]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            花と緑で、心をつなぐ。
          </motion.p>
          <motion.p
            className="text-sm sm:text-base text-cream/70 font-light tracking-widest uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            Hana Mate — Toyama
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center pt-6"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
          >
            <Link href="https://hanamate.jp/" target="_blank" rel="noopener noreferrer" className="group">
              <motion.span
                className="inline-block px-10 py-4 rounded-full bg-cream text-charcoal font-medium text-sm tracking-widest uppercase"
                whileHover={{ scale: 1.04, boxShadow: "0 24px 48px -12px rgba(0,0,0,0.25)" }}
                whileTap={{ scale: 0.98 }}
              >
                Online Shop
              </motion.span>
            </Link>
            <Link href="#contact" className="group">
              <motion.span
                className="inline-block px-10 py-4 rounded-full border-2 border-cream/80 text-cream font-medium text-sm tracking-widest uppercase"
                whileHover={{ scale: 1.04, backgroundColor: "rgba(255,255,255,0.12)" }}
                whileTap={{ scale: 0.98 }}
              >
                Contact
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-cream/50 flex justify-center pt-2"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cream/70" />
        </motion.div>
      </motion.div>
    </section>
  );
}
