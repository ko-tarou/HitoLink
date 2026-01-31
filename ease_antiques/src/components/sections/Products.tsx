"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const categories = [
  {
    id: "furniture",
    nameJa: "家具",
    nameEn: "Furniture",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    description: "ヴィンテージ家具",
  },
  {
    id: "zakka",
    nameJa: "雑貨",
    nameEn: "Zakka",
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6354a?w=800&q=80",
    description: "アンティーク雑貨",
  },
  {
    id: "clothing",
    nameJa: "古着",
    nameEn: "Used Clothing",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
    description: "ヴィンテージウェア",
  },
  {
    id: "accessories",
    nameJa: "アクセサリー",
    nameEn: "Accessories",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80",
    description: "小物・アクセサリー",
  },
];

export function Products() {
  return (
    <section
      id="products"
      className="relative py-24 md:py-32 px-6 bg-cream-dark/30"
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="font-serif text-wood-dark text-3xl md:text-4xl font-medium mb-4"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          商品
        </motion.h2>
        <motion.p
          className="text-wood-light mb-14 max-w-xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          一部商品はオンラインでもご覧いただけます。ご希望の品がございましたらお問い合わせください。
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {categories.map((cat, i) => (
            <motion.a
              key={cat.id}
              href="#stores"
              className="group block overflow-hidden bg-cream border border-wood/10 hover:border-brass/30 transition-colors duration-300"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.nameJa}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-wood-dark/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-cream text-sm">{cat.description}</p>
                </div>
              </div>
              <div className="p-4 md:p-5">
                <h3 className="font-serif text-wood-dark text-lg group-hover:text-brass-muted transition-colors">
                  {cat.nameJa}
                </h3>
                <p className="text-wood-light/80 text-sm mt-0.5">{cat.nameEn}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
