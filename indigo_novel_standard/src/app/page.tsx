import Hero from "@/components/Hero";
import About from "@/components/About";
import BrandMarquee from "@/components/BrandMarquee";
import NewArrival from "@/components/NewArrival";
import Collection from "@/components/Collection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <BrandMarquee />
      <NewArrival />
      <Collection />
      <Footer />
    </main>
  );
}
