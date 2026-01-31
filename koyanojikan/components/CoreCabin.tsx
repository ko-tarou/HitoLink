"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const featureText =
  "杉材使用の規格型。低価格で趣味・収納に。";

export default function CoreCabin() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [80, 0, 0, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.25], [0.9, 1]);

  return (
    <section
      id="core-cabin"
      ref={sectionRef}
      className="relative overflow-hidden bg-earth-200/50 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12 text-center"
        >
          <h2 className="font-serif text-3xl font-light text-earth-800 sm:text-4xl md:text-5xl">
            木の小屋 Core Cabin
          </h2>
        </motion.div>

        <motion.div
          style={{ y, opacity, scale }}
          className="relative mx-auto max-w-4xl"
        >
          <div className="overflow-hidden rounded-2xl shadow-2xl shadow-earth-800/20">
            <Image
              src="https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80"
              alt="木の小屋 Core Cabin"
              width={1200}
              height={700}
              className="h-auto w-full object-cover"
              sizes="(max-width: 768px) 100vw, 1200px"
            />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 text-center font-serif text-lg text-earth-700 sm:text-xl md:text-2xl"
        >
          {featureText}
        </motion.p>
      </div>
    </section>
  );
}
