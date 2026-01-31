'use client';

import { motion } from 'framer-motion';
import { Leaf, Coffee, Palette, BookOpen } from 'lucide-react';

const items = [
  {
    icon: Leaf,
    label: '植物・アロマ',
  },
  {
    icon: Coffee,
    label: 'オーガニックコーヒー・お茶',
  },
  {
    icon: Palette,
    label: '文房具・おもちゃ',
  },
  {
    icon: BookOpen,
    label: '食品・雑貨',
  },
];

export default function Concept() {
  return (
    <section id="concept" className="relative bg-sand-50 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <p className="font-display text-sm tracking-[0.2em] text-sage-600">
            CONCEPT
          </p>
          <h2 className="font-display mt-3 text-2xl font-medium text-charcoal-800 md:text-3xl lg:text-4xl">
            自然と暮らしの調和
          </h2>
        </motion.div>

        <motion.div
          className="mx-auto mt-16 max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <p className="leading-relaxed text-charcoal-700">
            モンベルヴィレッジ立山の一部として運営される、
            <strong className="text-charcoal-900">モンベル初のコンセプトショップ</strong>
            です。
            <br className="hidden sm:inline" />
            植物、食品、オーガニックコーヒー、お茶、アロマオイル、おもちゃ、文房具など、
            自然やアウトドアを感じられる雑貨を専門に扱っています。
          </p>
        </motion.div>

        <motion.div
          className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={{
            visible: {
              transition: { staggerChildren: 0.1 },
            },
          }}
        >
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              className="flex flex-col items-center rounded-2xl bg-white/80 py-8 shadow-sm transition-shadow hover:shadow-md"
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ y: -4 }}
            >
              <item.icon className="h-8 w-8 text-sage-600" strokeWidth={1.5} />
              <span className="mt-3 text-sm font-medium text-charcoal-700">
                {item.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
