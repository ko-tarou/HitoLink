"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navItems = [
  { href: "#about", label: "コンセプト" },
  { href: "#menu", label: "メニュー" },
  { href: "#shop", label: "ショップ" },
  { href: "#access", label: "アクセス" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 2.2, duration: 0.5 }}
      >
        <motion.div
          className={`mx-auto flex max-w-6xl items-center justify-between px-6 py-4 transition-all duration-300 ${
            scrolled ? "bg-offwhite/95 backdrop-blur-md shadow-sm" : "bg-transparent"
          }`}
          animate={{ backgroundColor: scrolled ? "rgba(252,252,252,0.95)" : "transparent" }}
        >
          <Link
            href="#"
            className={`font-display text-xl transition-colors ${
              scrolled ? "text-darkgray" : "text-white drop-shadow-md"
            }`}
          >
            moohno
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm transition-colors">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={
                  scrolled
                    ? "text-darkgray/80 hover:text-darkgray"
                    : "text-white/90 hover:text-white drop-shadow"
                }
                data-stalker-hover
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <button
            type="button"
            className={`md:hidden p-2 transition-colors ${
              scrolled ? "text-darkgray" : "text-white"
            }`}
            onClick={() => setMobileOpen(true)}
            aria-label="メニューを開く"
          >
            <Menu className="h-6 w-6" />
          </button>
        </motion.div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-offwhite md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex justify-end p-6">
              <button
                type="button"
                className="p-2 text-darkgray"
                onClick={() => setMobileOpen(false)}
                aria-label="メニューを閉じる"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex flex-col items-center gap-6 pt-12">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="font-display text-2xl text-darkgray"
                  onClick={() => setMobileOpen(false)}
                  data-stalker-hover
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
