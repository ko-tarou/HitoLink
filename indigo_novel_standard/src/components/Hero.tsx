'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--indigo-darker)]"
    >
      {/* Parallax Background - Denim/Road texture feel */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(21,42,71,0.97) 0%, rgba(15,31,53,0.95) 50%, rgba(30,58,95,0.9) 100%),
            url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
          scale: bgScale,
        }}
      />
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-[#152a47]/30 to-[#0f1f35]"
        style={{ opacity: bgOpacity }}
      />

      {/* Denim weave - subtle diagonal stripes */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 3px,
            rgba(255,255,255,0.08) 3px,
            rgba(255,255,255,0.08) 6px
          )`,
        }}
      />

      <motion.div
        className="relative z-10 flex flex-col items-center px-6 text-center"
        style={{ y }}
      >
        {/* Logo - Cinematic blur fade-in */}
        <motion.h1
          className="font-serif text-3xl font-light tracking-[0.3em] text-white md:text-4xl lg:text-5xl xl:text-6xl"
          initial={{ opacity: 0, filter: 'blur(20px)' }}
          animate={{
            opacity: 1,
            filter: 'blur(0px)',
          }}
          transition={{
            duration: 1.4,
            delay: 0.3,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          INDIGO Novel STANDARD
        </motion.h1>

        {/* Tagline - Staggered text reveal */}
        <motion.p
          className="mt-8 max-w-2xl font-serif text-lg font-light italic tracking-wide text-white/90 md:text-xl lg:text-2xl"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.08,
                delayChildren: 1.2,
              },
            },
          }}
        >
          {'New value become the STANDARD'.split(' ').map((word, i) => (
            <motion.span
              key={i}
              className="inline-block pr-[0.25em]"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
            >
              {word}
            </motion.span>
          ))}
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
        >
          <motion.div
            className="h-12 w-px bg-white/40"
            animate={{ scaleY: [0.5, 1, 0.5] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
