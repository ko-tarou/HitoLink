"use client";

import MouseStalker from "@/components/MouseStalker";
import Hero from "@/components/Hero";
import About from "@/components/About";
import ProductGrid from "@/components/ProductGrid";
import InfoAccess from "@/components/InfoAccess";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <MouseStalker />
      <main className="min-h-screen">
        <Hero />
        <About />
        <ProductGrid />
        <InfoAccess />
        <Footer />
      </main>
    </>
  );
}
