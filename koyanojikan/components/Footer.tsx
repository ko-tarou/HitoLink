"use client";

import { motion } from "framer-motion";
import { Instagram, ArrowUp } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-earth-800 py-12 text-earth-200 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
          <p className="font-serif text-lg text-earth-100 sm:text-xl">
            小屋のじかん
          </p>
          <div className="flex items-center gap-6">
            <motion.a
              href="https://www.instagram.com/koyanojikan"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition hover:text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Instagram className="h-5 w-5" />
              <span className="text-sm">@koyanojikan</span>
            </motion.a>
            <motion.a
              href="#"
              className="flex items-center gap-2 transition hover:text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <ArrowUp className="h-5 w-5" />
              <span className="text-sm">トップへ戻る</span>
            </motion.a>
          </div>
        </div>
        <p className="mt-8 text-center text-sm text-earth-400">
          © {currentYear} 小屋のじかん. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
