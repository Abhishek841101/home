import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import OverlapCards from "../components/OverlapCards";
import Testimonials from "../components/Testimonials"; // ✅ ADD
import Footer from "../components/Footer";
import PricingSection from "../components/PricingSection";
import PopularSection from "../components/PopularSection";
import ServiceGrid from "../components/ServiceGrid";
export default function LandingPage() {
  return (
    <div className="bg-gradient-to-br from-pink-50 via-white to-pink-100">
      {/* NAVBAR */}
      <Navbar />

      {/* HERO */}
      {/* <Hero /> */}

      {/* FEATURE CARDS */}
      {/* <OverlapCards /> */}
      <ServiceGrid />
      <PopularSection />

      {/* 🔥 TESTIMONIALS */}
      <Testimonials />

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
