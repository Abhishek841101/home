import { useNavigate } from "react-router-dom";

export default function PopularAllPage() {
const navigate = useNavigate();

const data = [
{
name: "Glow Beauty Salon",
type: "beauty",
image:
"https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80",
location: "Chennai",
rating: 4.8,
},
{
name: "FitZone Gym",
type: "gym",
image:
"https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80",
location: "Bangalore",
rating: 4.6,
},
{
name: "City Hospital",
type: "doctors",
image:
"https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80",
location: "Delhi",
rating: 4.7,
},
{
name: "Bright Academy",
type: "education",
image:
"https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
location: "Kota",
rating: 4.9,
},
];

return ( <div className="max-w-6xl mx-auto px-4 py-10">

```
  {/* HEADER */}
  <h1 className="text-2xl font-bold mb-6">
    All Popular Services 🔥
  </h1>

  {/* GRID */}
  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">

    {data.map((item, i) => (
      <div
        key={i}
        onClick={() => navigate(`/category/${item.type}`)}
        className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer"
      >
        <img
          src={item.image}
          className="h-40 w-full object-cover"
          alt={item.name}
        />

        <div className="p-4">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-xs text-gray-500">
            📍 {item.location}
          </p>

          <p className="text-sm mt-1">
            ⭐ {item.rating}
          </p>
        </div>
      </div>
    ))}
  </div>

</div>


);
}
