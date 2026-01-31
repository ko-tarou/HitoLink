"use client";

import { Instagram, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

const LINKS = [
  {
    label: "Online Shop",
    sub: "BASEにて季節のギフトを販売",
    href: "https://thebase.in/",
    icon: ShoppingBag,
  },
  {
    label: "Instagram",
    sub: "最新情報やスケジュール告知",
    href: "https://www.instagram.com/",
    icon: Instagram,
  },
] as const;

export default function Footer() {
  return (
    <footer className="border-t border-sand bg-cream-dark py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center gap-12 md:flex-row md:justify-between">
          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p
              className="font-display text-xl tracking-widest text-charcoal"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              TANE.FLOWER & LIFE LABORATORY
            </p>
            <p
              className="mt-1 font-serif text-sm text-warm-gray"
              style={{ fontFamily: "var(--font-shippori-mincho)" }}
            >
              タネ — 花と生活雑貨のセレクトショップ
            </p>
          </motion.div>

          <div className="flex gap-8">
            {LINKS.map(({ label, sub, href, icon: Icon }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-1 md:items-start"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                whileHover={{ y: -2 }}
              >
                <span className="flex items-center gap-2 text-charcoal">
                  <Icon className="h-4 w-4 transition-colors group-hover:text-muted-green" />
                  {label}
                </span>
                <span className="text-xs text-warm-gray">{sub}</span>
              </motion.a>
            ))}
          </div>
        </div>

        <motion.p
          className="mt-12 text-center text-xs text-warm-gray"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          © {new Date().getFullYear()} TANE.FLOWER & LIFE LABORATORY. All rights
          reserved.
        </motion.p>
      </div>
    </footer>
  );
}
