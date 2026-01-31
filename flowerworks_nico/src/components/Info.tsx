'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Clock, Phone, Train } from 'lucide-react';

const hours = [
  { days: 'Mon, Tue, Thu, Fri, Sat', time: '10:30 - 18:00' },
  { days: 'Sun', time: '10:30 - 17:00' },
  { days: 'Closed', time: 'Wednesday' },
];

export default function Info() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="info"
      ref={ref}
      className="py-24 sm:py-32 lg:py-40"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 lg:mb-20"
        >
          <span className="text-sage-500 font-sans text-sm tracking-[0.2em] uppercase">
            Visit Us
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal mt-2">
            Information
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-10"
          >
            <div>
              <h3 className="font-serif text-2xl text-charcoal mb-4">
                FLOWERWORKS nico
              </h3>
              <div className="flex items-start gap-4 text-charcoal-light">
                <MapPin className="w-5 h-5 text-sage-500 shrink-0 mt-0.5" />
                <p className="font-sans text-base leading-relaxed">
                  〒939-8205 富山県富山市新根塚町1丁目1−50
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 text-charcoal-light">
              <Train className="w-5 h-5 text-sage-500 shrink-0 mt-0.5" />
              <p className="font-sans text-base leading-relaxed">
                富山地鉄市内電車「広貫堂前」駅から徒歩圏内。静かな住宅街。
              </p>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="w-5 h-5 text-sage-500 shrink-0 mt-0.5" />
              <a
                href="tel:076-422-6811"
                className="font-sans text-charcoal-light hover:text-sage-600 transition-colors text-lg"
              >
                076-422-6811
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="flex items-start gap-4 mb-6">
              <Clock className="w-5 h-5 text-sage-500 shrink-0 mt-0.5" />
              <div className="font-sans text-charcoal-light">
                {hours.map((row, i) => (
                  <div
                    key={i}
                    className="flex justify-between gap-4 py-2 border-b border-sage-100 last:border-0"
                  >
                    <span>{row.days}</span>
                    <span>{row.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
