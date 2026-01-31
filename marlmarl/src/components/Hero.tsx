"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Leaf, Sparkles } from "lucide-react";

export default function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 600], [0, 150]);
  const y2 = useTransform(scrollY, [0, 600], [0, 80]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 400], [1, 0.95]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Layered parallax backgrounds */}
      <motion.div
        style={{ y: y1 }}
        className="absolute inset-0 bg-gradient-to-b from-forest-950 via-forest-900/95 to-forest-950"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,_rgba(45,103,84,0.4)_0%,_transparent_50%)]"
      />
      <motion.div
        style={{ y: y1 }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,_rgba(29,56,48,0.6)_0%,_transparent_50%)]"
      />

      {/* Organic blob shapes */}
      <motion.div
        style={{ y: y2 }}
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-forest-800/30 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        style={{ y: y1 }}
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-forest-700/20 blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating particles - leaves */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-forest-500/20"
          style={{
            left: `${15 + i * 10}%`,
            top: `${20 + (i % 4) * 20}%`,
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 10, -5, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
        >
          <Leaf
            className="w-6 h-6 sm:w-8 sm:h-8"
            style={{ transform: `rotate(${i * 45}deg)` }}
          />
        </motion.div>
      ))}

      {/* Sparkle particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        >
          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-gold-400/60" />
        </motion.div>
      ))}

      {/* Content */}
      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 text-center px-6 max-w-4xl"
      >
        <motion.p
          className="text-cream-200/90 text-sm sm:text-base tracking-[0.4em] mb-4 font-sans"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          富山の小さなお家で
        </motion.p>

        <motion.h1
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-cream-100 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          森の雑貨やさん
          <span className="block text-gold-300 text-3xl sm:text-4xl md:text-5xl mt-2 tracking-[0.3em]">
            ＊MARL MARL＊
          </span>
        </motion.h1>

        <motion.p
          className="mt-8 text-cream-300/90 text-base sm:text-lg md:text-xl font-sans max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          富山の小さなお家で出会う、心ときめく雑貨たち
        </motion.p>

        <motion.div
          className="mt-16 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <motion.div
            className="w-8 h-12 rounded-full border-2 border-cream-300/50 flex justify-center pt-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div className="w-1 h-2 rounded-full bg-cream-300/70" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Paper texture overlay */}
      <div className="absolute inset-0 paper-overlay pointer-events-none" />
    </section>
  );
}
