"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Instagram } from "lucide-react";

const shops = [
  {
    name: "富山本店",
    address: "富山県富山市東中野3-10-20",
    tel: "076-413-7988",
    hours: "11:00〜17:00",
    closed: "定休日: 第3日曜日",
  },
  {
    name: "長野店",
    address: "長野県長野市稲葉母袋748",
    tel: "080-8019-9496",
    hours: "11:00〜17:00",
    closed: "水曜定休",
  },
  {
    name: "イオンモール須坂店",
    address: "詳細はInstagramでご確認ください",
    tel: null,
    hours: "不定休",
    closed: null,
  },
];

export default function ShopInfo() {
  return (
    <section id="shop" className="bg-earth-100 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center font-serif text-3xl font-light text-earth-800 sm:text-4xl"
        >
          店舗情報
        </motion.h2>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {shops.map((shop, i) => (
            <motion.div
              key={shop.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl bg-white/80 p-6 shadow-md backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-earth-200/40 sm:p-8"
            >
              <h3 className="mb-4 font-serif text-xl text-forest-600 sm:text-2xl">
                {shop.name}
              </h3>
              <ul className="space-y-3 text-sm text-earth-700 sm:text-base">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-earth-500" />
                  <span>{shop.address}</span>
                </li>
                {shop.tel && (
                  <li className="flex items-center gap-3">
                    <Phone className="h-5 w-5 shrink-0 text-earth-500" />
                    <a
                      href={`tel:${shop.tel.replace(/-/g, "")}`}
                      className="transition hover:text-forest-600"
                    >
                      {shop.tel}
                    </a>
                  </li>
                )}
                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-earth-500" />
                  <span>{shop.hours}</span>
                </li>
                {shop.closed && (
                  <li className="text-earth-600">{shop.closed}</li>
                )}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="mb-6 text-sm text-earth-600 sm:text-base">
            最新情報は公式Instagramをご確認ください
          </p>
          <motion.a
            href="https://www.instagram.com/koyanojikan"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-forest-600 px-8 py-4 text-white shadow-lg shadow-forest-600/30 transition-all duration-300 hover:bg-forest-700 hover:shadow-xl hover:shadow-forest-700/40 hover:scale-[1.02]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Instagram className="h-6 w-6" />
            <span className="font-medium">@koyanojikan</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
