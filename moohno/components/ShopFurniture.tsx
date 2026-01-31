"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { Gift, Sofa } from "lucide-react";

export function ShopFurniture() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0.1, 0.35], [0.95, 1]);
  const y = useTransform(scrollYProgress, [0.1, 0.4], [60, 0]);

  return (
    <section id="shop" className="relative py-24 md:py-32" ref={ref}>
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          className="text-center mb-16"
          style={{ y }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="font-display text-accent/90 text-sm tracking-widest uppercase mb-2">
            Zakka & Furniture
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-medium text-darkgray">
            Shop
          </h2>
        </motion.div>

        <motion.div style={{ scale }} className="grid gap-12 lg:grid-cols-2">
          {/* Zakka */}
          <motion.article
            className="overflow-hidden rounded-2xl bg-white shadow-lg"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            data-stalker-hover
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80"
                alt="Handmade zakka, seasonal goods"
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-darkgray/40 to-transparent" />
              <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
                <Gift className="h-6 w-6" />
                <span className="font-display text-lg">Zakka</span>
              </div>
            </div>
            <div className="p-6 md:p-8">
              <h3 className="font-display text-xl text-darkgray mb-3">
                手作り雑貨とギフト
              </h3>
              <p className="text-darkgray/80 leading-relaxed">
                季節の雑貨、ガラスや布製品など、一点一点手作りにこだわったアイテムを販売しています。
                プレゼントのご相談もお気軽にどうぞ。
              </p>
            </div>
          </motion.article>

          {/* Furniture */}
          <motion.article
            className="overflow-hidden rounded-2xl bg-white shadow-lg"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            data-stalker-hover
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80"
                alt="Custom furniture"
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-darkgray/40 to-transparent" />
              <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
                <Sofa className="h-6 w-6" />
                <span className="font-display text-lg">Furniture</span>
              </div>
            </div>
            <div className="p-6 md:p-8">
              <h3 className="font-display text-xl text-darkgray mb-3">
                オーダーメイド家具
              </h3>
              <p className="text-darkgray/80 leading-relaxed">
                店主によるオーダーメイド家具の製作も承っています。
                リーズナブルな価格で、ご希望のサイズやデザインに合わせた一点ものをお作りします。
              </p>
            </div>
          </motion.article>
        </motion.div>
      </div>
    </section>
  );
}
