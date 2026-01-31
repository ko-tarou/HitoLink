'use client';

import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const bentoItems = [
  {
    title: '植木・切花・果樹',
    description: '庭木から切り花、果樹苗まで豊富に取り揃えています。',
    image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800&q=80',
    span: 'col-span-2 row-span-2 md:col-span-2 md:row-span-2',
    imageClass: 'object-cover',
  },
  {
    title: '希少植物',
    description: 'アロイド・熱帯植物など、こだわりの希少種。',
    image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=600&q=80',
    span: 'col-span-2 md:col-span-1 md:row-span-1',
    imageClass: 'object-cover',
  },
  {
    title: '造園・メンテナンス',
    description: '設計から施工、維持管理まで一貫対応。',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&q=80',
    span: 'col-span-2 md:col-span-1 md:row-span-1',
    imageClass: 'object-cover',
  },
  {
    title: '園芸教室・イベント',
    description: 'ワークショップや季節のイベントを開催。',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80',
    span: 'col-span-2 md:col-span-2 md:row-span-1',
    imageClass: 'object-cover',
  },
];

export function ProductsGallery() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="products" ref={ref} className="bg-primary/5 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="font-serif text-3xl font-medium text-primary md:text-4xl"
        >
          商品・サービス
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="mt-4 font-sans text-primary/80"
        >
          緑にまつわるあらゆるニーズにお応えします。
        </motion.p>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 md:grid-rows-3 md:gap-6">
          {bentoItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.1 + i * 0.08 }}
              className={`group relative overflow-hidden rounded-xl bg-white shadow-sm ${item.span}`}
            >
              <div className="relative h-full min-h-[200px] md:min-h-[240px]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className={`transition duration-700 group-hover:scale-105 ${item.imageClass}`}
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="font-serif text-xl font-medium md:text-2xl">{item.title}</h3>
                  <p className="mt-1 font-sans text-sm text-white/90">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
