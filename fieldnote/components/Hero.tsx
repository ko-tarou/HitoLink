'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80';

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.3]);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Parallax background */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{ y }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <Image
          src={HERO_IMAGE}
          alt="立山連峰の雄大な山々"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-charcoal-900/50 via-charcoal-900/30 to-charcoal-900/70"
          aria-hidden
        />
      </motion.div>

      <motion.div
        className="relative flex h-full flex-col items-center justify-center px-6 text-center"
        style={{ opacity }}
      >
        <motion.p
          className="font-display mb-4 text-sm tracking-[0.3em] text-sand-200 md:text-base"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          FIELD NOTE TATEYAMA
        </motion.p>
        <motion.h1
          className="font-display max-w-4xl text-3xl font-medium leading-tight text-white drop-shadow-lg md:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
        >
          日常で自然を感じる、
          <br />
          立山のライフスタイル雑貨店
        </motion.h1>
        <motion.p
          className="mt-8 max-w-xl text-sm text-sand-200/90 md:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          モンベルヴィレッジ立山で、山と暮らしをつなぐアイテムをお届けします
        </motion.p>
      </motion.div>

      {/* Scroll prompt */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1 text-sand-200"
        >
          <span className="text-xs tracking-widest">SCROLL</span>
          <ChevronDown className="h-6 w-6" strokeWidth={2} />
        </motion.div>
      </motion.div>
    </section>
  );
}
