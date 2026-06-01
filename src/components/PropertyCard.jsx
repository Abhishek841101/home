import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";

export default function PropertyCard({ item }) {
  const navigate = useNavigate();

  const images =
    item.images?.map((img) => img?.url || img) || [
      "https://via.placeholder.com/400x300?text=No+Image",
    ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  // 🔥 MAP OPEN
  const openMap = () => {
    window.open(
      `https://www.google.com/maps/search/${item.location}`,
      "_blank"
    );
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition border border-gray-100 group">

      {/* IMAGE */}
      <div className="relative h-52 overflow-hidden">

        <img
          src={images[index]}
          alt={item.propertyName}
          className="h-52 w-full object-cover group-hover:scale-105 transition duration-500"
        />

        {/* MAP ICON BUTTON */}
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
          {item.propertyType}
        </div>

      </div>

      {/* CONTENT */}
      <div className="p-4">

        <h2 className="text-lg font-bold text-gray-800 line-clamp-1">
          {item.propertyName}
        </h2>

        <p className="text-gray-500 text-sm mt-1">
          📍 {item.location}
        </p>

        <div className="flex justify-between mt-3 text-xs text-gray-500">
          <span>🏠 {item.propertyType}</span>
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