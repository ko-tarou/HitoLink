"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 0.3], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  const images = [
    { src: "https://placehold.co/300x200/1a1a1a/00f3ff", alt: "店内イメージ1", rotate: -6 },
    { src: "https://placehold.co/300x200/1a1a1a/ff00ff", alt: "店内イメージ2", rotate: 4 },
    { src: "https://placehold.co/300x200/1a1a1a/ffd700", alt: "商品イメージ", rotate: -3 },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-[#050510] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          style={{ y, opacity }}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <motion.h2
              variants={itemVariants}
              className="font-[family-name:var(--font-orbitron)] text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-[#00f3ff]"
              style={{
                textShadow: "0 0 20px rgba(0, 243, 255, 0.3)",
              }}
            >
              CONCEPT
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl leading-relaxed text-white/90 mb-6"
            >
              2012年創業。富山県富山市下大久保にある、深夜25時まで営業するアメリカンスタイルの輸入雑貨店。
            </motion.p>
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl leading-relaxed text-white/80"
            >
              オーナーがセレクトしたユニークなインポートグッズ、ガレージ雑貨、アメコミアイテムが所狭しと並ぶ、散策するだけでも楽しい大人の遊び場。
            </motion.p>
          </div>

          {/* Polaroid Style Images */}
          <motion.div
            variants={itemVariants}
            className="order-1 lg:order-2 relative h-[400px] md:h-[500px]"
          >
            {images.map((img, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: i === 0 ? "0%" : i === 1 ? "35%" : "15%",
                  top: i === 0 ? "0%" : i === 1 ? "20%" : "45%",
                  transform: `rotate(${img.rotate}deg)`,
                }}
                whileHover={{
                  scale: 1.05,
                  rotate: 0,
                  zIndex: 10,
                  transition: { duration: 0.3 },
                }}
              >
                <div
                  className="bg-white/10 backdrop-blur-md p-4 shadow-2xl"
                  style={{
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <div className="bg-[#1a1a1a] overflow-hidden">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={300}
                      height={200}
                      className="object-cover w-full h-auto"
                      unoptimized
                    />
                  </div>
                  <p className="text-center text-white/60 text-sm mt-2 font-[family-name:var(--font-orbitron)]">
                    {img.alt}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
