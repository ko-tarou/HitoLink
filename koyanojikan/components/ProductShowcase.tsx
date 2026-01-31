"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const categories = [
  {
    title: "雑貨・インテリア",
    description:
      "富山の真鍮鋳物メーカー「FUTAGAMI」の箸置き、スタイリッシュな調度品。",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80",
    accent: "brass",
  },
  {
    title: "ファッション・カフェ",
    description:
      "ファッションアイテム、コーヒー豆・ドリップパック。",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
    accent: "forest",
  },
  {
    title: "ギフト",
    description:
      "富山のものづくりを感じる、作り手の想いが込められたアイテム。",
    image:
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80",
    accent: "earth",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

export default function ProductShowcase() {
  return (
    <section id="products" className="bg-earth-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center font-serif text-3xl font-light text-earth-800 sm:text-4xl"
        >
          取り扱い商品
        </motion.h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, i) => (
            <motion.article
              key={category.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
              className="group overflow-hidden rounded-2xl bg-white/80 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-earth-200/50"
            >
              <div className="relative aspect-[3/2] overflow-hidden">
                <motion.div
                  className="h-full w-full"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover transition-shadow duration-300 group-hover:shadow-inner"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-earth-900/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
              <div className="p-6 sm:p-8">
                <h3 className="mb-3 font-serif text-xl text-earth-800 sm:text-2xl">
                  {category.title}
                </h3>
                <p className="text-sm leading-relaxed text-earth-600 sm:text-base">
                  {category.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
