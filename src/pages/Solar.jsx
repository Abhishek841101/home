import { useEffect, useState } from "react";
import Footer from "../components/Footer";

export default function Solar() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSolar = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL;
const res = await fetch(`${API_URL}/api/solar`);
const data = await res.json();
        // const res = await fetch("http://localhost:5000/api/solar");
        // const data = await res.json();

        if (data.success) {
          setVendors(data.solarList);
        } else {
          setError("Failed to load data");
        }
      } catch (err) {
        setError("Server error");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSolar();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* HEADER */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md shadow-sm px-4 py-4">
        <h1 className="text-xl md:text-2xl font-bold text-center text-gray-800">
          Solar Energy Vendors ☀️
        </h1>
      </div>

      {/* GRID */}
      <div className="flex-1 px-4 py-10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* LOADING */}
          {loading && (
            <p className="text-center col-span-2">Loading vendors...</p>
          )}

          {/* ERROR */}
          {error && (
            <p className="text-center text-red-500 col-span-2">{error}</p>
          )}

          {/* DATA */}
          {!loading &&
            !error &&
            vendors.map((v) => (
              <div
                key={v._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
              >
                {/* IMAGE */}
                <img
                  // 
                  src={
  v.image
    ? `${import.meta.env.VITE_API_URL}/${v.image}`
    : "https://via.placeholder.com/400"
}
                  className="h-52 w-full object-cover"
                  alt="solar"
                />

                {/* CONTENT */}
                <div className="p-5">
                  <h2 className="font-bold text-lg text-gray-800">
                    📍 {v.location}
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">📞 {v.phone}</p>

                  <p className="text-sm text-gray-600 mt-2">
                    ⚡ {v.watt} Watt System
                  </p>

                  <p className="text-sm text-gray-600">
                    🛡️ Warranty: {v.warranty} years
                  </p>

                  {/* ✅ WHATSAPP BUTTON (JUSTDIAL STYLE) */}
                  <a
                    href={`https://wa.me/${v.phone}?text=Hi, I am interested in your solar services`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 block text-center w-full bg-green-500 text-white py-2 rounded-xl hover:bg-green-600 transition"
                  >
                    💬 Chat on WhatsApp
                  </a>
                </div>
              </div>
            ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
