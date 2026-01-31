import { Hero } from "@/components/Hero";
import { Concept } from "@/components/Concept";
import { Collection } from "@/components/Collection";
import { ShopInfo } from "@/components/ShopInfo";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Hero />
      <Concept />
      <Collection />
      <ShopInfo />
      <Footer />
    </main>
  );
}
