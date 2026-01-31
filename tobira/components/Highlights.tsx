"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, Music, Leaf } from "lucide-react";

const highlights = [
  {
    id: "treasure",
    title: "宝物探しのような店内",
    description: "一つひとつに物語がある品々が、静かにあなたを待っています。",
    image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=600&q=80",
    icon: Sparkles,
  },
  {
    id: "piano",
    title: "リユース品のピアノ",
    description: "かつて誰かの暮らしに寄り添ったピアノが、空間に温もりを添えます。",
    image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=600&q=80",
    icon: Music,
  },
  {
    id: "plants",
    title: "植物に包まれた空間",
    description: "アンティークと緑が調和した、旅するようなひとときを。",
    image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=600&q=80",
    icon: Leaf,
  },
];

export default function Highlights() {
  return (
    <section
      id="highlights"
      className="relative py-24 md:py-32 px-6 bg-[var(--color-offwhite)] overflow-hidden"
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="font-[family-name:var(--font-serif)] text-3xl md:text-5xl text-[var(--color-forest)] text-center tracking-wide mb-16 md:mb-20"
      >
        訪問のヒント
      </motion.h2>

      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 md:gap-10 overflow-x-auto md:overflow-visible pb-4 md:pb-0">
          {highlights.map((item, i) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="flex-shrink-0 w-full md:w-1/3 group"
            >
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-lg mb-4">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-[var(--color-forest)]/20 group-hover:bg-transparent transition-colors duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                  <item.icon className="w-6 h-6 text-[var(--color-brass-light)] mb-2" />
                  <h3 className="font-[family-name:var(--font-serif)] text-lg text-white">
                    {item.title}
                  </h3>
                </div>
              </div>
              <p className="text-[var(--color-wood)] text-sm leading-relaxed px-1">
                {item.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
