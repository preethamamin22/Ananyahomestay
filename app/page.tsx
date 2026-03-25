import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Rooms from "@/components/Rooms";
import Booking from "@/components/Booking";
import Gallery from "@/components/Gallery";
import Attractions from "@/components/Attractions";
import Blog from "@/components/Blog";
import Reviews from "@/components/Reviews";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Rooms />
      <Booking />
      <Gallery />
      <Attractions />
      <Blog />
      <Reviews />
      <FAQ />
      <Contact />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
