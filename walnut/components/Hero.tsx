'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

const heroImage =
  'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1920&q=80';

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.3]);
  const titleY = useTransform(scrollYProgress, [0, 0.4], [0, 40]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <motion.div
        className="absolute inset-0"
        style={{ scale, y }}
      >
        <Image
          src={heroImage}
          alt="Walnut Grove flower shop"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-beige-900/30 via-beige-900/20 to-beige-900/60"
          aria-hidden
        />
      </motion.div>

      <motion.div
        className="relative z-10 mx-auto max-w-4xl px-6 text-center"
        style={{ opacity, y: titleY }}
      >
        <motion.h1
          className="font-heading text-4xl font-medium tracking-wide text-cream drop-shadow-lg md:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          花屋ウォルナット・グローブ
        </motion.h1>
        <motion.p
          className="mt-4 font-body text-lg text-cream/95 drop-shadow md:text-xl lg:text-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          素朴で優しい、癒しの時間。1985年から続く街の花屋さん。
        </motion.p>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span className="block h-8 w-px animate-pulse bg-cream/80" />
      </motion.div>
    </section>
  );
}
