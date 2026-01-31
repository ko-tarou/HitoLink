'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';

const cards = [
  {
    title: 'Bouquet & Arrangement',
    titleJa: 'ブーケ・アレンジメント',
    description:
      '誕生日・記念日・送別のお祝いに。ペールトーンや落ち着いた色合いが得意です。',
    image:
      'https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=800&q=80',
  },
  {
    title: 'Green & Antique',
    titleJa: 'グリーン・アンティーク',
    description:
      '苗物・観葉植物・プリザーブドフラワー。古道具と合わせた空間づくりも提案します。',
    image:
      'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=800&q=80',
  },
  {
    title: 'Display',
    titleJa: 'ディスプレイ・装花',
    description:
      '店舗の開店祝いや装花も、お店の雰囲気に合わせてデザインします。',
    image:
      'https://images.unsplash.com/photo-1487070183336-b863922373d4?w=800&q=80',
  },
];

export default function Gallery() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="gallery"
      ref={ref}
      className="py-24 sm:py-32 lg:py-40 bg-pale-beige/50"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 lg:mb-24"
        >
          <span className="text-sage-500 font-sans text-sm tracking-[0.2em] uppercase">
            Services
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal mt-2">
            Gallery
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {cards.map((card, i) => (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.15 * i,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group"
            >
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative aspect-[3/4] rounded-sm overflow-hidden bg-sage-100 shadow-lg"
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
                  <span className="font-serif text-cream text-xl sm:text-2xl mb-1 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    {card.titleJa}
                  </span>
                  <span className="font-sans text-cream/90 text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-75">
                    {card.title}
                  </span>
                </div>
              </motion.div>
              <p className="font-sans text-charcoal-light text-sm sm:text-base mt-5 leading-relaxed">
                {card.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
