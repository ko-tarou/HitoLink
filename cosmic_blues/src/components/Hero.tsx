"use client";

import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import ParticleBackground from "./ParticleBackground";
import GlitchText from "./GlitchText";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050510]">
      <ParticleBackground />

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
        {/* Store Name - Neon Sign */}
        <motion.h1
          className="font-[family-name:var(--font-bebas)] text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] tracking-[0.3em] mb-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{
            color: "#00f3ff",
            textShadow: `
              0 0 5px #00f3ff,
              0 0 10px #00f3ff,
              0 0 20px #00f3ff,
              0 0 40px #00f3ff,
              0 0 80px #00f3ff
            `,
          }}
        >
          COSMIC BLUES
        </motion.h1>

        {/* Catchphrase */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <p className="font-[family-name:var(--font-orbitron)] text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white/90 mb-2">
            富山の夜、
          </p>
          <p className="font-[family-name:var(--font-orbitron)] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
            <GlitchText
              text="アメリカへトリップする。"
              className="text-[#00f3ff]"
            />
          </p>
        </motion.div>

        {/* Open Hours */}
        <motion.div
          className="inline-flex items-center gap-3 px-8 py-4 rounded-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          style={{
            background: "rgba(0, 243, 255, 0.05)",
            border: "2px solid rgba(0, 243, 255, 0.3)",
            boxShadow: "0 0 30px rgba(0, 243, 255, 0.2)",
          }}
        >
          <Clock className="w-6 h-6 text-[#00f3ff]" />
          <span className="font-[family-name:var(--font-orbitron)] text-xl sm:text-2xl font-semibold text-[#00f3ff] tracking-widest">
            OPEN 13:00 - 25:00
          </span>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-[#00f3ff]/50 flex justify-center pt-2">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-[#00f3ff]"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
