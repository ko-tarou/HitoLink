"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { TextReveal } from "./TextReveal";

const conceptImage =
  "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=1200&q=80";

const highlights = [
  "アメリカ直輸入の家具・雑貨を中心に、丁寧に選び抜いた品々",
  "店内で修復・チェック済み。安心してお求めいただける品質",
  "お求めやすい価格で、暮らしに寄り添うヴィンテージを",
];

export function Concept() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 0.5, 1], [60, -40, 60]);
  const textOpacity = useTransform(scrollYProgress, [0.15, 0.35], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.15, 0.35], [40, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[var(--cream)] py-24 md:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
          {/* Image - parallax */}
          <motion.div
            style={{ y: imageY }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative aspect-[4/5] overflow-hidden lg:aspect-[3/4]">
              <Image
                src={conceptImage}
                alt="Vintage furniture restoration and curation"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 border-4 border-[var(--brown-dark)]/10" />
            </div>
          </motion.div>

          {/* Text - reveal on scroll */}
          <motion.div
            style={{ opacity: textOpacity, y: textY }}
            className="order-1 lg:order-2 lg:pl-8"
          >
            <span className="font-display text-sm tracking-[0.3em] text-[var(--brass)]">
              OUR PHILOSOPHY
            </span>
            <h2 className="font-display-jp mt-4 text-3xl font-semibold text-[var(--brown-dark)] md:text-4xl">
              <TextReveal text="こだわり" delay={0.1} />
            </h2>
            <p className="mt-6 leading-relaxed text-[var(--brown)]/90">
              富山県富山市にあるアンティーク・ヴィンテージ雑貨専門店です。
              アメリカ輸入家具、雑貨、古着を中心に、丁寧に修復された商品をお届けしています。
              倉庫には豊富な在庫があり、お探しの一品が見つかるかもしれません。
            </p>
            <ul className="mt-10 space-y-4">
              {highlights.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex items-start gap-3 font-display-jp text-[var(--brown)]"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brass)]" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
