'use client';

import Image, { ImageProps } from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export function LazyImage({
  className,
  ...props
}: ImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden"
    >
      <Image loading="lazy" className={className} {...props} />
    </motion.div>
  );
}
