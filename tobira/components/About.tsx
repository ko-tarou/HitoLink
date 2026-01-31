"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 0.5], [60, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.25], [0.6, 1]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen py-24 md:py-32 px-6 overflow-hidden bg-[var(--color-cream)]"
    >
      {/* 背景テクスチャ・植物シルエット */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-0 right-0 w-full max-w-2xl h-[80%] opacity-[0.06]">
          <Image
            src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&q=60"
            alt=""
            width={800}
            height={1200}
            className="object-cover object-top w-full h-full"
          />
        </div>
      </motion.div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="font-[family-name:var(--font-serif)] text-3xl md:text-5xl text-[var(--color-forest)] tracking-wide mb-6">
            TOBIRAについて
          </h2>
          <motion.p
            style={{ opacity }}
            className="text-[var(--color-wood)] leading-relaxed text-base md:text-lg max-w-2xl mx-auto"
          >
            富山市にあるアンティークとリユースのセレクトショップ。
            <br className="hidden md:block" />
            植物とアンティークが共存する空間で、
            <br className="md:hidden" />
            人と文化をつなぐ。
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 md:mt-24 rounded-lg overflow-hidden shadow-xl"
        >
          <Image
            src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80"
            alt="植物とアンティークが調和した店内"
            width={1200}
            height={700}
            className="w-full h-auto object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
