"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ExternalLink, Facebook, Instagram } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  }),
};

const item = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream py-20 md:py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={container}
          className="space-y-10"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <motion.h2
              variants={item}
              className="text-2xl font-medium tracking-tight"
            >
              花メイト
            </motion.h2>
            <motion.div
              variants={item}
              className="flex items-center gap-4"
            >
              <Link
                href="https://hanamate.jp/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-cream-soft hover:text-cream transition-colors text-sm"
              >
                <span>Official Site</span>
                <ExternalLink className="w-4 h-4" strokeWidth={1.5} />
              </Link>
              <Link
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full border border-cream/20 hover:border-cream/50 hover:bg-cream/5 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" strokeWidth={1.5} />
              </Link>
              <Link
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full border border-cream/20 hover:border-cream/50 hover:bg-cream/5 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" strokeWidth={1.5} />
              </Link>
            </motion.div>
          </div>

          <motion.div
            variants={item}
            className="pt-8 border-t border-cream/10 space-y-4 text-sm text-cream-soft"
          >
            <p>
              <span className="text-cream/80">加盟：</span>
              富山県花商協同組合、フジテレビフラワーネット
            </p>
            <p>
              <span className="text-cream/80">親会社：</span>
              富山テレビ放送株式会社
            </p>
          </motion.div>

          <motion.p
            variants={item}
            className="text-xs text-cream-soft/60"
          >
            © {new Date().getFullYear()} Hana Mate / Toyama Television Enterprise Inc. All rights reserved.
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
}
