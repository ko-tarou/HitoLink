'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView, useSpring, useMotionValueEvent } from 'framer-motion';

function AnimatedNumber({
  value,
  suffix = '',
  inView,
}: {
  value: number;
  suffix?: string;
  inView: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useSpring(0, { stiffness: 40, damping: 30 });

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, value, motionValue]);

  useMotionValueEvent(motionValue, 'change', (v) => {
    if (ref.current) ref.current.textContent = Math.round(v) + suffix;
  });

  return <span ref={ref}>0{suffix}</span>;
}

export function Stats() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const stats = [
    { value: 4000, suffix: '坪', label: '敷地面積' },
    { value: 120, suffix: '台', label: '駐車場' },
    { value: 365, suffix: '日', label: '年中無休' },
  ];

  return (
    <section id="stats" ref={ref} className="bg-primary py-24 text-base md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="font-serif text-2xl font-medium text-base/90 md:text-3xl"
        >
          数字で見る北山ナーセリー
        </motion.h2>
        <div className="mt-16 grid gap-12 sm:grid-cols-3">
          {stats.map(({ value, suffix, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15 }}
              className="text-center"
            >
              <div className="font-serif text-5xl font-medium text-white md:text-6xl lg:text-7xl">
                <AnimatedNumber value={value} suffix={suffix} inView={isInView} />
              </div>
              <p className="mt-2 font-sans text-base text-base/80">{label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
