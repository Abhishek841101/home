import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import aboutBanner from "../assets/About.png";

export default function About() {
  return (
    <div className="bg-white">
      {/* NAVBAR */}
      <Navbar />

      {/* BANNER */}
      <div className="w-full h-[300px] md:h-[400px] relative overflow-hidden">
        <img
          src={aboutBanner}
          alt="About Banner"
          className="w-full h-full object-cover block"
        />

        {/* OVERLAY TEXT */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-white text-3xl md:text-5xl font-bold">
            About Us
          </h1>
        </div>
      </div>

      {/* CONTENT */}
      <div className="px-6 py-10 max-w-6xl mx-auto">
        {/* TAG */}
        <div className="text-blue-600 font-semibold mb-2">#Get to Know</div>

        <h2 className="text-2xl md:text-3xl font-bold mb-8">Our Journey</h2>

        {/* TIMELINE */}
        <div className="space-y-6 border-l-2 border-blue-200 pl-6">
          <div>
            <h3 className="font-bold text-lg">2022</h3>
            <p className="text-gray-600">
              The idea was born to build a single platform where users can
              discover local businesses, services, and trusted providers easily.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg">2023</h3>
            <p className="text-gray-600">
              We started onboarding small businesses, service providers, and
              local vendors to build a verified business network.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg">2024</h3>
            <p className="text-gray-600">
              Launched a multi-category marketplace including services, B2B,
              solar, auto care, and local business listings.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg">2025</h3>
            <p className="text-gray-600">
              Introduced verified listings, lead generation, and improved search
              & discovery features for better user experience.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg">2026</h3>
            <p className="text-gray-600">
              Expanding across India to become a complete digital marketplace
              connecting every local business with customers.
            </p>
          </div>
        </div>

        {/* VALUES */}
        <div className="mt-14">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Our Values</h2>

          <p className="text-gray-600 mb-8 max-w-2xl">
            We aim to build India’s most trusted business discovery platform
            where users can connect with reliable and verified businesses
            effortlessly.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* TRUST */}
            <div className="p-6 border rounded-2xl shadow-sm hover:shadow-md transition">
              <div className="text-3xl mb-2">🤝</div>
              <h3 className="font-bold text-lg mb-2">Trust</h3>
              <p className="text-gray-600 text-sm">
                We ensure only verified and reliable businesses are listed on
                our platform.
              </p>
            </div>

            {/* TRANSPARENCY */}
            <div className="p-6 border rounded-2xl shadow-sm hover:shadow-md transition">
              <div className="text-3xl mb-2">📊</div>
              <h3 className="font-bold text-lg mb-2">Transparency</h3>
              <p className="text-gray-600 text-sm">
                Clear, structured, and honest information for better
                decision-making.
              </p>
            </div>

            {/* ACCESSIBILITY */}
            <div className="p-6 border rounded-2xl shadow-sm hover:shadow-md transition">
              <div className="text-3xl mb-2">🌐</div>
              <h3 className="font-bold text-lg mb-2">Accessibility</h3>
              <p className="text-gray-600 text-sm">
                Making every business discoverable across cities, towns, and
                regions in India.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
