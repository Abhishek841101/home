import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Footer from "../components/Footer";

export default function EducationList() {
  const { category } = useParams();
  const [search, setSearch] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 🔥 40+ DUMMY DATA
  const data = [
    // COACHING
    { name: "Bright Future Academy", location: "Patna", rating: 4.6, category: "coaching", students: "10K+" },
    { name: "Career Point", location: "Kota", rating: 4.7, category: "coaching", students: "50K+" },
    { name: "PW Center", location: "Delhi", rating: 4.8, category: "coaching", students: "100K+" },
    { name: "Allen Classes", location: "Kota", rating: 4.9, category: "coaching", students: "200K+" },

    // ONLINE
    { name: "Byju's", location: "Bangalore", rating: 4.5, category: "online", students: "1M+" },
    { name: "Unacademy", location: "Delhi", rating: 4.6, category: "online", students: "800K+" },
    { name: "Vedantu", location: "Mumbai", rating: 4.4, category: "online", students: "500K+" },

    // TECH
    { name: "Code Academy", location: "Hyderabad", rating: 4.7, category: "tech", students: "25K+" },
    { name: "Web Dev Institute", location: "Pune", rating: 4.6, category: "tech", students: "15K+" },
    { name: "Coding Ninjas", location: "Delhi", rating: 4.8, category: "tech", students: "100K+" },

    // LANGUAGE
    { name: "English Pro", location: "Chennai", rating: 4.5, category: "language", students: "8K+" },
    { name: "Spoken Hub", location: "Delhi", rating: 4.4, category: "language", students: "12K+" },

    // IELTS
    { name: "IELTS Center", location: "Delhi", rating: 4.4, category: "ielts", students: "5K+" },
    { name: "British Academy", location: "Mumbai", rating: 4.6, category: "ielts", students: "9K+" },

    // ENGINEERING
    { name: "IIT Hub", location: "Kota", rating: 4.8, category: "engineering", students: "60K+" },
    { name: "Tech Academy", location: "Delhi", rating: 4.6, category: "engineering", students: "30K+" },

    // MEDICAL
    { name: "NEET Academy", location: "Delhi", rating: 4.7, category: "medical", students: "40K+" },
    { name: "Aakash Institute", location: "Mumbai", rating: 4.8, category: "medical", students: "80K+" },

    // COMMERCE
    { name: "Commerce Classes", location: "Mumbai", rating: 4.5, category: "commerce", students: "20K+" },
    { name: "CA Academy", location: "Delhi", rating: 4.7, category: "commerce", students: "15K+" },

    // ARTS
    { name: "Arts Academy", location: "Jaipur", rating: 4.3, category: "arts", students: "6K+" },
    { name: "Fine Arts School", location: "Delhi", rating: 4.4, category: "arts", students: "10K+" },

    // GOVT EXAM
    { name: "SSC Coaching", location: "Patna", rating: 4.4, category: "ssc", students: "25K+" },
    { name: "Banking Prep", location: "Lucknow", rating: 4.5, category: "banking", students: "18K+" },
    { name: "UPSC Academy", location: "Delhi", rating: 4.9, category: "upsc", students: "70K+" },
    { name: "Railway Prep", location: "Patna", rating: 4.3, category: "railway", students: "12K+" },

    // OTHER
    { name: "ITI Center", location: "Ranchi", rating: 4.2, category: "iti", students: "5K+" },
    { name: "Polytechnic Inst.", location: "Bhopal", rating: 4.4, category: "polytechnic", students: "8K+" },

    // EXTRA (to cross 40+)
    { name: "Digital Marketing School", location: "Delhi", rating: 4.6, category: "tech", students: "9K+" },
    { name: "AI Training Hub", location: "Bangalore", rating: 4.8, category: "tech", students: "11K+" },
    { name: "English Zone", location: "Patna", rating: 4.3, category: "language", students: "7K+" },
    { name: "Kids School", location: "Chennai", rating: 4.5, category: "school", students: "20K+" },
    { name: "Delhi Public School", location: "Delhi", rating: 4.7, category: "school", students: "50K+" },
    { name: "XYZ College", location: "Mumbai", rating: 4.4, category: "college", students: "30K+" },
    { name: "ABC University", location: "Pune", rating: 4.6, category: "college", students: "60K+" },
  ];

  const filtered = data.filter((item) => {
    return (
      item.category === category &&
      (item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.location.toLowerCase().includes(search.toLowerCase()))
    );
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">

      {/* HEADER */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md shadow-sm px-4 py-4">

        <h1 className="text-lg md:text-2xl font-bold text-center capitalize">
          {category} Institutes 📚
        </h1>

        <div className="mt-3 max-w-xl mx-auto relative">
          <input
            type="text"
            placeholder="Search institute or city..."
            className="w-full border border-gray-200 rounded-full pl-10 pr-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="absolute left-3 top-3 text-gray-400">🔍</span>
        </div>

      </div>

      {/* GRID */}
      <div className="flex-1 px-4 py-6 max-w-6xl mx-auto w-full">

        {filtered.length === 0 ? (
          <div className="text-center mt-16">
            <p className="text-gray-500 text-lg">No institutes found 😕</p>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">

            {filtered.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-md p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* TITLE */}
                <h2 className="text-lg font-semibold text-gray-800">
                  {item.name}
                </h2>

                {/* LOCATION */}
                <p className="text-sm text-gray-500 mt-1">
                  📍 {item.location}
                </p>

                {/* INFO */}
                <div className="flex justify-between mt-3 text-sm">
                  <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                    ⭐ {item.rating}
                  </span>

                  <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full capitalize">
                    {item.category}
                  </span>
                </div>

                {/* STUDENTS */}
                <p className="text-xs text-gray-400 mt-2">
                  🎓 {item.students} Students
                </p>

                {/* BUTTON */}
                <button className="mt-4 w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-2 rounded-xl hover:opacity-90 active:scale-95 transition">
                  View Details
                </button>
              </div>
            ))}

          </div>
        )}

      </div>

      <Footer />
    </div>
  );
}