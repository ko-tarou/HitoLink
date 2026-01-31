"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { images } from "@/lib/images";

const container = {
  hidden: { opacity: 0 },
  visible: () => ({
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.2 },
  }),
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Gallery() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 0.15], [60, -20]);
  const opacity = useTransform(scrollYProgress, [0.05, 0.2], [0.4, 1]);

  return (
    <section ref={ref} className="py-24 md:py-32 overflow-hidden bg-charcoal">
      <div className="max-w-6xl mx-auto px-6 mb-14 md:mb-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={container}
        >
          <motion.h2
            variants={item}
            className="text-4xl sm:text-5xl md:text-6xl font-medium text-cream tracking-tight text-display"
          >
            季節の花
          </motion.h2>
          <motion.p
            variants={item}
            className="text-cream/60 text-lg mt-4 max-w-xl"
          >
            Flowers for every season.
          </motion.p>
        </motion.div>
      </div>

      <motion.div
        style={{ x, opacity }}
        className="flex gap-5 md:gap-6 pl-6 md:pl-12 lg:pl-24 pb-4 overflow-x-auto scrollbar-hide"
      >
        {images.gallery.map((src, i) => (
          <motion.div
            key={i}
            className="relative shrink-0 w-[280px] md:w-[360px] aspect-[3/4] rounded-xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
            whileHover={{ scale: 1.02 }}
          >
            <Image
              src={src}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 768px) 280px, 360px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
