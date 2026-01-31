"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const menuCategories = [
  {
    title: "Sweets",
    subtitle: "スイーツ",
    items: [
      {
        name: "パフェ（チョコバナナなど）",
        desc: "ミルク感たっぷりのソフトクリームを使用",
        image: "https://picsum.photos/seed/parfait/600/450",
      },
      {
        name: "デザートピザ",
        desc: "焼きたての甘い一品",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80",
      },
      {
        name: "クレープ",
        desc: "ふんわり生地にフレッシュなフルーツ",
        image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&q=80",
      },
    ],
  },
  {
    title: "Lunch",
    subtitle: "ランチ",
    items: [
      {
        name: "パスタ",
        desc: "日替わりパスタ",
        image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=600&q=80",
      },
      {
        name: "焼きオムライス",
        desc: "サラダ・デザートセット付き",
        image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&q=80",
      },
    ],
  },
  {
    title: "Drink",
    subtitle: "ドリンク",
    items: [
      {
        name: "ハンドドリップコーヒー",
        desc: "550円",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80",
      },
      {
        name: "自家製ベリーソースドリンク",
        desc: "季節のフルーツを使用",
        image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&q=80",
      },
    ],
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export function Menu() {
  return (
    <section id="menu" className="relative bg-warmbeige/30 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="font-display text-accent/90 text-sm tracking-widest uppercase mb-2">
            Cafe & Lunch
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-medium text-darkgray">
            Menu
          </h2>
        </motion.div>

        <div className="space-y-20">
          {menuCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="font-display text-xl md:text-2xl text-darkgray mb-2">
                {category.title}
              </h3>
              <p className="text-darkgray/70 text-sm mb-8">{category.subtitle}</p>

              <motion.div
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                {category.items.map((menuItem, i) => (
                  <motion.article
                    key={menuItem.name}
                    variants={item}
                    className="group overflow-hidden rounded-xl bg-white shadow-md transition-shadow hover:shadow-xl"
                    data-stalker-hover
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={menuItem.image}
                        alt={menuItem.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-medium text-darkgray">{menuItem.name}</h4>
                      <p className="text-sm text-darkgray/70 mt-1">{menuItem.desc}</p>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
