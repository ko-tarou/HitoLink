"use client";

import { Header } from "@/components/Header";
import { Hero } from "@/components/sections/Hero";
import { Concept } from "@/components/sections/Concept";
import { Stores } from "@/components/sections/Stores";
import { Products } from "@/components/sections/Products";
import { Access } from "@/components/sections/Access";
import { Footer } from "@/components/sections/Footer";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.25], ["0%", "15%"]);

  return (
    <>
      <Header />
      <main>
        <motion.div style={{ y: heroY }}>
          <Hero />
        </motion.div>
        <Concept />
        <Stores />
        <Products />
        <Access />
        <Footer />
      </main>
    </>
  );
}
