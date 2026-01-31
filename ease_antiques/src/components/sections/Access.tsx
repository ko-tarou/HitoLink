"use client";

import { motion } from "framer-motion";
import { Car, Train, Bus } from "lucide-react";

const accessItems = [
  {
    icon: Car,
    title: "車で",
    text: "北陸道 富山ICより国道41号・3号経由で約10分。",
  },
  {
    icon: Train,
    title: "電車で",
    text: "富山地鉄 藤崎駅より徒歩7〜9分。",
  },
  {
    icon: Bus,
    title: "バスで",
    text: "富山駅発 西隣町停留所より徒歩4分。",
  },
];

export function Access() {
  return (
    <section
      id="access"
      className="relative py-24 md:py-32 px-6 bg-cream"
    >
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="font-serif text-wood-dark text-3xl md:text-4xl font-medium mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          アクセス
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {accessItems.map((item, i) => (
            <motion.div
              key={item.title}
              className="flex flex-col md:items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <item.icon className="w-10 h-10 text-brass-muted mb-3 mx-auto" />
              <h3 className="font-serif text-wood-dark text-lg mb-2">
                {item.title}
              </h3>
              <p className="text-wood-light text-sm leading-relaxed">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
