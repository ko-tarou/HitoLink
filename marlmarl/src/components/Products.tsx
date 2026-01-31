"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { Gift, Baby, Package } from "lucide-react";

const productCategories = [
  {
    icon: Gift,
    title: "かわいい雑貨",
    description: "日常をちょっと特別にする、心ときめくアイテムたち。",
    color: "forest",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80",
  },
  {
    icon: Baby,
    title: "MARL MARL",
    description: "ベビー・キッズ向けのアイテム。丸型よだれかけが人気です。",
    color: "gold",
    image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&q=80",
  },
  {
    icon: Package,
    title: "贈り物に",
    description: "出産祝い・誕生祝いにぴったり。実用性とデザイン性を兼ね備えています。",
    color: "earth",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&q=80",
  },
];

const productItems = [
  {
    name: "丸型よだれかけ",
    category: "MARL MARL",
    image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&q=80",
  },
  {
    name: "ベビー雑貨",
    category: "MARL MARL",
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&q=80",
  },
  {
    name: "キッズアイテム",
    category: "MARL MARL",
    image: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=600&q=80",
  },
  {
    name: "ステーショナリー",
    category: "雑貨",
    image: "https://images.unsplash.com/photo-1513542789411-b6d5d1f4a746?w=600&q=80",
  },
  {
    name: "インテリア小物",
    category: "雑貨",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80",
  },
  {
    name: "ギフトセット",
    category: "贈り物",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&q=80",
  },
];

export default function Products() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="products"
      className="relative py-24 sm:py-32 lg:py-40 overflow-hidden bg-forest-950"
    >
      {/* Background accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-forest-700/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gold-500/5 rounded-full blur-3xl" />
      <div className="absolute inset-0 paper-overlay" />

      <div className="relative max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-cream-100">
            心ときめく
            <span className="block text-gold-300 mt-2">雑貨たち</span>
          </h2>
          <p className="mt-6 text-cream-300/90 text-lg max-w-2xl mx-auto">
            実用性を兼ね備えたかわいい雑貨と、MARL MARLブランドの
            <br className="hidden sm:block" />
            ベビー・キッズアイテム。贈り物やお祝いにぴったりです。
          </p>
        </motion.div>

        {/* Category cards - horizontal scroll on mobile */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="flex gap-6 overflow-x-auto pb-4 -mx-6 px-6 sm:overflow-visible sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3 sm:gap-8 scrollbar-hide"
        >
          {productCategories.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
              whileHover={{
                scale: 1.03,
                y: -8,
                transition: { duration: 0.3 },
              }}
              className="flex-shrink-0 w-[280px] sm:w-auto group"
            >
              <div className="h-full rounded-2xl bg-forest-900/60 border border-forest-700/50 backdrop-blur-sm hover:border-gold-500/30 transition-colors overflow-hidden">
                <div className="relative aspect-[4/3] sm:aspect-video overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 280px, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950/60 to-transparent" />
                </div>
                <div className="p-6">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                      item.color === "gold"
                        ? "bg-gold-500/20 text-gold-300"
                        : item.color === "forest"
                        ? "bg-forest-600/30 text-forest-300"
                        : "bg-earth-500/20 text-earth-300"
                    }`}
                  >
                    <item.icon className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-serif text-xl text-cream-100 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-cream-400/80 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Masonry-style product grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-16 grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6"
        >
          {productItems.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                delay: 0.6 + i * 0.05,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ scale: 1.03 }}
              className="group relative aspect-[3/4] rounded-xl overflow-hidden border border-forest-700/30"
            >
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="(max-width: 640px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-forest-950/20 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-4">
                <span className="font-serif text-cream-100 text-center text-sm sm:text-base drop-shadow-lg">
                  {item.name}
                </span>
                <span className="text-cream-400/90 text-xs mt-1 text-center">
                  {item.category}
                </span>
              </div>
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-gold-400/40 rounded-xl transition-colors pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
