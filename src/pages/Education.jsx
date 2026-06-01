import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Footer from "../components/Footer";

export default function Education() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = [
    { name: "Coaching", slug: "coaching" },
    { name: "Online Learning", slug: "online" },
    { name: "Tech Courses", slug: "tech" },
    { name: "Language", slug: "language" },
    { name: "School", slug: "school" },
    { name: "College", slug: "college" },
    { name: "MBA", slug: "mba" },
    { name: "Engineering", slug: "engineering" },
    { name: "Medical", slug: "medical" },
    { name: "Commerce", slug: "commerce" },
    { name: "Arts", slug: "arts" },
    { name: "Computer Course", slug: "computer" },
    { name: "Spoken English", slug: "spoken" },
    { name: "IELTS", slug: "ielts" },
    { name: "Banking Prep", slug: "banking" },
    { name: "SSC", slug: "ssc" },
    { name: "UPSC", slug: "upsc" },
    { name: "Railway", slug: "railway" },
    { name: "Polytechnic", slug: "polytechnic" },
    { name: "ITI", slug: "iti" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* HEADER */}
      <div className="sticky top-0 bg-white shadow px-4 py-4 z-10">
        <h1 className="text-xl md:text-2xl font-bold text-center">
          Education Categories 📚
        </h1>
      </div>

      {/* GRID */}
      <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 p-5 max-w-6xl mx-auto">

        {categories.map((cat, i) => (
          <div
            key={i}
            onClick={() => navigate(`/education/${cat.slug}`)}
            className="bg-white rounded-xl shadow-md p-5 text-center cursor-pointer hover:shadow-xl hover:-translate-y-1 transition"
          >
            <p className="font-semibold text-gray-700 text-sm">
              {cat.name}
            </p>
          </div>
        ))}

      </div>

      <Footer />
    </div>
  );
}