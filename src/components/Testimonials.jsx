import { Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Rahul Sharma",
    text: "Amazing experience! I found my dream home in Bangalore within 2 days.",
    rating: 5,
  },
  {
    id: 2,
    name: "Priya Verma",
    text: "Very smooth process. Loved the UI and quick response from agents.",
    rating: 4,
  },
  {
    id: 3,
    name: "Amit Singh",
    text: "Best property platform! Highly recommend to everyone.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="bg-white py-14 px-6">

      <div className="max-w-7xl mx-auto">

        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          What Our Customers Say ❤️
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {reviews.map((item) => (
            <div
              key={item.id}
              className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-xl transition"
            >

              {/* Stars */}
              <div className="flex mb-3 text-yellow-400">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-600 text-sm mb-4">
                "{item.text}"
              </p>

              {/* Name */}
              <h4 className="font-semibold text-gray-800">
                {item.name}
              </h4>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}