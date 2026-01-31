"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Armchair,
  Shirt,
  Package,
  Sofa,
  Lamp,
  Globe,
} from "lucide-react";

const categories = [
  {
    title: "American Antique Furniture",
    titleJa: "アメリカンアンティーク家具",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
    icon: Armchair,
  },
  {
    title: "Vintage & Used Furniture",
    titleJa: "ヴィンテージ・中古家具",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    icon: Sofa,
  },
  {
    title: "Northern European Furniture",
    titleJa: "北欧家具",
    image:
      "https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?w=800&q=80",
    icon: Lamp,
  },
  {
    title: "General Goods",
    titleJa: "雑貨",
    image:
      "https://images.unsplash.com/photo-1594221708779-94832f4320d1?w=800&q=80",
    icon: Package,
  },
  {
    title: "Vintage Clothing",
    titleJa: "古着",
    image:
      "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80",
    icon: Shirt,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export function Collection() {
  return (
    <section className="relative bg-[var(--brown-dark)] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="font-display text-sm tracking-[0.3em] text-[var(--brass-light)]">
            COLLECTION
          </span>
          <h2 className="font-display-jp mt-4 text-3xl font-semibold text-[var(--cream)] md:text-4xl">
            取り扱い商品
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[var(--cream)]/80">
            修復・チェック済み。お求めやすい価格でご提供しています。
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
        >
          {categories.map((cat, i) => (
            <motion.article
              key={cat.title}
              variants={item}
              className="group relative overflow-hidden"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--brown-dark)]/90 via-[var(--brown-dark)]/20 to-transparent transition-opacity duration-500 group-hover:from-[var(--brown-dark)]/95" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <cat.icon className="mb-2 h-6 w-6 text-[var(--brass-light)]" />
                  <h3 className="font-display text-lg font-medium text-[var(--cream)]">
                    {cat.title}
                  </h3>
                  <p className="mt-1 text-sm text-[var(--cream)]/80 font-display-jp">
                    {cat.titleJa}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 flex justify-center"
        >
          <p className="flex items-center gap-2 text-sm text-[var(--cream)]/70">
            <Globe className="h-4 w-4" />
            姉妹店：イーズアンティーク（富山市西公文名町5-1）車で約3分
          </p>
        </motion.div>
      </div>
    </section>
  );
}
