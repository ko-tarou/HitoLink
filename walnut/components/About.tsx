'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

const aboutImage =
  'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=800&q=80';

export function About() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 0.3], [40, 0]);

  return (
    <section
      id="about"
      ref={ref}
      className="relative bg-beige-50/80 py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16 md:items-center">
          <motion.div
            className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl"
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ y }}
          >
            <Image
              src={aboutImage}
              alt="店内の様子"
              fill
              className="object-cover transition-transform duration-500 hover:scale-105 animate-float-slow"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>

          <div>
            <motion.p
              className="font-heading text-2xl text-sage-800 md:text-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              「大草原の小さな家」に想いを馳せて。
            </motion.p>
            <motion.p
              className="mt-2 font-heading text-lg text-terracotta-700"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              ジブリのような可愛い鉢植えとマスコットが迎える、温かな空間。
            </motion.p>
            <motion.p
              className="mt-6 leading-relaxed text-beige-800"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              富山県富山市にある、ゆっくりと時間が流れる小さなお店。素朴で優しい花やグリーン、ハーブを取り揃えています。
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
