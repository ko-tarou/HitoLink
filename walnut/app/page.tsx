import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Features } from '@/components/Features';
import { ShopInfo } from '@/components/ShopInfo';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Features />
      <ShopInfo />
      <Footer />
    </>
  );
}
