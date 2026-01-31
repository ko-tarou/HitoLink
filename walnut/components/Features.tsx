'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Flower2,
  Leaf,
  Sprout,
  LeafyGreen,
  Package,
  MapPin,
  Heart,
} from 'lucide-react';
import Image from 'next/image';

const features = [
  {
    title: '生花',
    subtitle: 'Fresh Flowers',
    description: '季節の花を丁寧にセレクト。ブーケやアレンジメントもお任せください。',
    icon: Flower2,
    image:
      'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&q=80',
  },
  {
    title: '観葉植物',
    subtitle: 'House Plants',
    description: 'お部屋に緑を。育てやすい観葉植物を多数取り揃えています。',
    icon: Leaf,
    image:
      'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=600&q=80',
  },
  {
    title: '園芸品',
    subtitle: 'Gardening',
    description: '土・鉢・道具まで。ガーデニングを楽しむための品揃え。',
    icon: Sprout,
    image:
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80',
  },
  {
    title: 'ハーブ',
    subtitle: 'Herbs',
    description: '料理やティーに。フレッシュ＆ドライハーブ各種。',
    icon: LeafyGreen,
    image:
      'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=600&q=80',
  },
];

const highlights = [
  { icon: Package, text: 'ネット注文可能' },
  { icon: MapPin, text: '西部の住宅街' },
  { icon: Heart, text: '地元で愛される店' },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export function Features() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      id="features"
      ref={ref}
      className="bg-cream py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-3xl font-medium text-sage-800 md:text-4xl">
            取り扱い
          </h2>
          <p className="mt-2 text-beige-700">
            花と緑で、日常に小さな幸せを。
          </p>
        </motion.div>

        <motion.div
          className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
          variants={container}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
        >
          {features.map((feature) => (
            <motion.article
              key={feature.title}
              variants={item}
              className="group relative overflow-hidden rounded-2xl bg-beige-50 shadow-md transition-shadow hover:shadow-xl"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-beige-900/70 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="inline-flex rounded-full bg-cream/90 px-3 py-1 text-xs font-medium text-beige-800">
                    {feature.subtitle}
                  </span>
                  <h3 className="mt-2 font-heading text-xl font-medium text-cream">
                    {feature.title}
                  </h3>
                </div>
                <div className="absolute right-4 top-4 rounded-full bg-cream/80 p-2 text-sage-700">
                  <feature.icon size={20} />
                </div>
              </div>
              <p className="p-4 text-sm leading-relaxed text-beige-700">
                {feature.description}
              </p>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          className="mt-20 flex flex-wrap justify-center gap-8 md:gap-12"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {highlights.map((h) => (
            <div
              key={h.text}
              className="flex items-center gap-3 rounded-full bg-sage-100 px-5 py-3 text-sage-800"
            >
              <h.icon size={20} className="text-sage-600" />
              <span className="text-sm font-medium">{h.text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
