"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.05]);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{ y, scale }}
      >
        <Image
          src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1920&q=80"
          alt="花と植物"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-charcoal/20" />
      </motion.div>

      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        style={{ opacity }}
      >
        <motion.p
          className="font-serif text-sm tracking-[0.4em] text-white/90 md:text-base"
          style={{ fontFamily: "var(--font-shippori-mincho)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          花と生活雑貨のセレクトショップ
        </motion.p>
        <motion.h1
          className="mt-4 font-display text-4xl tracking-[0.2em] text-white md:text-6xl md:tracking-[0.35em] lg:text-7xl"
          style={{ fontFamily: "var(--font-playfair)" }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          TANE.FLOWER
          <br />
          & LIFE LABORATORY
        </motion.h1>
        <motion.span
          className="mt-3 font-serif text-lg tracking-widest text-white/90 md:text-xl"
          style={{ fontFamily: "var(--font-shippori-mincho)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          タネ
        </motion.span>
        <motion.p
          className="mt-8 max-w-md font-sans text-sm leading-relaxed text-white/85 md:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          暮らしの中に気軽に花を置くことで、幸せな気持ちになってほしい
          <br />
          <span className="text-white/70">
            主張しすぎず、気持ちに寄り添える花
          </span>
        </motion.p>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <motion.span
          className="block h-10 w-px bg-white/60"
          animate={{ scaleY: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
