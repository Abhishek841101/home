import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Footer from "../components/Footer";

export default function B2B() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = [
    { name: "Electronics", slug: "electronics" },
    { name: "Export", slug: "export" },
    { name: "Machinery", slug: "machinery" },
    { name: "Textile", slug: "textile" },
    { name: "Food Supply", slug: "food" },
    { name: "IT Services", slug: "it" },
    { name: "Construction", slug: "construction" },
    { name: "Automobile", slug: "automobile" },
    { name: "Pharma", slug: "pharma" },
    { name: "Packaging", slug: "packaging" },
    { name: "Furniture", slug: "furniture" },
    { name: "Chemical", slug: "chemical" },
    { name: "Logistics", slug: "logistics" },
    { name: "Agriculture", slug: "agriculture" },
    { name: "Steel", slug: "steel" },
    { name: "Plastic", slug: "plastic" },
    { name: "Paper", slug: "paper" },
    { name: "Mining", slug: "mining" },
    { name: "Energy", slug: "energy" },
    { name: "Consulting", slug: "consulting" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* HEADER */}
      <div className="sticky top-0 bg-white shadow px-4 py-4 z-10">
        <h1 className="text-xl md:text-2xl font-bold text-center">
          B2B  🏢
        </h1>
      </div>

      {/* GRID */}
      <div className="flex-1 px-4 py-8 max-w-6xl mx-auto 
        grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">

        {categories.map((cat, i) => (
          <div
            key={i}
            onClick={() => navigate(`/b2b/${cat.slug}`)}
            className="bg-white rounded-2xl shadow-md p-5 text-center cursor-pointer 
            hover:shadow-xl hover:-translate-y-1 transition"
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