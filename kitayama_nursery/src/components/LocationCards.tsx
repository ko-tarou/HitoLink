'use client';

import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin } from 'lucide-react';

const locations = [
  {
    name: '富山店',
    address: '富山市有沢189-1',
    description: '本店。広大な敷地で緑の世界をお楽しみください。',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&q=80',
  },
  {
    name: '高岡店',
    address: '高岡市六家堂田744-1',
    description: '高岡エリアの緑の拠点。',
    image: 'https://images.unsplash.com/photo-1598902108854-10e335adac99?w=600&q=80',
  },
  {
    name: '東店',
    address: '魚津市木下新234',
    description: '東エリアからもご来店いただけます。',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80',
  },
];

const farms = [
  { name: '富山農場' },
  { name: '八尾農場' },
];

export function LocationCards() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="locations" ref={ref} className="bg-base py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="font-serif text-3xl font-medium text-primary md:text-4xl"
        >
          店舗・農場
        </motion.h2>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {locations.map((loc, i) => (
            <motion.article
              key={loc.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="group overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={loc.image}
                  alt={loc.name}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-primary/0 transition duration-300 group-hover:bg-primary/10" />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl font-medium text-primary">{loc.name}</h3>
                <p className="mt-1 flex items-center gap-1 font-sans text-sm text-primary/70">
                  <MapPin size={14} />
                  {loc.address}
                </p>
                <p className="mt-3 font-sans text-sm text-primary/80">{loc.description}</p>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="mt-12 flex flex-wrap gap-4 border-t border-primary/10 pt-8"
        >
          <span className="font-sans text-sm text-primary/60">農場：</span>
          {farms.map((f) => (
            <span
              key={f.name}
              className="rounded-full bg-primary/5 px-4 py-2 font-sans text-sm text-primary/80"
            >
              {f.name}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
