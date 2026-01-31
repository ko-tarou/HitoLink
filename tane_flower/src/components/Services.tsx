"use client";

import {
  Flower2,
  Heart,
  Package,
  Palette,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ScrollReveal, StaggerChildren, StaggerItem } from "./ScrollReveal";

const SERVICES = [
  {
    id: "flowers",
    title: "Flowers & Green",
    titleJa: "生花・グリーン",
    description:
      "1輪から購入できる生花、季節のブーケ、観葉植物。",
    icon: Flower2,
    image:
      "https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=600&q=80",
  },
  {
    id: "gift",
    title: "Gift & Wedding",
    titleJa: "ギフト・ウェディング",
    description:
      "誕生日・記念日のアレンジメント、ウェディング装花（オーダーメイド）。",
    icon: Heart,
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80",
  },
  {
    id: "goods",
    title: "Life & Goods",
    titleJa: "生活雑貨",
    description:
      "花瓶、ガーデニング用品、生活雑貨、アクセサリー。",
    icon: Package,
    image:
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&q=80",
  },
  {
    id: "workshop",
    title: "Workshop",
    titleJa: "ワークショップ",
    description:
      "リース作りなど、季節の花や素材を使ったワークショップを開催。",
    icon: Palette,
    image:
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&q=80",
  },
] as const;

function ServiceCard({
  item,
  index,
}: {
  item: (typeof SERVICES)[number];
  index: number;
}) {
  const Icon = item.icon as LucideIcon;

  return (
    <StaggerItem>
      <motion.article
        className="group relative overflow-hidden rounded-sm bg-cream-dark"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={item.image}
            alt={item.titleJa}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-95"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          <div className="absolute inset-0 bg-charcoal/0 transition-colors duration-500 group-hover:bg-charcoal/10" />
          <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 text-white">
            <Icon className="h-5 w-5 opacity-90" />
            <span
              className="font-serif text-sm tracking-wide"
              style={{ fontFamily: "var(--font-shippori-mincho)" }}
            >
              {item.title}
            </span>
          </div>
        </div>
        <div className="p-6">
          <h3
            className="font-serif text-lg text-charcoal"
            style={{ fontFamily: "var(--font-shippori-mincho)" }}
          >
            {item.titleJa}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-charcoal-light">
            {item.description}
          </p>
        </div>
      </motion.article>
    </StaggerItem>
  );
}

export default function Services() {
  return (
    <section className="relative bg-beige/50 py-32 md:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <p
            className="font-serif text-xs tracking-[0.3em] text-muted-green md:text-sm"
            style={{ fontFamily: "var(--font-shippori-mincho)" }}
          >
            SERVICES
          </p>
          <h2
            className="mt-2 font-serif text-2xl text-charcoal md:text-3xl"
            style={{ fontFamily: "var(--font-shippori-mincho)" }}
          >
            事業内容
          </h2>
        </ScrollReveal>

        <StaggerChildren className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4" staggerDelay={0.1}>
          {SERVICES.map((item, index) => (
            <ServiceCard key={item.id} item={item} index={index} />
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
