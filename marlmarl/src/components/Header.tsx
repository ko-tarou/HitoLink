"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { href: "#about", label: "About" },
  { href: "#products", label: "Products" },
  { href: "#info", label: "Info" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const headerBg = useTransform(
    scrollY,
    [0, 150],
    ["rgba(14, 31, 26, 0)", "rgba(249, 246, 239, 0.95)"]
  );
  const textColor = useTransform(
    scrollY,
    [0, 150],
    ["rgb(249, 246, 239)", "rgb(14, 31, 26)"]
  );

  return (
    <motion.header
      style={{ backgroundColor: headerBg }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-forest-900/5"
    >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.a
            href="#"
            style={{ color: textColor }}
            className="font-serif text-lg sm:text-xl tracking-wider"
          >
            森の雑貨やさん ＊MARL MARL＊
          </motion.a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                style={{ color: textColor }}
                className="hover:opacity-80 text-sm font-medium transition-opacity"
                whileHover={{ y: -2 }}
              >
                {item.label}
              </motion.a>
            ))}
          </nav>

          {/* Mobile menu button */}
          <motion.button
            className="md:hidden p-2"
            style={{ color: textColor }}
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>

        {/* Mobile menu */}
        <motion.div
          initial={false}
          animate={{
            height: isOpen ? "auto" : 0,
            opacity: isOpen ? 1 : 0,
          }}
          className="md:hidden overflow-hidden bg-cream-100/95 backdrop-blur-lg"
        >
          <nav className="px-6 py-6 flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-forest-800 hover:text-gold-600 font-medium py-2"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </motion.div>
      </motion.header>
  );
}
