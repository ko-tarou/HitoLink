'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { COLLECTION_PRODUCTS, getProductImageUrl } from '@/lib/products';

const CATEGORIES = [
  { id: 'mens', label: 'MENS', size: 'large' as const, products: COLLECTION_PRODUCTS.mens },
  { id: 'womens', label: 'WOMENS', size: 'large' as const, products: COLLECTION_PRODUCTS.womens },
  { id: 'kids', label: 'KIDS', size: 'small' as const, products: COLLECTION_PRODUCTS.kids },
  { id: 'goods', label: 'GOODS', size: 'small' as const, products: COLLECTION_PRODUCTS.goods },
];

// Category links from indigo1998.com
const CATEGORY_LINKS: Record<string, string> = {
  mens: 'https://indigo1998.com/?mode=cate&cbid=1743323&csid=1&sort=n',
  womens: 'https://indigo1998.com/?mode=cate&cbid=1743323&csid=2&sort=n',
  kids: 'https://indigo1998.com/?mode=cate&cbid=1743323&csid=3&sort=n',
  goods: 'https://indigo1998.com/?mode=grp&gid=905940&sort=n',
};

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

function BentoCard({
  label,
  size,
  products,
  categoryId,
}: {
  label: string;
  size: 'large' | 'small';
  products: { pid: string; name: string; brand: string }[];
  categoryId: string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const linkUrl = CATEGORY_LINKS[categoryId] || 'https://indigo1998.com/';

  return (
    <motion.a
      href={linkUrl}
      target="_blank"
      rel="noopener noreferrer"
      variants={item}
      className={`group relative block overflow-hidden rounded-2xl bg-[var(--concrete-light)]/10 ${
        size === 'large' ? 'md:col-span-2 md:row-span-2' : 'md:col-span-1 md:row-span-1'
      } aspect-[4/5] md:aspect-auto`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product images grid */}
      <div className={`absolute inset-0 grid gap-1 p-2 ${size === 'large' ? 'grid-cols-2' : 'grid-cols-1'}`}>
        {products.slice(0, size === 'large' ? 4 : 2).map((p) => (
          <div key={p.pid} className="relative overflow-hidden rounded-lg">
            <Image
              src={getProductImageUrl(p.pid, 'thumb')}
              alt={p.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 33vw"
              unoptimized
            />
          </div>
        ))}
      </div>

      {/* Indigo overlay on hover */}
      <motion.div
        className="absolute inset-0 bg-[var(--indigo-deep)]"
        initial={false}
        animate={{
          opacity: isHovered ? 0.92 : 0,
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center p-8">
        <motion.span
          className="font-serif text-2xl font-medium tracking-[0.3em] md:text-3xl lg:text-4xl"
          animate={{
            color: isHovered ? 'var(--white)' : 'var(--indigo-deep)',
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {label}
        </motion.span>

        <motion.span
          className="mt-6 flex items-center gap-2 border-b-2 border-white/0 pb-1 font-sans text-sm tracking-widest"
          initial={false}
          animate={{
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : -10,
            borderColor: isHovered ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0)',
            color: isHovered ? 'white' : 'var(--indigo-deep)',
          }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          View More
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </motion.span>
      </div>
    </motion.a>
  );
}

export default function Collection() {
  return (
    <section
      id="collection"
      className="bg-[var(--background)] py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <motion.h2
          className="mb-16 font-serif text-3xl font-light tracking-wide text-[var(--indigo-deep)] md:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Collection
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2 md:gap-6"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {CATEGORIES.map((cat) => (
            <BentoCard
              key={cat.id}
              label={cat.label}
              size={cat.size}
              products={cat.products}
              categoryId={cat.id}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
