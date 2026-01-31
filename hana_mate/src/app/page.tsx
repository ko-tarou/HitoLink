"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import ShopInfo from "@/components/ShopInfo";
import Footer from "@/components/Footer";
import { images } from "@/lib/images";

function ParallaxDivider() {
  const { scrollYProgress } = useScroll({
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [80, -60, 80]);
  const opacity = useTransform(scrollYProgress, [0.2, 0.45, 0.7, 0.9], [0.25, 0.9, 0.9, 0.25]);
  const scale = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0.98, 1.06, 0.98]);

  return (
    <section className="relative h-[50vh] min-h-[320px] flex items-center justify-center overflow-hidden bg-charcoal">
      <motion.div
        style={{ y, opacity, scale }}
        className="absolute inset-0"
      >
        <Image
          src={images.parallax}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-charcoal/50" />
      </motion.div>
      <motion.div
        style={{ opacity }}
        className="relative z-10 text-cream/90 text-[clamp(5rem,18vw,12rem)] font-light tracking-tighter select-none"
      >
        花
      </motion.div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <ParallaxDivider />
      <About />
      <Services />
      <Gallery />
      <ShopInfo />
      <Footer />
    </main>
  );
}
