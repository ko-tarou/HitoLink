'use client';

import { motion } from 'framer-motion';

// Brands from indigo1998.com
const BRANDS = [
  'Hollywood Ranch Market',
  'BLUE BLUE',
  'Tilak',
  'SASSAFRAS',
  'Bohemians',
  'STANDARD CALIFORNIA',
  'JACKSON MATISSE',
  'REMI RELIEF',
  'MAGIC NUMBER',
  'DENHAM',
  'BRIEFING',
  'White Mountaineering',
  'ANACHRONORM',
  'BOW WOW',
  'AgAwd',
  'IL BISONTE',
  'VANS',
  'Danner',
];

function BrandItem({ brand }: { brand: string }) {
  return (
    <span
      className="shrink-0 font-serif text-4xl font-medium tracking-[0.2em] text-transparent [-webkit-text-stroke:1.5px_var(--indigo-deep)] md:text-5xl lg:text-6xl"
    >
      {brand}
    </span>
  );
}

export default function BrandMarquee() {
  const content = [...BRANDS, ...BRANDS];

  return (
    <section
      id="brands"
      className="relative overflow-hidden border-y border-[var(--concrete-light)]/30 bg-[var(--background)] py-12 md:py-16"
    >
      <motion.div
        className="flex w-max gap-16 md:gap-24"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: 25,
            ease: 'linear',
          },
        }}
      >
        {content.map((brand, i) => (
          <BrandItem key={`${brand}-${i}`} brand={brand} />
        ))}
      </motion.div>
    </section>
  );
}
