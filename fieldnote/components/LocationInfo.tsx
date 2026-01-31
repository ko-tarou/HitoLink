'use client';

import { motion } from 'framer-motion';
import { MapPin, Car, Train, ParkingCircle, Clock, Phone } from 'lucide-react';
import Image from 'next/image';

const MAP_IMAGE =
  'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80';

const infos = [
  {
    icon: MapPin,
    label: '住所',
    value: '富山県中新川郡立山町五郎丸335',
  },
  {
    icon: Car,
    label: 'アクセス（車）',
    value: '立山ICから車で約3km',
  },
  {
    icon: Train,
    label: 'アクセス（電車）',
    value: '富山地方鉄道立山線 稚子塚駅から徒歩約23〜25分',
  },
  {
    icon: ParkingCircle,
    label: '駐車場',
    value: '無料100台（立山連峰を望む好立地）',
  },
  {
    icon: Clock,
    label: '営業時間',
    value: '10:00〜20:00（年中無休）',
  },
  {
    icon: Phone,
    label: 'TEL',
    value: '076-463-6201',
  },
];

export default function LocationInfo() {
  return (
    <section id="location" className="relative bg-sage-50/50 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <p className="font-display text-sm tracking-[0.2em] text-sage-600">
            LOCATION & INFO
          </p>
          <h2 className="font-display mt-3 text-2xl font-medium text-charcoal-800 md:text-3xl lg:text-4xl">
            店舗情報
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <motion.div
            className="overflow-hidden rounded-2xl bg-white shadow-md"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative aspect-video">
              <Image
                src={MAP_IMAGE}
                alt="立山周辺の地図"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/40 to-transparent" />
              <p className="absolute bottom-4 left-4 text-sm font-medium text-white drop-shadow-md">
                立山町五郎丸 · モンベルヴィレッジ立山
              </p>
            </div>
          </motion.div>

          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {infos.map((item, i) => (
              <motion.div
                key={item.label}
                className="flex items-start gap-4 rounded-xl bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ x: 4 }}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sage-100 text-sage-600">
                  <item.icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-sage-600">
                    {item.label}
                  </p>
                  <p className="mt-1 font-medium text-charcoal-800">{item.value}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
