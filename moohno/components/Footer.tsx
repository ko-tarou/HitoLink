"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-offwhite border-t border-darkgray/10 py-12">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="font-display text-xl text-darkgray">moohno</p>
          <nav className="flex gap-8 text-sm text-darkgray/80">
            <Link href="#about" className="hover:text-darkgray transition-colors" data-stalker-hover>
              コンセプト
            </Link>
            <Link href="#menu" className="hover:text-darkgray transition-colors" data-stalker-hover>
              メニュー
            </Link>
            <Link href="#shop" className="hover:text-darkgray transition-colors" data-stalker-hover>
              ショップ
            </Link>
            <Link href="#access" className="hover:text-darkgray transition-colors" data-stalker-hover>
              アクセス
            </Link>
          </nav>
        </motion.div>
        <motion.p
          className="mt-8 text-center text-darkgray/60 text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          © Cafe & Zakka moohno. All rights reserved.
        </motion.p>
      </div>
    </footer>
  );
}
