import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import { MapPin } from "lucide-react";

export default function RealEstate() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;

  /* FETCH FROM BACKEND */
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch(`${API_URL}/api/properties`);
        const data = await res.json();

        console.log("Response Status:", data);

        if (data.success) {
          setProperties(data.properties);
        } else {
          setError("Failed to load properties");
        }
      } catch (err) {
        console.log(err);
        setError("Server error");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  /* SEARCH FILTER */
  const filtered = properties.filter(
    (p) =>
      (p.propertyName || "").toLowerCase().includes(search.toLowerCase()) ||
      (p.location || "").toLowerCase().includes(search.toLowerCase()) ||
      (p.propertyCategory || "").toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* HEADER */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md shadow-sm px-4 py-4">
        <h1 className="text-xl md:text-2xl font-bold text-center text-gray-800">
          Real Estate Marketplace 🏠
        </h1>

        {/* SEARCH */}
        <div className="mt-3 relative max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Search property, city..."
            className="w-full border border-gray-200 rounded-full pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-pink-500 shadow-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <span className="absolute left-3 top-3.5 text-gray-400">🔍</span>
        </div>
      </div>

      {/* GRID */}
      <div className="flex-1 px-4 py-6">
        {/* LOADING */}
        {loading && <p className="text-center mt-10">Loading properties...</p>}

        {/* ERROR */}
        {error && <p className="text-center text-red-500 mt-10">{error}</p>}

        {/* EMPTY */}
        {!loading && !error && filtered.length === 0 && (
          <div className="text-center mt-16">
            <p className="text-gray-500 text-lg">No properties found 😕</p>
          </div>
        )}

        {/* PROPERTY GRID */}
        {!loading && !error && filtered.length > 0 && (
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {filtered.map((item) => (
              <PropertyCard key={item._id} item={item} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

/* PROPERTY CARD */
function PropertyCard({ item }) {
  const navigate = useNavigate();

  const images = item.images?.map((img) => img?.url || img) || [
    "https://dummyimage.com/400x300/cccccc/000000&text=No+Image",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  /* OPEN GOOGLE MAP */
  const openMap = () => {
    window.open(
      `https://www.google.com/maps/search/${item.location}`,
      "_blank",
    );
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition border border-gray-100 group">
      {/* IMAGE */}
      <div className="relative h-52 overflow-hidden">
       <img
  src={
    images[index]?.startsWith("http")
      ? images[index]
      : `${API_URL}/${images[index]}`
  }
  alt={item.propertyName}
  className="h-52 w-full object-cover group-hover:scale-105 transition duration-500"
/>

        {/* MAP BUTTON */}
        <button
          onClick={openMap}
          className="absolute bottom-3 right-3 bg-white/90 p-2 rounded-full shadow hover:scale-110 transition"
        >
          <MapPin size={18} className="text-pink-600" />
        </button>

        {/* BADGES */}
        <div className="absolute top-3 left-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
          {item.purpose}
        </div>

        <div className="absolute top-3 right-3 bg-pink-500 text-white text-xs px-3 py-1 rounded-full">
          {item.propertyCategory}
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-800 line-clamp-1">
          {item.propertyName}
        </h2>

        <p className="text-gray-500 text-sm mt-1">📍 {item.location}</p>

        <div className="flex justify-between mt-3 text-xs text-gray-500">
          <span>🏠 {item.propertyCategory}</span>
          <span>🏙️ {item.purpose}</span>
        </div>

        <p className="text-xl font-extrabold text-pink-600 mt-3">
          ₹ {item.price}
        </p>

        {item.availableFlats && (
          <p className="text-sm text-gray-500 mt-1">
            🏢 {item.availableFlats} flats available
          </p>
        )}

        {/* BUTTONS */}
        <div className="mt-4 space-y-2">
          <button
            onClick={() => navigate(`/property/${item._id}`)}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2.5 rounded-xl font-semibold transition"
          >
            View Details
          </button>

          <button
            onClick={openMap}
            className="w-full border border-pink-500 text-pink-500 py-2.5 rounded-xl hover:bg-pink-50 transition"
          >
            Open in Map
          </button>
        </div>
      </div>
    </div>
  );
}
