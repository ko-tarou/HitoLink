'use client';

import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const placeholder = 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800&q=80';

export function About() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" ref={ref} className="relative overflow-hidden bg-base py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="grid gap-16 md:grid-cols-2 md:items-center md:gap-24"
        >
          <div className="order-2 md:order-1">
            <h2 className="font-serif text-3xl font-medium text-primary md:text-4xl">
              私たちについて
            </h2>
            <p className="mt-6 font-sans text-base leading-relaxed text-primary/80 md:text-lg">
              1987年設立。富山県富山市に本拠を置く北陸最大級の園芸店・造園企業です。
              資本金800万円、代表取締役社長 北山直人のもと、
              「植物と暮らす豊かさ」を富山からお届けしています。
            </p>
            <p className="mt-4 font-sans text-sm text-primary/70">
              敷地面積4,000坪を誇る広大な敷地で、植木・切花・果樹から希少植物、
              造園・メンテナンスまで、緑にまつわるあらゆるニーズにお応えします。
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative order-1 aspect-[4/3] overflow-hidden rounded-lg md:order-2"
          >
            <Image
              src={placeholder}
              alt="北山ナーセリーの庭"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 grid gap-12 md:grid-cols-2 md:gap-16"
        >
          <div className="relative overflow-hidden rounded-lg">
            <Image
              src="https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=600&q=80"
              alt="植物"
              width={600}
              height={400}
              className="h-64 w-full object-cover transition duration-500 hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="font-serif text-xl font-medium text-primary">Philosophy</h3>
            <p className="mt-3 font-sans text-primary/80">
              余白と緑が織りなす、静謐な空間。美術館のような佇まいの中に、
              生命力あふれる植物を置く。それが私たちの考える「植物のある暮らし」です。
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
