"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#collection", label: "Collection" },
  { href: "#highlights", label: "Highlights" },
  { href: "#access", label: "Access" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-colors duration-300 ${
          scrolled ? "bg-[var(--color-forest-deep)]/95 text-[var(--color-offwhite)]" : "mix-blend-difference text-[var(--color-offwhite)]"
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <a
            href="#"
            className="font-[family-name:var(--font-serif)] text-2xl md:text-3xl font-medium tracking-widest"
          >
            TOBIRA
          </a>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 hover:opacity-80 transition-opacity"
            aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[var(--color-forest-deep)] flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: i * 0.1 }}
                className="font-[family-name:var(--font-serif)] text-2xl md:text-4xl text-[var(--color-offwhite)] hover:text-[var(--color-brass-light)] transition-colors tracking-wider"
              >
                {link.label}
              </motion.a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
