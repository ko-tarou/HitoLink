"use client";

import { motion } from "framer-motion";

const keywords = ["1800年代〜1900年代", "アメリカンアンティーク", "修繕", "日常使い"];

export function Concept() {
  return (
    <section
      id="concept"
      className="relative py-24 md:py-32 px-6 bg-cream"
    >
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="font-serif text-wood-dark text-3xl md:text-4xl lg:text-5xl font-medium mb-6"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          コンセプト
        </motion.h2>
        <motion.p
          className="text-wood-light text-lg md:text-xl leading-relaxed max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          1800年代後半から1900年代半ばのアメリカを中心とした、質の高いヴィンテージ品の修繕と販売を行っています。一点一点を「世界にひとつ」として扱い、日々の暮らしで使えるよう修繕してご提供しています。
        </motion.p>
        <motion.div
          className="mt-10 flex flex-wrap gap-3"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {keywords.map((keyword, i) => (
            <motion.span
              key={keyword}
              className="px-4 py-2 border border-wood/30 text-wood-dark text-sm tracking-wide bg-cream-dark/50"
              style={{ borderColor: "rgba(61, 41, 20, 0.25)" }}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.25 + i * 0.06 }}
            >
              {keyword}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
