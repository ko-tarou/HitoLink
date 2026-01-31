"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 0.3], [80, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);

  return (
    <section id="about" className="relative py-24 md:py-32" ref={ref}>
      <div className="mx-auto max-w-6xl px-6">
        <motion.div style={{ opacity }} className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <motion.div
            className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-xl"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80"
              alt="White interior, designer chairs"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
          <motion.div
            style={{ y }}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="font-display text-accent text-sm tracking-widest uppercase mb-4">
              Concept
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-medium text-darkgray mb-6">
              白に包まれた、<br className="md:hidden" /> 癒やしの空間
            </h2>
            <p className="text-darkgray/90 leading-relaxed mb-6">
              2011年のオープン以来、多くのお客様に愛されてまいりました。
              10周年を迎えたmoohnoは、白を基調とした明るい内装と、
              デザイナーズチェアが並ぶ、どこか美術館のような空間です。
            </p>
            <p className="text-darkgray/80 leading-relaxed">
              窓からは庭のアヒルと金魚が顔をのぞかせ、ひとときの癒やしを届けてくれます。
              カフェと雑貨がひとつになった、あたたかい時間をお過ごしください。
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
