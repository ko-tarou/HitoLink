'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

export default function Concept() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 0.3], [80, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0.4, 1]);

  const lines = [
    'nicoは既製品を置きません。すべてがオーダーメイド。',
    '季節の花、柔らかい色合い、アンティークな空気感。',
    '店主は10年の経験を経て、2011年にこのアトリエを開きました。',
  ];

  return (
    <section
      id="concept"
      ref={ref}
      className="relative py-24 sm:py-32 lg:py-40 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <motion.div
            style={{ y, opacity }}
            className="lg:col-span-5 order-2 lg:order-1"
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-sage-500 font-sans text-sm tracking-[0.2em] uppercase"
            >
              Our Story
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal mt-2 mb-10"
            >
              Philosophy
            </motion.h2>
            <div className="space-y-6">
              {lines.map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                  className="font-sans text-charcoal-light text-base sm:text-lg leading-relaxed"
                >
                  {line}
                </motion.p>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 lg:col-start-7 order-1 lg:order-2 relative"
          >
            <div className="aspect-[4/5] relative rounded-sm overflow-hidden shadow-xl min-h-[320px]">
              <Image
                src="https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=800&q=80"
                alt="Antique flowers and dried botanicals"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 to-transparent pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
