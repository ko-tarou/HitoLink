import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Concept from '@/components/Concept';
import Products from '@/components/Products';
import LocationInfo from '@/components/LocationInfo';
import VillageFacilities from '@/components/VillageFacilities';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Concept />
        <Products />
        <LocationInfo />
        <VillageFacilities />
        <Footer />
      </main>
    </>
  );
}
