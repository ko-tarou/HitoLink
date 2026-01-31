'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { getProductImageUrl, getProductUrl, NEW_ARRIVAL_PRODUCTS } from '@/lib/products';

export default function NewArrival() {
  return (
    <section
      id="new-arrival"
      className="bg-[var(--background)] py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <motion.h2
          className="mb-4 font-serif text-2xl font-light tracking-wide text-[var(--indigo-deep)] md:text-3xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          NEW ARRIVAL
        </motion.h2>
        <motion.p
          className="mb-16 text-sm text-[var(--concrete)]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          新着商品 — <a href="https://indigo1998.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-[var(--indigo-deep)]">indigo1998.com</a> より
        </motion.p>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-5">
          {NEW_ARRIVAL_PRODUCTS.map((product, i) => (
            <motion.a
              key={product.pid}
              href={getProductUrl(product.pid)}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="aspect-[3/4] overflow-hidden rounded-lg bg-[var(--concrete-light)]/10">
                <Image
                  src={getProductImageUrl(product.pid, 'thumb')}
                  alt={product.name}
                  width={300}
                  height={400}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  unoptimized
                />
              </div>
              <p className="mt-3 truncate font-serif text-sm text-[var(--indigo-deep)]">
                {product.name}
              </p>
              <p className="truncate text-xs text-[var(--concrete)]">
                {product.brand}
              </p>
              <p className="mt-1 text-sm font-medium text-[var(--indigo-deep)]">
                ¥{product.price}
              </p>
            </motion.a>
          ))}
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <a
            href="https://indigo1998.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-b-2 border-[var(--indigo-deep)] pb-1 font-sans text-sm tracking-widest text-[var(--indigo-deep)] transition-colors hover:text-[var(--indigo-light)]"
          >
            VIEW ALL
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
