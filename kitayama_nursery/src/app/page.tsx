import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Stats } from '@/components/Stats';
import { LocationCards } from '@/components/LocationCards';
import { ProductsGallery } from '@/components/ProductsGallery';
import { OnlineStore } from '@/components/OnlineStore';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Stats />
      <LocationCards />
      <ProductsGallery />
      <OnlineStore />
      <Footer />
    </main>
  );
}
