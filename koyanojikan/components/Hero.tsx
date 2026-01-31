"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const catchphrase = "楽しむ暮らし、丁寧に暮らす。";
const title = "小屋のじかん";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background image with parallax wrapper */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <Image
          src="https://images.unsplash.com/photo-1605276373954-0c4a0dac5b12?auto=format&fit=crop&w=1920&q=80"
          alt="小屋のじかん"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-earth-900/30" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 text-center">
        {/* Catchphrase - line by line reveal */}
        <motion.p
          className="mb-4 text-base tracking-[0.3em] text-white/95 sm:text-lg sm:tracking-[0.4em]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {catchphrase.split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2, delay: 0.5 + i * 0.05 }}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </motion.p>

        {/* Title - Serif, elegant */}
        <motion.h1
          className="font-serif text-5xl font-light tracking-widest text-white sm:text-7xl md:text-8xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
        >
          {title}
        </motion.h1>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          <motion.a
            href="#concept"
            className="flex flex-col items-center gap-2 text-white/80 transition hover:text-white"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-xs tracking-widest">SCROLL</span>
            <ChevronDown className="h-8 w-8" strokeWidth={1.5} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
