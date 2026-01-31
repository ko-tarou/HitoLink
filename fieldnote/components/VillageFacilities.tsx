'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Store, Bike, Coffee, Mountain, Waves } from 'lucide-react';
import Image from 'next/image';

const facilities = [
  {
    id: 'store',
    title: 'モンベルストア',
    description: 'アウトドアギアの総合ショップ。登山・キャンプ用品が充実。',
    icon: Store,
    image:
      'https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80',
  },
  {
    id: 'cycle',
    title: 'モンベルサイクル立山店',
    description: 'サイクリングやツーリングに最適なギアとサポート。',
    icon: Bike,
    image:
      'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=600&q=80',
  },
  {
    id: 'cafe',
    title: 'ハーベステラス',
    description: '立山の景色を眺めながらくつろげるカフェ。',
    icon: Coffee,
    image:
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80',
  },
  {
    id: 'climbing',
    title: 'クライミング体験',
    description: '土日祝中心に開催。初めての方も安心の体験プログラム。',
    icon: Mountain,
    image:
      'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=600&q=80',
  },
  {
    id: 'kayak',
    title: 'カヤック体験',
    description: '土日祝中心。自然の中で水上アクティビティを楽しめます。',
    icon: Waves,
    image:
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80',
  },
];

export default function VillageFacilities() {
  const [activeId, setActiveId] = useState(facilities[0].id);
  const active = facilities.find((f) => f.id === activeId)!;

  return (
    <section id="facilities" className="relative bg-sand-100 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <p className="font-display text-sm tracking-[0.2em] text-sage-600">
            VILLAGE FACILITIES
          </p>
          <h2 className="font-display mt-3 text-2xl font-medium text-charcoal-800 md:text-3xl lg:text-4xl">
            周辺施設
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-charcoal-600">
            モンベルヴィレッジ立山には、ショップやカフェ、アクティビティが揃っています
          </p>
        </motion.div>

        {/* Tabs - Desktop */}
        <motion.div
          className="mt-12 flex flex-wrap justify-center gap-2"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {facilities.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveId(f.id)}
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                activeId === f.id
                  ? 'bg-sage-600 text-white shadow-md'
                  : 'bg-white/80 text-charcoal-600 hover:bg-white hover:text-sage-600'
              }`}
            >
              {f.title}
            </button>
          ))}
        </motion.div>

        {/* Content card */}
        <motion.div
          className="mt-10 overflow-hidden rounded-2xl bg-white shadow-lg"
          layout
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2"
            >
              <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[320px]">
                <Image
                  src={active.image}
                  alt={active.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="flex flex-col justify-center p-8 md:p-10">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sage-100 text-sage-600">
                    <active.icon className="h-6 w-6" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display text-xl font-medium text-charcoal-800 md:text-2xl">
                    {active.title}
                  </h3>
                </div>
                <p className="mt-4 leading-relaxed text-charcoal-600">
                  {active.description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
