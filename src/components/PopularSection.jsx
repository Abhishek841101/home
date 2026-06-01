import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export default function PopularSection() {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const [popular, setPopular] = useState([]);
  const [showAll, setShowAll] = useState(false);

  /* =========================
     FETCH POPULAR PRODUCTS
  ========================== */
  useEffect(() => {
    const fetchPopularProducts = async () => {
      try {
        const res = await fetch(
          `${API_URL}/api/popularproduct`
        );

        const data = await res.json();

        console.log("POPULAR API RESPONSE:", data);

        if (data.success) {
          setPopular(data.popularProducts || []);
        }
      } catch (err) {
        console.error("POPULAR FETCH ERROR:", err);
      }
    };

    fetchPopularProducts();
  }, []);

  /* =========================
     AUTO SCROLL MOBILE
  ========================== */
  useEffect(() => {
    const container = scrollRef.current;

    if (!container || popular.length === 0) return;

    let pos = 0;

    const interval = setInterval(() => {
      pos += 1;

      container.scrollTo({
        left: pos,
        behavior: "smooth",
      });

      if (
        pos >=
        container.scrollWidth - container.clientWidth
      ) {
        pos = 0;
      }
    }, 25);

    return () => clearInterval(interval);
  }, [popular]);

  const ads = [
    {
      title: "🚗 Car Repair Services",
      desc: "Trusted mechanics, denting, painting & vehicle servicing",
      image:
        "https://images.unsplash.com/photo-1487754180451-c456f719a1fc",
      btn: "Book Repair",
      route: "/repairs",
    },
    {
      title: "🧼 Car Washing & Detailing",
      desc: "Foam wash, interior cleaning & premium car detailing",
      image:
        "https://images.unsplash.com/photo-1607861716497-e65ab29fc7ac",
      btn: "Wash My Car",
      route: "/repairs",
    },
    {
      title: "☀️ Solar Panel Services",
      desc: "Residential & commercial solar installation",
      image:
        "https://images.unsplash.com/photo-1509391366360-2e959784a276",
      btn: "Explore Solar",
      route: "/solar",
    },
    {
      title: "🏭 B2B Business Services",
      desc: "Connect with suppliers & wholesalers",
      image:
        "https://images.unsplash.com/photo-1556742393-d75f468bfcb0",
      btn: "Start Business",
      route: "/b2b",
    },
    {
      title: "🏡 Real Estate Listings",
      desc: "Buy, sell & rent properties",
      image:
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
      btn: "View Properties",
      route: "/real-estate",
    },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % ads.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const ad = ads[index];

  const displayedItems = showAll
    ? popular
    : popular.slice(0, 4);

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">
          Popular Near You 🔥
        </h2>

        <button
          onClick={() => setShowAll(!showAll)}
          className="text-pink-600 font-semibold text-sm hover:underline"
        >
          {showAll ? "Show Less ↑" : "View All →"}
        </button>
      </div>

      {/* MOBILE */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto md:hidden pb-2 no-scrollbar"
      >
        {displayedItems.map((item) => (
          <div
            key={item._id}
            className="min-w-[85%] bg-white rounded-2xl shadow-md overflow-hidden"
          >
            <img
              src={
                item.image
                  ? `${API_URL}/${item.image}`
                  : "https://via.placeholder.com/400"
              }
              alt={item.name}
              className="h-44 w-full object-cover"
            />

            <div className="p-3">
              <h3 className="font-semibold">
                {item.name}
              </h3>

              <p className="text-xs text-gray-500 mt-1">
                📍 {item.location}
              </p>

              {item.phone ? (
                <a
                  href={`https://wa.me/${String(
                    item.phone
                  ).replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 block text-center w-full bg-green-500 text-white py-2 rounded-xl"
                >
                  💬 Chat on WhatsApp
                </a>
              ) : (
                <button
                  disabled
                  className="mt-3 w-full bg-gray-300 text-gray-600 py-2 rounded-xl"
                >
                  No Contact Available
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* DESKTOP */}
      <div className="hidden md:grid grid-cols-4 gap-6">
        {displayedItems.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-2xl shadow hover:shadow-xl overflow-hidden"
          >
            <img
              src={
                item.image
                  ? `${API_URL}/${item.image}`
                  : "https://via.placeholder.com/400"
              }
              alt={item.name}
              className="h-48 w-full object-cover"
            />

            <div className="p-4">
              <h3 className="font-semibold">
                {item.name}
              </h3>

              <p className="text-xs text-gray-500 mt-1">
                📍 {item.location}
              </p>

              {item.phone ? (
                <a
                  href={`https://wa.me/${String(
                    item.phone
                  ).replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 block text-center w-full bg-green-500 text-white py-2 rounded-xl"
                >
                  💬 Chat on WhatsApp
                </a>
              ) : (
                <button
                  disabled
                  className="mt-3 w-full bg-gray-300 text-gray-600 py-2 rounded-xl"
                >
                  No Contact Available
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}