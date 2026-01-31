"use client";

import { motion } from "framer-motion";
import { Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative py-16 md:py-20 px-6 bg-wood-dark text-cream">
      <div className="max-w-4xl mx-auto text-center">
        <motion.a
          href="https://www.instagram.com/ease_antiques/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-cream/90 hover:text-brass transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Instagram className="w-5 h-5" />
          <span>@ease_antiques</span>
        </motion.a>
        <motion.p
          className="mt-6 font-serif text-cream/80 text-sm md:text-base italic"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          モノとの出会いは、一生に一度。
        </motion.p>
        <p className="mt-4 text-cream/50 text-xs">
          © EASE ANTIQUES & EASE LIFE · 富山
        </p>
      </div>
    </footer>
  );
}
