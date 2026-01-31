"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Sofa, Palette, Shirt, Calendar } from "lucide-react";

const items = [
  {
    id: "antique",
    title: "Antique",
    description: "日本とフランスの家具、希少な古道具。",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80",
    icon: Sofa,
  },
  {
    id: "upcycle",
    title: "Upcycle & Art",
    description: "廃材のステンドグラス、Vera Waltherのアートグラス。",
    image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&q=80",
    icon: Palette,
  },
  {
    id: "kimono",
    title: "Kimono",
    description: "リサイクル着物（きもの猫田コーナー）。",
    image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80",
    icon: Shirt,
  },
  {
    id: "space",
    title: "Space Rental",
    description: "展示会・撮影・ワークショップ利用。",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80",
    icon: Calendar,
  },
];

export default function Collection() {
  return (
    <section
      id="collection"
      className="relative py-24 md:py-32 px-6 bg-[var(--color-forest)] text-[var(--color-offwhite)] overflow-hidden"
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="font-[family-name:var(--font-serif)] text-3xl md:text-5xl text-center tracking-wide mb-16 md:mb-20"
      >
        Collection & Service
      </motion.h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {items.map((item, i) => (
          <motion.article
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="group relative rounded-lg overflow-hidden bg-[var(--color-forest-deep)]"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-forest-deep)] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                <item.icon className="w-6 h-6 text-[var(--color-brass-light)] shrink-0" />
                <h3 className="font-[family-name:var(--font-serif)] text-xl md:text-2xl">
                  {item.title}
                </h3>
              </div>
            </div>
            <div className="px-5 py-4 bg-[var(--color-forest-deep)]/95 md:opacity-90 md:group-hover:opacity-100 transition-opacity">
              <p className="text-[var(--color-cream)]/90 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
