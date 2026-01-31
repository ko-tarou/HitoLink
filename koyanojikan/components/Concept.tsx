"use client";

import { motion } from "framer-motion";

const line1 = "大切な人との時間を生むモノを。";
const line2 =
  "木の小屋『Core Cabin』を基点に、趣味部屋や仕事スペースとしての活用を提案。家具選びから暮らしのイメージを膨らませるサポートをします。";

export default function Concept() {
  return (
    <section
      id="concept"
      className="relative overflow-hidden bg-earth-100 py-24 texture-wood sm:py-32"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            visible: { transition: { staggerChildren: 0.12 } },
            hidden: {},
          }}
          className="space-y-12 text-center"
        >
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-serif text-2xl leading-relaxed text-earth-800 sm:text-3xl md:text-4xl"
          >
            {line1}
          </motion.p>
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mx-auto max-w-2xl text-base leading-loose text-earth-700 sm:text-lg"
          >
            {line2}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
