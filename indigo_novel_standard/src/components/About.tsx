'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const clipProgress = useTransform(scrollYProgress, [0.1, 0.45], [0, 1]);
  const clipPath = useTransform(
    clipProgress,
    (v) => `inset(0 ${(1 - v) * 100}% 0 0)`
  );
  const imageOpacity = useTransform(scrollYProgress, [0.05, 0.3], [0, 1]);
  const imageScale = useTransform(scrollYProgress, [0.05, 0.35], [0.9, 1]);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative min-h-screen bg-[var(--background)] py-24 md:py-32"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 md:grid-cols-12 md:gap-16 md:px-12">
        {/* Asymmetrical text block - Mask reveal effect */}
        <div className="md:col-span-7 md:col-start-1">
          <motion.div
            className="overflow-hidden"
            style={{ clipPath }}
          >
            <p className="font-serif text-3xl leading-relaxed text-[var(--indigo-deep)] md:text-4xl lg:text-5xl">
              A select shop based in Kakeo, Toyama.
            </p>
            <p className="mt-6 font-serif text-3xl leading-relaxed text-[var(--indigo-deep)] md:text-4xl lg:text-5xl">
              Dealing with Men&apos;s, Women&apos;s, Kids&apos;, and Goods.
            </p>
          </motion.div>

          <motion.p
            className="mt-8 max-w-md text-[var(--concrete)]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            A lifestyle proposal shop not bound by categories. We curate pieces that embody
            relaxed Americana—family-friendly yet sophisticated. Every item speaks to our
            commitment to quality and timeless style.
          </motion.p>
        </div>

        {/* Asymmetrical image block */}
        <motion.div
          className="relative md:col-span-5 md:col-start-8"
          style={{
            opacity: imageOpacity,
            scale: imageScale,
          }}
        >
          <div className="aspect-[4/5] overflow-hidden rounded-lg bg-gradient-to-br from-[var(--concrete-light)]/20 to-[var(--wood)]/20">
            <div
              className="h-full w-full bg-cover bg-center opacity-80"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='800'%3E%3Crect fill='%231e3a5f' width='600' height='800'/%3E%3Crect fill='%232d5a8a' opacity='0.3' width='600' height='400'/%3E%3C/svg%3E")`,
              }}
            />
            <div className="absolute inset-0 bg-[var(--indigo-deep)]/10" />
          </div>
          <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full border-2 border-[var(--wood)]/50 bg-[var(--background)]" />
        </motion.div>
      </div>
    </section>
  );
}
