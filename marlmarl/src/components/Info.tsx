"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Clock, Calendar, MessageCircle } from "lucide-react";

export default function Info() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const infoItems = [
    {
      icon: MapPin,
      label: "所在地",
      value: "〒930-0000 富山県富山市上野新町9-14",
      href: null,
    },
    {
      icon: Clock,
      label: "営業時間",
      value: "13:00〜18:00",
      href: null,
    },
    {
      icon: Calendar,
      label: "定休日",
      value: "水曜日定休（土日祝は不定休）",
      href: null,
    },
    {
      icon: MessageCircle,
      label: "ご予約・お問い合わせ",
      value: "LINE公式アカウント",
      href: "#",
    },
  ];

  return (
    <section
      ref={ref}
      id="info"
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-cream-100" />
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-forest-200/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute inset-0 paper-overlay" />

      <div className="relative max-w-4xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="font-serif text-3xl sm:text-4xl text-forest-900 text-center mb-16"
        >
          アクセス & インフォメーション
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="space-y-6"
        >
          {infoItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1 }}
              whileHover={{ x: 8 }}
            >
              <div
                className={`flex flex-col sm:flex-row sm:items-center gap-4 p-6 sm:p-8 rounded-2xl bg-cream-200/60 border border-earth-200/50 ${
                  item.href ? "cursor-pointer hover:border-gold-400/50" : ""
                } transition-colors`}
              >
                <div className="flex items-center gap-4 sm:w-48 flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-forest-200/30 flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-forest-600" strokeWidth={1.5} />
                  </div>
                  <span className="font-medium text-forest-700">{item.label}</span>
                </div>
                <div className="sm:flex-1">
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-forest-800 hover:text-gold-600 font-medium transition-colors inline-flex items-center gap-2"
                    >
                      {item.value}
                      <span className="text-gold-500">→</span>
                    </a>
                  ) : (
                    <p className="text-forest-800">{item.value}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-forest-800 text-cream-100 font-medium hover:bg-forest-700 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            LINEでご予約・お問い合わせ
          </motion.a>
        </motion.div>

        <motion.footer
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="mt-20 pt-12 border-t border-earth-200/50 text-center"
        >
          <p className="font-serif text-2xl text-forest-700 tracking-wider">
            森の雑貨やさん ＊MARL MARL＊
          </p>
          <p className="mt-2 text-earth-500 text-sm">
            富山の小さなお家で出会う、心ときめく雑貨たち
          </p>
        </motion.footer>
      </div>
    </section>
  );
}
