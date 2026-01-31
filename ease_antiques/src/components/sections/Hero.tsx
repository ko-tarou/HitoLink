"use client";

import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background: gradient + subtle texture */}
      <div
        className="absolute inset-0 bg-wood-dark"
        style={{
          backgroundImage: `
            linear-gradient(135deg, rgba(61,41,20,0.95) 0%, rgba(42,26,10,0.98) 50%, rgba(58,45,35,0.95) 100%),
            url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
          `,
        }}
      />
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-wood-dark/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      />
      <div className="relative z-10 px-6 text-center max-w-4xl mx-auto">
        <motion.p
          className="font-serif text-brass-muted/90 text-sm md:text-base tracking-[0.3em] uppercase mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          EASE ANTIQUES & EASE LIFE
        </motion.p>
        <motion.h1
          className="font-serif text-cream text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-tight tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9 }}
        >
          富山で出会う
          <br />
          <span className="text-brass/90">アメリカン・ヴィンテージ</span>
        </motion.h1>
        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <a
            href="#concept"
            className="inline-flex items-center gap-2 text-cream/80 hover:text-brass transition-colors text-sm tracking-widest"
          >
            コンセプトへ
            <svg
              className="w-4 h-4 animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
