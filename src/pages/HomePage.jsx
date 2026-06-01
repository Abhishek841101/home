import Hero from "./Hero";
import OverlapCards from "./OverlapCards";

export default function HomePage() {
  return (
    <div className="w-full min-h-screen bg-white">

      {/* 1. HERO SECTION */}
      <Hero />

      {/* 2. OVERLAP CARDS SECTION */}
      <OverlapCards />

    </div>
  );
}