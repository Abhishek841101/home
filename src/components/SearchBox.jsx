import { useState } from "react";
import { Search } from "lucide-react";

export default function SearchBox() {
  const [query, setQuery] = useState("");

  const filtered = properties.filter(
    (p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.location.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="relative w-full">
      {/* INPUT */}
      <div className="flex items-center border-2 border-blue-200 rounded-xl px-3 py-2 bg-white">
        <Search size={18} />
        <input
          type="text"
          placeholder="Search properties..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-2 outline-none"
        />
      </div>

      {/* RESULT DROPDOWN */}
      {query && (
        <div className="absolute top-14 left-0 w-full bg-white shadow-xl rounded-xl p-3 z-50 max-h-[300px] overflow-y-auto">
          {filtered.length > 0 ? (
            filtered.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-2 border rounded-lg mb-2 hover:bg-blue-50 cursor-pointer"
              >
                <img
                  src={item.img}
                  className="w-12 h-12 rounded-md object-cover"
                />
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-sm text-gray-500">{item.location}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400">No results found</p>
          )}
        </div>
      )}
    </div>
  );
}
