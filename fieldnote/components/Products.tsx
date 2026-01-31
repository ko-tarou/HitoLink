'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const products = [
  {
    title: '雷鳥モチーフグッズ',
    description: '富山のシンボル、雷鳥をモチーフにした雑貨',
    image:
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&q=80',
    tag: 'TATEYAMA',
  },
  {
    title: '畦地梅太郎 作品モチーフ',
    description: '山の版画家・畦地梅太郎さんの世界観を日常に',
    image:
      'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&q=80',
    tag: 'ART',
  },
  {
    title: 'オーガニックコーヒー',
    description: 'ドリップパック 979円〜 / 豆 1,500円〜',
    image:
      'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&q=80',
    tag: 'COFFEE',
  },
  {
    title: '文房具・雑貨',
    description: '自然を感じるデザインのステーショナリー',
    image:
      'https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=600&q=80',
    tag: 'STATIONERY',
  },
  {
    title: 'オーガニック食品',
    description: '体と心にやさしいナチュラルフード',
    image:
      'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=80',
    tag: 'ORGANIC',
  },
  {
    title: 'アロマ・コスメ',
    description: '植物の香りで暮らしを豊かに',
    image:
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&q=80',
    tag: 'AROMA',
  },
];

export default function Products() {
  return (
    <section id="products" className="relative bg-white py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <p className="font-display text-sm tracking-[0.2em] text-sage-600">
            PRODUCTS
          </p>
          <h2 className="font-display mt-3 text-2xl font-medium text-charcoal-800 md:text-3xl lg:text-4xl">
            取り扱い商品
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, i) => (
            <motion.article
              key={product.title}
              className="group overflow-hidden rounded-2xl bg-sand-50 shadow-sm transition-shadow hover:shadow-xl"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-charcoal-700 backdrop-blur-sm">
                  {product.tag}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-lg font-medium text-charcoal-800">
                  {product.title}
                </h3>
                <p className="mt-2 text-sm text-charcoal-600">
                  {product.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
