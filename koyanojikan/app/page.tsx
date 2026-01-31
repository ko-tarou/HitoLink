import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Concept from "@/components/Concept";
import ProductShowcase from "@/components/ProductShowcase";
import CoreCabin from "@/components/CoreCabin";
import ShopInfo from "@/components/ShopInfo";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Concept />
      <ProductShowcase />
      <CoreCabin />
      <ShopInfo />
      <Footer />
    </main>
  );
}
