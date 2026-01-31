"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { MapPin, Phone, Clock, Car, AlertTriangle } from "lucide-react";

const InfoAccess = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const gridOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.95, 1]);

  const infoItems = [
    {
      icon: MapPin,
      label: "住所",
      value: "〒939-2251 富山県富山市下大久保2434",
    },
    {
      icon: Phone,
      label: "TEL",
      value: "076-464-5130",
      href: "tel:076-464-5130",
    },
    {
      icon: Clock,
      label: "営業時間",
      value: "13:00 - 25:00 (翌1:00) / 不定休",
    },
    {
      icon: Car,
      label: "アクセス",
      value: "バス停「大久保小学校前」徒歩3分 / 駐車場完備（除雪対応済み）",
    },
  ];

  const notes = [
    "東八尾駅から4.5kmのため車での来店推奨",
    "冬季は足元注意",
  ];

  return (
    <section
      ref={sectionRef}
      id="access"
      className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-[#050510] overflow-hidden"
    >
      {/* Cyberpunk Grid Background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 243, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 243, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      <motion.div
        style={{ scale, opacity: gridOpacity }}
        className="relative max-w-5xl mx-auto"
      >
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-[family-name:var(--font-orbitron)] text-3xl sm:text-4xl md:text-5xl font-bold mb-16 text-center text-[#00f3ff]"
          style={{ textShadow: "0 0 20px rgba(0, 243, 255, 0.3)" }}
        >
          INFO & ACCESS
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6">
          {infoItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.1 + 0.2, duration: 0.5 }}
              className="group"
            >
              <div
                className="h-full p-6 rounded-lg backdrop-blur-md border border-[#00f3ff]/20 bg-white/5 hover:border-[#00f3ff]/50 transition-all duration-300"
                style={{
                  boxShadow: "0 0 30px rgba(0, 243, 255, 0.05)",
                }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="p-2 rounded-lg flex-shrink-0"
                    style={{
                      background: "rgba(0, 243, 255, 0.1)",
                      border: "1px solid rgba(0, 243, 255, 0.3)",
                    }}
                  >
                    <item.icon className="w-6 h-6 text-[#00f3ff]" />
                  </div>
                  <div>
                    <p className="text-[#00f3ff] font-[family-name:var(--font-orbitron)] text-sm mb-1">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-white/90 hover:text-[#00f3ff] transition-colors text-lg"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-white/90 text-lg">{item.value}</p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-8 flex flex-col gap-3"
        >
          {notes.map((note, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-4 rounded-lg border border-[#ffd700]/20 bg-[#ffd700]/5"
            >
              <AlertTriangle className="w-5 h-5 text-[#ffd700] flex-shrink-0" />
              <p className="text-[#ffd700]/90">{note}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default InfoAccess;
