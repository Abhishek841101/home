import { useState } from "react";
import Footer from "../components/Footer";

export default function Repairs() {
  const [search, setSearch] = useState("");

  const services = [
    {
      name: "AC Repair Service",
      desc: "Cooling issue, gas refill, servicing & installation",
      image:
        "https://images.unsplash.com/photo-1581579185169-9d3f9c6f8c1f?auto=format&fit=crop&w=800&q=60",
      location: "Chennai",
      price: "₹299 onwards",
      time: "30-60 mins",
      rating: 4.7,
      verified: true,
      tag: "Fast",
      category: "AC",
    },
    {
      name: "Mobile Repair Expert",
      desc: "Screen, battery & software repair at home",
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=60",
      location: "Bangalore",
      price: "₹199 onwards",
      time: "1-2 Hours",
      rating: 4.6,
      verified: true,
      tag: "Budget",
      category: "Mobile",
    },
    {
      name: "Electrician Service",
      desc: "Wiring, switches, fan & home electrical repair",
      image:
        "https://images.unsplash.com/photo-1581091215367-59ab6c7a5f38?auto=format&fit=crop&w=800&q=60",
      location: "Delhi",
      price: "₹150 onwards",
      time: "20-40 mins",
      rating: 4.5,
      verified: true,
      tag: "Emergency",
      category: "Electrician",
    },
    {
      name: "Plumber Service",
      desc: "Leak fixing, pipe installation & bathroom repair",
      image:
        "https://images.unsplash.com/photo-1600566752225-3f2b5f7a5c29?auto=format&fit=crop&w=800&q=60",
      location: "Mumbai",
      price: "₹200 onwards",
      time: "30-90 mins",
      rating: 4.4,
      verified: false,
      tag: "Fast",
      category: "Plumbing",
    },
    {
      name: "Home Cleaning Service",
      desc: "Deep cleaning for house, kitchen & bathroom",
      image:
        "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=60",
      location: "Pune",
      price: "₹499 onwards",
      time: "2-3 Hours",
      rating: 4.8,
      verified: true,
      tag: "Premium",
      category: "Cleaning",
    },
  ];

  const filtered = services.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.location.toLowerCase().includes(search.toLowerCase()) ||
      s.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      {/* HEADER */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md shadow-sm px-4 py-4">

        <h1 className="text-xl md:text-2xl font-bold text-center text-gray-800">
          Repairs & Home Services 🔧
        </h1>

        {/* SEARCH */}
        <div className="mt-3 relative max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Search AC, plumber, electrician..."
            className="w-full border border-gray-200 rounded-full pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-red-500 shadow-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="absolute left-3 top-3.5 text-gray-400">🔍</span>
        </div>
      </div>

      {/* GRID */}
      <div className="flex-1 px-4 py-6">

        {filtered.length === 0 ? (
          <div className="text-center mt-16">
            <p className="text-gray-500 text-lg">No services found 😕</p>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

            {filtered.map((s, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
              >

                {/* IMAGE */}
                <div className="relative">
                  <img
                    src={s.image}
                    className="h-44 w-full object-cover"
                  />

                  <span className="absolute top-2 right-2 bg-white text-yellow-600 text-xs px-2 py-1 rounded-full">
                    ⭐ {s.rating}
                  </span>

                  <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                    {s.tag}
                  </span>
                </div>

                {/* CONTENT */}
                <div className="p-4">

                  {s.verified && (
                    <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">
                      ✔ Verified
                    </span>
                  )}

                  <h2 className="font-bold mt-2 text-gray-800">
                    {s.name}
                  </h2>

                  <p className="text-sm text-gray-500">
                    📍 {s.location}
                  </p>

                  <p className="text-sm text-gray-600 mt-1">
                    🛠 {s.category}
                  </p>

                  <p className="text-green-600 font-bold mt-1">
                    💰 {s.price}
                  </p>

                  <p className="text-xs text-gray-400">
                    ⏱ {s.time}
                  </p>

                  <button className="mt-3 w-full bg-gradient-to-r from-red-600 to-red-500 text-white py-2 rounded-xl hover:opacity-90 transition">
                    Book Service
                  </button>

                </div>
              </div>
            ))}

          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}