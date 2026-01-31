'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.4,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden"
    >
      {/* Background image with zoom-out effect */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 4, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1920&q=80"
            alt="Botanical atelier"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-charcoal/25" />
        </motion.div>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-4xl mx-auto px-6 sm:px-10 text-center"
      >
        <motion.p
          variants={item}
          className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-cream leading-relaxed mb-4"
        >
          心に触れる、季節のオーダーメイド。
        </motion.p>
        <motion.p
          variants={item}
          className="font-sans text-base sm:text-lg md:text-xl text-cream/95 font-light max-w-xl mx-auto"
        >
          富山にある小さなアトリエ。あなたの想いを花束にします。
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 rounded-full border-2 border-cream/60 flex justify-center pt-2"
        >
          <span className="w-1 h-2 bg-cream/80 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
