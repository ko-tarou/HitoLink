"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Truck } from "lucide-react";
import { images } from "@/lib/images";

const services = [
  {
    title: "花束・アレンジメント",
    subtitle: "Bouquets & Arrangements",
    description: "季節の花で心を届ける、贈り物と日常のアレンジ。",
    image: images.services.bouquet,
  },
  {
    title: "ブライダル・アンジェリカ",
    subtitle: "Bridal / Angelica",
    description: "ウェディングブーケ、会場装花までトータルコーディネート。",
    image: images.services.bridal,
  },
  {
    title: "プリザーブドフラワー",
    subtitle: "Preserved Flowers",
    description: "長く楽しめる、枯れない花のアレンジメント。",
    image: images.services.preserved,
  },
  {
    title: "胡蝶蘭・スタンド花",
    subtitle: "Orchids & Stand Flowers",
    description: "開店祝い、お祝いの胡蝶蘭・スタンド花。",
    image: images.services.orchid,
  },
  {
    title: "お庭づくり",
    subtitle: "Garden Design",
    description: "外構・庭のデザインと施工、緑の空間づくり。",
    image: images.services.garden,
  },
];

const container = {
  hidden: { opacity: 0 },
  visible: () => ({
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  }),
};

const card = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Services() {
  return (
    <section id="services" className="py-24 md:py-36 px-6 bg-cream">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={container}
          className="space-y-20"
        >
          <div className="text-center max-w-2xl mx-auto">
            <motion.h2
              variants={card}
              className="text-4xl sm:text-5xl md:text-6xl font-medium text-charcoal tracking-tight text-display mb-6"
            >
              Services
            </motion.h2>
            <motion.p
              variants={card}
              className="text-charcoal-muted text-lg md:text-xl"
            >
              花と緑のあらゆるシーンに、私たちがお応えします。
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {services.map(({ title, subtitle, description, image }) => (
              <motion.article
                key={title}
                variants={card}
                className="group"
              >
                <motion.div
                  className="relative overflow-hidden rounded-2xl bg-charcoal/5 border border-sage-100/80 h-full flex flex-col"
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={image}
                      alt={title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 overlay-card opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      <p className="text-cream text-sm leading-relaxed">{description}</p>
                    </div>
                  </div>
                  <div className="p-6 md:p-7 flex flex-col flex-1">
                    <h3 className="text-xl md:text-2xl font-medium text-charcoal mb-1 tracking-tight">
                      {title}
                    </h3>
                    <p className="text-sm text-charcoal-muted uppercase tracking-wider">{subtitle}</p>
                  </div>
                </motion.div>
              </motion.article>
            ))}
          </div>

          <motion.div
            variants={card}
            className="flex flex-wrap items-center justify-center gap-3 text-sage-600 py-4"
          >
            <Truck className="w-5 h-5 shrink-0" strokeWidth={1.5} />
            <span className="text-sm font-medium tracking-wide">
              即日配達可能 — Same-day delivery available
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
