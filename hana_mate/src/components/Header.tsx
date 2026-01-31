"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

const nav = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const { scrollY } = useScroll();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const bg = useTransform(
    scrollY,
    [0, 120],
    ["rgba(253, 251, 247, 0)", "rgba(253, 251, 247, 0.92)"]
  );
  const border = useTransform(
    scrollY,
    [0, 120],
    ["rgba(255,255,255,0)", "rgba(212, 223, 196, 0.5)"]
  );

  if (!mounted) return null;

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 px-6 py-5 md:py-6"
      style={{ backgroundColor: bg, borderBottomWidth: 1, borderBottomStyle: "solid", borderColor: border }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="#" className="text-charcoal font-medium text-lg tracking-tight hover:opacity-80 transition-opacity">
          花メイト
        </Link>
        <nav className="flex items-center gap-8">
          {nav.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm font-medium text-charcoal-soft hover:text-charcoal transition-colors tracking-wide"
            >
              {label}
            </Link>
          ))}
          <Link
            href="https://hanamate.jp/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-sage-600 hover:text-sage-700 transition-colors"
          >
            Shop
          </Link>
        </nav>
      </div>
    </motion.header>
  );
}
