"use client";

import { motion } from "framer-motion";
import { Instagram, Twitter } from "lucide-react";

const HASHTAGS = [
  "#アメリカン雑貨屋",
  "#富山の雑貨屋",
  "#コズミックブルース",
  "✦",
];

const Footer = () => {
  return (
    <footer className="relative py-16 md:py-24 overflow-hidden bg-[#050510] border-t border-[#00f3ff]/10">
      {/* Social Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-8"
        >
          <p className="font-[family-name:var(--font-orbitron)] text-sm text-white/60 tracking-widest">
            FOLLOW US
          </p>
          <div className="flex gap-8">
            <motion.a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-2xl md:text-3xl font-[family-name:var(--font-bebas)] tracking-wider text-white hover:text-[#00f3ff] transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Instagram className="w-10 h-10" />
              Instagram
            </motion.a>
            <motion.a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-2xl md:text-3xl font-[family-name:var(--font-bebas)] tracking-wider text-white hover:text-[#00f3ff] transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Twitter className="w-10 h-10" />
              X (Twitter)
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Marquee Hashtags */}
      <div className="relative overflow-hidden py-6 border-y border-[#00f3ff]/10">
        <motion.div
          className="flex gap-12 whitespace-nowrap w-max"
          animate={{ x: "-50%" }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 25,
              ease: "linear",
            },
          }}
        >
          {[...Array(2)].map((_, setIndex) => (
            <span key={setIndex} className="flex gap-12">
              {HASHTAGS.map((tag, i) => (
                <span
                  key={`${setIndex}-${i}`}
                  className="font-[family-name:var(--font-orbitron)] text-lg md:text-xl text-[#00f3ff]/80"
                >
                  {tag}
                </span>
              ))}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Copyright */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mt-12"
      >
        <p className="font-[family-name:var(--font-bebas)] text-4xl md:text-5xl text-[#00f3ff]/30 tracking-[0.2em] mb-4">
          COSMIC BLUES
        </p>
        <p className="text-white/40 text-sm" suppressHydrationWarning>
          © {new Date().getFullYear()} COSMIC BLUES. All rights reserved.
        </p>
      </motion.div>
    </footer>
  );
};

export default Footer;
