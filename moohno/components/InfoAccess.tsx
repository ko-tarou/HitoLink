"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, Phone, Calendar } from "lucide-react";

const info = [
  {
    icon: MapPin,
    label: "住所",
    value: "富山県富山市秋吉154-9",
    sub: "ニトリ富山店裏手、専用駐車場あり",
  },
  {
    icon: Clock,
    label: "営業時間",
    value: "11:00～18:00 (L.O. 17:30)",
  },
  {
    icon: Calendar,
    label: "定休日",
    value: "なし（臨時休業あり）",
  },
  {
    icon: Phone,
    label: "電話",
    value: "076-413-5003",
    href: "tel:076-413-5003",
  },
];

export function InfoAccess() {
  return (
    <section id="access" className="relative bg-darkgray py-24 md:py-32 text-offwhite">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="font-display text-accent/90 text-sm tracking-widest uppercase mb-2">
            Info & Access
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-medium">
            店舗情報・アクセス
          </h2>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-5 lg:gap-12">
          <motion.div
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {info.map((item, i) => (
              <motion.div
                key={item.label}
                className="flex gap-4 items-start"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <item.icon className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <p className="text-offwhite/70 text-sm">{item.label}</p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-offwhite hover:text-accent transition-colors text-lg"
                      data-stalker-hover
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-offwhite text-lg">{item.value}</p>
                  )}
                  {item.sub && (
                    <p className="text-offwhite/70 text-sm mt-1">{item.sub}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="lg:col-span-3 aspect-[4/3] min-h-[280px] rounded-xl overflow-hidden bg-darkgray/80 flex items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {/* Google Map 埋め込み用プレースホルダー - 実際の埋め込みコードに差し替えてください */}
            <a
              href="https://www.google.com/maps/search/?api=1&query=富山県富山市秋吉154-9"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center gap-3 w-full h-full text-offwhite/80 hover:text-accent transition-colors border-2 border-dashed border-offwhite/30 rounded-xl m-4"
              data-stalker-hover
            >
              <MapPin className="h-12 w-12" />
              <span className="font-display text-lg">Google Map で開く</span>
              <span className="text-sm">富山県富山市秋吉154-9</span>
            </a>
          </motion.div>
        </div>

        {/* Duck decoration */}
        <motion.div
          className="flex justify-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <svg
            width="48"
            height="36"
            viewBox="0 0 64 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="opacity-60"
          >
            <ellipse cx="32" cy="28" rx="18" ry="14" fill="#F4D03F" />
            <ellipse cx="32" cy="32" rx="12" ry="8" fill="#F9E79F" />
            <circle cx="50" cy="20" r="12" fill="#F4D03F" />
            <path d="M58 20 L68 18 L68 22 L58 20 Z" fill="#E67E22" />
            <circle cx="54" cy="18" r="3" fill="#333" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
