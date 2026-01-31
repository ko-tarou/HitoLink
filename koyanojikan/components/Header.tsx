"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#" className="font-serif text-xl text-earth-800 sm:text-2xl">
          小屋のじかん
        </a>
        <div className="flex items-center gap-6">
          <a
            href="#concept"
            className="hidden text-sm text-earth-700 transition hover:text-forest-600 sm:block"
          >
            コンセプト
          </a>
          <a
            href="#products"
            className="hidden text-sm text-earth-700 transition hover:text-forest-600 sm:block"
          >
            商品
          </a>
          <a
            href="#shop"
            className="hidden text-sm text-earth-700 transition hover:text-forest-600 sm:block"
          >
            店舗情報
          </a>
          <a
            href="https://www.instagram.com/koyanojikan"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-forest-600 px-4 py-2 text-sm text-white transition hover:bg-forest-700"
          >
            Instagram
          </a>
        </div>
      </nav>
    </motion.header>
  );
}
