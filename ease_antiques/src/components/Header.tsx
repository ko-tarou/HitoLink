"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#concept", label: "コンセプト" },
  { href: "#stores", label: "店舗" },
  { href: "#products", label: "商品" },
  { href: "#access", label: "アクセス" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const headerBg = useTransform(
    scrollY,
    [0, 180],
    ["rgba(42, 26, 10, 0)", "rgba(42, 26, 10, 0.97)"]
  );

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between"
        style={{ backgroundColor: headerBg }}
      >
        <a href="#" className="font-serif text-cream text-lg tracking-wide">
          EASE ANTIQUES
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-cream/85 hover:text-brass text-sm tracking-widest uppercase transition-colors"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          className="md:hidden text-cream p-2"
          onClick={() => setOpen(!open)}
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </motion.header>

      {/* Mobile menu */}
      <motion.div
        className="fixed inset-0 z-40 md:hidden bg-wood-dark/98 flex flex-col items-center justify-center gap-8"
        initial={false}
        animate={{ opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none" }}
        transition={{ duration: 0.3 }}
      >
        {links.map((link, i) => (
          <motion.a
            key={link.href}
            href={link.href}
            className="font-serif text-cream text-2xl hover:text-brass transition-colors"
            onClick={() => setOpen(false)}
            initial={{ opacity: 0, y: 10 }}
            animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ delay: open ? i * 0.08 : 0 }}
          >
            {link.label}
          </motion.a>
        ))}
      </motion.div>
    </>
  );
}
