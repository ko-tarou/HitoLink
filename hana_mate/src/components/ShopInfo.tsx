"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Clock, Phone, Printer } from "lucide-react";
import { images } from "@/lib/images";

const container = {
  hidden: { opacity: 0 },
  visible: () => ({
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  }),
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function ShopInfo() {
  return (
    <section id="contact" className="relative">
      {/* Mood image strip */}
      <motion.div
        className="relative h-[35vh] min-h-[240px] overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8 }}
      >
        <Image
          src={images.shop}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-charcoal/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl md:text-6xl font-medium text-cream tracking-tight text-display"
          >
            Shop Information
          </motion.h2>
        </div>
      </motion.div>

      {/* Info block */}
      <div className="py-20 md:py-28 px-6 bg-cream-warm">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={container}
            className="space-y-10"
          >
            <motion.div
              variants={item}
              className="glass rounded-2xl p-8 md:p-12 border border-sage-100/80 space-y-10"
            >
              <div className="flex gap-5">
                <MapPin className="w-5 h-5 text-sage-600 shrink-0 mt-0.5" strokeWidth={1.5} />
                <div>
                  <p className="font-medium text-charcoal mb-2 text-sm uppercase tracking-wider">所在地</p>
                  <p className="text-charcoal-soft text-lg">
                    〒930-0856
                    <br />
                    富山市布瀬町南3丁目6-9
                  </p>
                  <p className="text-sm text-charcoal-muted mt-3">
                    布瀬町南公園近く / 堀川小泉駅・小泉町駅より徒歩約20分
                  </p>
                </div>
              </div>

              <div className="flex gap-5">
                <Clock className="w-5 h-5 text-sage-600 shrink-0 mt-0.5" strokeWidth={1.5} />
                <div>
                  <p className="font-medium text-charcoal mb-2 text-sm uppercase tracking-wider">営業時間</p>
                  <p className="text-charcoal-soft text-lg">
                    10:00 — 18:30
                    <br />
                    <span className="text-sm text-charcoal-muted">1月・2月は 18:00 閉店</span>
                  </p>
                  <p className="font-medium text-charcoal mt-4 mb-2 text-sm uppercase tracking-wider">休業日</p>
                  <p className="text-charcoal-soft">1月1日〜1月3日</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 pt-4">
                <div className="flex gap-5">
                  <Phone className="w-5 h-5 text-sage-600 shrink-0 mt-0.5" strokeWidth={1.5} />
                  <div>
                    <p className="font-medium text-charcoal mb-2 text-sm uppercase tracking-wider">TEL</p>
                    <a
                      href="tel:0764928550"
                      className="text-charcoal-soft text-lg hover:text-sage-600 transition-colors"
                    >
                      076-492-8550
                    </a>
                  </div>
                </div>
                <div className="flex gap-5">
                  <Printer className="w-5 h-5 text-sage-600 shrink-0 mt-0.5" strokeWidth={1.5} />
                  <div>
                    <p className="font-medium text-charcoal mb-2 text-sm uppercase tracking-wider">FAX</p>
                    <span className="text-charcoal-soft text-lg">076-492-8554</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
