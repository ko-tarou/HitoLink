"use client";

import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Car,
  Train,
  Bus,
  CalendarX,
} from "lucide-react";

const info = [
  {
    icon: MapPin,
    label: "住所",
    value: "〒930-0036 富山県富山市清水町6-4-18",
    href: "https://maps.google.com/?q=富山県富山市清水町6-4-18",
  },
  {
    icon: Phone,
    label: "電話",
    value: "076-421-1970",
    href: "tel:076-421-1970",
  },
  {
    icon: Mail,
    label: "メール",
    value: "life@ease-antiques.com",
    href: "mailto:life@ease-antiques.com",
  },
  {
    icon: Clock,
    label: "営業時間",
    value: "12:00〜19:00",
  },
  {
    icon: CalendarX,
    label: "定休日",
    value: "毎週木曜日",
  },
];

const access = [
  {
    icon: Car,
    title: "車",
    text: "富山ICより国道41号線→星井町右折→雄山町左折→清水町6丁目左折すぐ。駐車場あり。",
  },
  {
    icon: Train,
    title: "電車",
    text: "富山地方鉄道本線「不二越駅」徒歩9分。",
  },
  {
    icon: Bus,
    title: "バス",
    text: "地鉄バス「清水町」停留所 徒歩3分。",
  },
];

export function ShopInfo() {
  return (
    <section className="relative bg-[var(--cream)] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          {/* Map placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-[var(--brown-dark)]/10">
              <iframe
                title="Ease Life location"
                src="https://www.google.com/maps?q=富山県富山市清水町6-4-18&output=embed"
                className="absolute inset-0 h-full w-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute inset-0 border-4 border-[var(--brown-dark)]/10" />
            </div>
          </motion.div>

          {/* Info + Access */}
          <div className="lg:col-span-2 space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="font-display text-sm tracking-[0.3em] text-[var(--brass)]">
                SHOP INFO
              </span>
              <h2 className="font-display-jp mt-4 text-2xl font-semibold text-[var(--brown-dark)] md:text-3xl">
                店舗情報
              </h2>
              <ul className="mt-6 space-y-4">
                {info.map((row) => (
                  <li key={row.label} className="flex gap-4">
                    <row.icon className="mt-0.5 h-5 w-5 shrink-0 text-[var(--brass)]" />
                    <div>
                      <span className="text-xs text-[var(--brown)]/70 font-display-jp">
                        {row.label}
                      </span>
                      {row.href ? (
                        <a
                          href={row.href}
                          target={row.href.startsWith("http") ? "_blank" : undefined}
                          rel={row.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="mt-0.5 block text-[var(--brown-dark)] hover:text-[var(--brass)] transition-colors"
                        >
                          {row.value}
                        </a>
                      ) : (
                        <p className="mt-0.5 text-[var(--brown-dark)]">{row.value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="font-display text-sm tracking-[0.3em] text-[var(--brass)]">
                ACCESS
              </span>
              <h3 className="font-display-jp mt-4 text-xl font-semibold text-[var(--brown-dark)]">
                アクセス
              </h3>
              <ul className="mt-4 space-y-4">
                {access.map((a) => (
                  <li key={a.title} className="flex gap-4">
                    <a.icon className="mt-0.5 h-5 w-5 shrink-0 text-[var(--green)]" />
                    <div>
                      <span className="font-display-jp font-medium text-[var(--brown-dark)]">
                        {a.title}
                      </span>
                      <p className="mt-1 text-sm text-[var(--brown)]/90 font-display-jp">
                        {a.text}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
