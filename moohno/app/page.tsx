import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Menu } from "@/components/Menu";
import { ShopFurniture } from "@/components/ShopFurniture";
import { InfoAccess } from "@/components/InfoAccess";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <Hero />
      <About />
      <Menu />
      <ShopFurniture />
      <InfoAccess />
      <Footer />
    </main>
  );
}
