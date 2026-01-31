"use client";

import { motion } from "framer-motion";
import { Instagram, Facebook } from "lucide-react";

const sns = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[var(--brown-dark)] py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between md:items-start">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <p className="font-display text-2xl font-medium text-[var(--cream)]">
              Ease Life
            </p>
            <p className="font-display-jp mt-1 text-sm text-[var(--cream)]/70">
              イーズライフ
            </p>
            <p className="mt-4 text-xs text-[var(--cream)]/60">
              古物商許可 第501150000943号
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex gap-6"
          >
            {sns.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="text-[var(--cream)]/70 transition-colors hover:text-[var(--brass-light)]"
              >
                <Icon className="h-6 w-6" />
              </a>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 border-t border-[var(--cream)]/10 pt-8 text-center"
        >
          <p className="text-sm text-[var(--cream)]/50">
            © {currentYear} Ease Life. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
