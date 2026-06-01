import { useState, useEffect, useRef } from "react";

const properties = [
  {
    id: 1,
    name: "Rudraksh Residency",
    type: "New Flat",
    price: "₹55 Lac",
    oldPrice: "₹60 Lac",
    likes: 120,
    img: "https://source.unsplash.com/400x300/?apartment",
  },
  {
    id: 2,
    name: "Tattva Heights",
    type: "New Flat",
    price: "₹75 Lac",
    oldPrice: "₹80 Lac",
    likes: 98,
    img: "https://source.unsplash.com/400x300/?building",
  },
  {
    id: 3,
    name: "Galaxy Mansion-18",
    type: "New Flat",
    price: "₹65 Lac",
    oldPrice: "₹70 Lac",
    likes: 150,
    img: "https://source.unsplash.com/400x300/?realestate",
  },
  {
    id: 4,
    name: "Skyline Towers",
    type: "Luxury Flat",
    price: "₹1.2 Cr",
    oldPrice: "",
    likes: 210,
    img: "https://source.unsplash.com/400x300/?tower",
  },
];

export default function SimilarProperties() {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef();

  // Auto scroll + center zoom logic
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % properties.length);

      if (scrollRef.current) {
        scrollRef.current.scrollBy({
          left: 320,
          behavior: "smooth",
        });
      }
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-white py-12 overflow-hidden">
      
      {/* TITLE */}
      <h2 className="text-3xl font-bold text-center mb-10">
        Similar Properties
      </h2>

      {/* CAROUSEL */}
      <div
        ref={scrollRef}
        className="flex gap-6 px-6 overflow-x-auto no-scrollbar"
      >
        {properties.map((p, index) => {
          const isActive = index === activeIndex;

          return (
            <div
              key={p.id}
              onClick={() => setSelectedProperty(p)}
              className={`min-w-[300px] bg-white rounded-xl border 
              border-blue-200 shadow-sm transition duration-500 cursor-pointer
              ${isActive ? "scale-105 shadow-xl" : "scale-95 opacity-80"}`}
            >
              
              {/* IMAGE */}
              <div className="relative">
                <img
                  src={p.img}
                  alt={p.name}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
                <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded text-xs shadow">
                  Logo
                </div>
              </div>

              {/* DETAILS */}
              <div className="p-4">
                <h3 className="font-semibold text-lg">{p.name}</h3>
                <p className="text-gray-500 text-sm">{p.type}</p>

                <div className="flex items-center gap-2 mt-2">
                  <span className="text-blue-600 font-bold">{p.price}</span>
                  {p.oldPrice && (
                    <span className="line-through text-gray-400 text-sm">
                      {p.oldPrice}
                    </span>
                  )}
                </div>

                <div className="flex justify-between items-center mt-3">
                  <span className="text-sm">❤️ {p.likes}</span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProperty(p);
                    }}
                    className="bg-purple-600 text-white px-4 py-1 rounded-lg text-sm hover:bg-purple-700"
                  >
                    Show Details
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL */}
      {selectedProperty && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          
          <div className="bg-white w-[90%] md:w-[600px] rounded-xl p-6 relative">
            
            <button
              onClick={() => setSelectedProperty(null)}
              className="absolute top-3 right-3 text-xl"
            >
              ✖
            </button>

            <img
              src={selectedProperty.img}
              className="w-full h-60 object-cover rounded-lg mb-4"
            />

            <h2 className="text-2xl font-bold">
              {selectedProperty.name}
            </h2>

            <p className="text-gray-500">{selectedProperty.type}</p>

            <p className="text-blue-600 font-bold text-lg">
              {selectedProperty.price}
            </p>

            <p className="mt-3 text-sm text-gray-600">
              Premium property with modern amenities and great location.
            </p>

            <button className="mt-4 w-full bg-purple-600 text-white py-2 rounded-lg">
              Contact Now
            </button>
          </div>
        </div>
      )}

      {/* Hide Scrollbar */}
      <style>
        {`
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </section>
  );
}