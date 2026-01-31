"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const TAGS = [
  "#TINプレート",
  "#オールドスパイス",
  "#シンプソンズ",
  "#アメコミ",
  "#ガレージ雑貨",
  "#新商品頻繁入荷",
];

const ITEMS = [
  { src: "https://placehold.co/400x300/1a1a1a/00f3ff", title: "Vintage Tin" },
  { src: "https://placehold.co/400x300/1a1a1a/ff00ff", title: "Comic Art" },
  { src: "https://placehold.co/400x300/1a1a1a/ffd700", title: "Garage Goods" },
  { src: "https://placehold.co/400x300/1a1a1a/00f3ff", title: "Retro Sign" },
  { src: "https://placehold.co/400x300/1a1a1a/ff00ff", title: "Import Item" },
  { src: "https://placehold.co/400x300/1a1a1a/ffd700", title: "Collectible" },
];

const ProductGrid = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 0.5], [0, -200]);

  return (
    <section
      ref={containerRef}
      id="products"
      className="relative py-24 md:py-32 overflow-hidden bg-[#050510]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-[family-name:var(--font-orbitron)] text-3xl sm:text-4xl md:text-5xl font-bold mb-12 text-center text-[#00f3ff]"
          style={{ textShadow: "0 0 20px rgba(0, 243, 255, 0.3)" }}
        >
          PRODUCTS & VIBES
        </motion.h2>

        {/* Keyword Tags */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {TAGS.map((tag, i) => (
            <motion.span
              key={tag}
              className="px-4 py-2 rounded-full text-sm font-[family-name:var(--font-orbitron)] border border-[#00f3ff]/30 text-[#00f3ff] bg-[#00f3ff]/5"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{
                scale: 1.05,
                borderColor: "#00f3ff",
                boxShadow: "0 0 20px rgba(0, 243, 255, 0.3)",
              }}
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>

        {/* Horizontal Scroll Gallery */}
        <motion.div style={{ x }} className="mb-12">
          <div className="flex gap-6 overflow-x-auto pb-8 -mx-4 px-4 scrollbar-hide">
            {ITEMS.map((item, i) => (
              <motion.div
                key={i}
                className="flex-shrink-0 w-[300px] md:w-[400px] group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{
                  scale: 1.03,
                  rotateY: 5,
                  transition: { duration: 0.3 },
                }}
              >
                <div
                  className="rounded-xl overflow-hidden backdrop-blur-xl border border-white/10 bg-white/5 p-4"
                  style={{
                    boxShadow: "0 0 30px rgba(0, 243, 255, 0.1)",
                  }}
                >
                  <div className="relative overflow-hidden rounded-lg">
                    <Image
                      src={item.src}
                      alt={item.title}
                      width={400}
                      height={300}
                      className="object-cover w-full h-48 md:h-64 transition-transform duration-500 group-hover:scale-110"
                      unoptimized
                    />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        boxShadow: "inset 0 0 60px rgba(0, 243, 255, 0.2)",
                      }}
                    />
                  </div>
                  <p className="mt-4 font-[family-name:var(--font-orbitron)] text-[#00f3ff] text-center">
                    {item.title}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductGrid;
