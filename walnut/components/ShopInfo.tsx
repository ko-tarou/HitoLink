'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Phone, Clock, CalendarOff } from 'lucide-react';
import Image from 'next/image';

const accessImage =
  'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800&q=80';

const infoItems = [
  {
    icon: MapPin,
    label: '住所',
    value: '〒939-8084 富山県富山市西中野町2丁目19-14',
  },
  {
    icon: Phone,
    label: '電話・FAX',
    value: '076-423-0233',
  },
  {
    icon: Clock,
    label: '営業時間',
    value: '9:00〜19:00',
  },
  {
    icon: CalendarOff,
    label: '定休日',
    value: '水曜定休、年末年始（1/1〜1/5）、お盆（5日間）',
  },
];

export function ShopInfo() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      id="access"
      ref={ref}
      className="bg-beige-100/60 py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <motion.h2
          className="font-heading text-3xl font-medium text-sage-800 md:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          アクセス & 店舗情報
        </motion.h2>

        <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-16">
          <motion.div
            className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Image
              src={accessImage}
              alt="店舗周辺"
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>

          <motion.div
            className="flex flex-col justify-center space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {infoItems.map((item, i) => (
              <div
                key={item.label}
                className="flex gap-4 rounded-xl bg-cream/80 p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sage-200 text-sage-700">
                  <item.icon size={20} />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-sage-600">
                    {item.label}
                  </p>
                  <p className="mt-1 font-body text-beige-800">{item.value}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
