"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Car } from "lucide-react";
import { useState } from "react";

const stores = [
  {
    id: "antiques",
    name: "EASE ANTIQUES",
    label: "本店",
    address: "〒930-0804 富山県富山市西隣町5-1",
    tel: "076-492-9818",
    hours: "12:00〜19:00（木曜定休）",
    parking: "駐車場あり",
  },
  {
    id: "life",
    name: "EASE LIFE",
    label: "姉妹店",
    address: "〒930-0922 富山県富山市清水町6-4-18",
    tel: "076-421-1970",
    hours: "—",
    parking: null,
  },
];

export function Stores() {
  const [active, setActive] = useState<"antiques" | "life">("antiques");
  const current = stores.find((s) => s.id === active)!;

  return (
    <section
      id="stores"
      className="relative py-24 md:py-32 px-6 bg-wood-dark text-cream"
    >
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="font-serif text-cream text-3xl md:text-4xl font-medium mb-10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          店舗情報
        </motion.h2>

        {/* Tabs */}
        <motion.div
          className="flex gap-0 border-b border-cream/20 mb-8"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {stores.map((store) => (
            <button
              key={store.id}
              onClick={() => setActive(store.id as "antiques" | "life")}
              className={`px-6 py-3 font-serif text-sm tracking-wide transition-colors ${
                active === store.id
                  ? "text-brass border-b-2 border-brass -mb-px"
                  : "text-cream/70 hover:text-cream"
              }`}
            >
              {store.name}
            </button>
          ))}
        </motion.div>

        <motion.div
          key={active}
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          <p className="text-brass/90 text-sm uppercase tracking-widest">
            {current.label}
          </p>
          <div className="flex items-start gap-3 text-cream/95">
            <MapPin className="w-5 h-5 shrink-0 mt-0.5 text-brass/80" />
            <span>{current.address}</span>
          </div>
          <div className="flex items-center gap-3 text-cream/95">
            <Phone className="w-5 h-5 shrink-0 text-brass/80" />
            <a href={`tel:${current.tel.replace(/-/g, "")}`} className="hover:text-brass transition-colors">
              {current.tel}
            </a>
          </div>
          <div className="flex items-center gap-3 text-cream/95">
            <Clock className="w-5 h-5 shrink-0 text-brass/80" />
            <span>{current.hours}</span>
          </div>
          {current.parking && (
            <div className="flex items-center gap-3 text-cream/95">
              <Car className="w-5 h-5 shrink-0 text-brass/80" />
              <span>{current.parking}</span>
            </div>
          )}
        </motion.div>

        <motion.p
          className="mt-8 text-cream/70 text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          両店とも車で約3分。スタッフによるご相談も承っております。
        </motion.p>
      </div>
    </section>
  );
}
