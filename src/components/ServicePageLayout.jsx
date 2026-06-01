export default function ServicePageLayout({ title, items }) {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">

      {/* HEADER */}
      <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">
        {title}
      </h1>

      {/* GRID */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        
        {items?.map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-md p-4 hover:shadow-xl transition"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-40 object-cover rounded-lg"
            />

            <h2 className="text-lg font-semibold mt-3 text-gray-800">
              {item.name}
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              {item.desc}
            </p>

            {/* ⭐ + 📍 */}
            <div className="flex justify-between mt-2 text-sm">
              <span className="text-yellow-500">
                ⭐ {item.rating}
              </span>
              <span className="text-gray-500">
                📍 {item.location}
              </span>
            </div>

            <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
              View Details
            </button>
          </div>
        ))}

      </div>

    </div>
  );
}