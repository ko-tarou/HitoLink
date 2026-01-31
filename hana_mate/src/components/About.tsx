"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { images } from "@/lib/images";

const container = {
  hidden: { opacity: 0 },
  visible: () => ({
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  }),
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const facts = [
  { label: "設立", value: "1987年3月3日" },
  { label: "資本金", value: "2,500万円" },
  { label: "代表者", value: "滝澤 正男" },
  { label: "運営", value: "富山テレビ事業株式会社" },
];

export default function About() {
  return (
    <section id="about" className="relative py-0">
      {/* Full-width flower image with parallax feel */}
      <motion.div
        className="relative h-[50vh] min-h-[320px] md:min-h-[420px] overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={container}
      >
        <motion.div
          variants={item}
          className="absolute inset-0"
        >
          <Image
            src={images.about}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-charcoal/30" />
        </motion.div>
        <motion.div
          variants={item}
          className="absolute inset-0 flex items-end justify-center md:justify-start md:pl-12 lg:pl-24 pb-12 md:pb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-medium text-cream tracking-tight text-display drop-shadow-lg">
            About
          </h2>
        </motion.div>
      </motion.div>

      {/* Text block */}
      <div className="py-20 md:py-28 px-6 bg-cream-warm">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={container}
            className="space-y-12"
          >
            <motion.p
              variants={item}
              className="text-lg md:text-xl text-charcoal-soft leading-relaxed max-w-2xl"
            >
              花メイトは
              <strong className="font-medium text-charcoal"> 富山テレビ事業株式会社 </strong>
              が運営するフラワー部門として、花と緑の総合サービスを提供しています。
            </motion.p>
            <motion.div
              variants={item}
              className="glass rounded-2xl p-8 md:p-10 border border-sage-100/80"
            >
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-8" role="list">
                {facts.map(({ label, value }) => (
                  <motion.li
                    key={label}
                    variants={item}
                    className="flex flex-col gap-2"
                  >
                    <span className="text-xs font-medium text-sage-600 uppercase tracking-[0.2em]">
                      {label}
                    </span>
                    <span className="text-charcoal font-medium text-lg">{value}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.p
              variants={item}
              className="text-charcoal-muted leading-relaxed text-lg"
            >
              富山テレビのフラワーネットワークの一員として、ブライダル、慶弔、日常の贈り物からお庭づくりまで、花と緑に関わるあらゆるご要望にお応えします。
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
