

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import Footer from "../components/Footer";
import {
  Eye,
  MessageCircle,
  Heart,
  Home,
  MoreVertical,
  Plus,
  Trash2,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function MyListings() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [properties, setProperties] = useState([]);
  const [filter, setFilter] = useState("month");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("properties")) || [];
    setProperties(data);
  }, []);

  const deleteProperty = (id) => {
    const updated = properties.filter((p) => p.id !== id);
    localStorage.setItem("properties", JSON.stringify(updated));
    setProperties(updated);
  };

  const totalListings = properties.length;
  const totalViews = properties.length * 120;
  const enquiries = properties.length * 30;
  const saved = properties.length * 20;

  const chartDataMap = {
    week: [
      { name: "Mon", views: 200, enquiries: 80 },
      { name: "Tue", views: 300, enquiries: 120 },
      { name: "Wed", views: 250, enquiries: 100 },
      { name: "Thu", views: 400, enquiries: 150 },
    ],
    month: [
      { name: "Jan", views: 400, enquiries: 200 },
      { name: "Feb", views: 800, enquiries: 300 },
      { name: "Mar", views: 600, enquiries: 250 },
      { name: "Apr", views: 1200, enquiries: 500 },
    ],
    year: [
      { name: "2022", views: 4000, enquiries: 2000 },
      { name: "2023", views: 7000, enquiries: 3000 },
      { name: "2024", views: 9000, enquiries: 4000 },
    ],
  };

  const chartData = chartDataMap[filter];

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-pink-50 via-white to-pink-100">

      <AdminSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex-1 md:ml-72 flex flex-col p-4 md:p-8">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-pink-600">
            🏠 My Listings
          </h1>

          <button
            onClick={() => navigate("/add-listing")}
            className="flex items-center gap-2 bg-pink-500 text-white px-5 py-2.5 rounded-xl font-bold shadow-md hover:shadow-xl hover:scale-105 transition"
          >
            <Plus size={18} /> Add Property
          </button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">

          <StatCard icon={<Home />} label="Listings" value={totalListings} />
          <StatCard icon={<Eye />} label="Views" value={totalViews} />
          <StatCard icon={<MessageCircle />} label="Enquiries" value={enquiries} />
          <StatCard icon={<Heart />} label="Saved" value={saved} />

        </div>

        {/* CHARTS */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">

          <ChartBox title="Views Analytics">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line dataKey="views" stroke="#EC4899" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </ChartBox>

          <ChartBox title="Enquiries">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="enquiries" fill="#EC4899" />
              </BarChart>
            </ResponsiveContainer>
          </ChartBox>

        </div>

        {/* LISTINGS */}
        <div className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-pink-100">

          <h2 className="text-xl font-extrabold text-pink-600 mb-5">
            Property Listings
          </h2>

          {properties.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              No listings yet 🚀
            </div>
          ) : (
            <div className="space-y-4">

              {properties.map((p) => (
                <div
                  key={p.id}
                  className="flex flex-col md:flex-row justify-between items-center p-5 rounded-2xl bg-white shadow-md hover:shadow-2xl hover:-translate-y-1 transition"
                >

                  {/* LEFT */}
                  <div className="flex items-center gap-4">

                    <img
                      src={p.img || "https://via.placeholder.com/80"}
                      className="w-20 h-20 rounded-xl object-cover"
                    />

                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">
                        {p.title}
                      </h3>

                      <p className="text-sm text-gray-500">
                        📍 {p.location || p.city}
                      </p>

                      <div className="flex gap-2 mt-2">
                        <span className="badge">{p.bhk || "N/A"}</span>
                        <span className="badge">{p.area || "0"} sqft</span>
                      </div>
                    </div>

                  </div>

                  {/* ACTIONS */}
                  <div className="flex items-center gap-4 mt-3 md:mt-0">

                    <button className="text-pink-600 font-bold hover:underline">
                      Edit
                    </button>

                    <button
                      onClick={() => deleteProperty(p.id)}
                      className="text-red-500 hover:scale-110 transition"
                    >
                      <Trash2 size={18} />
                    </button>

                    <MoreVertical className="text-gray-500 hover:text-pink-600" />

                  </div>

                  {/* STATUS */}
                  <div className="text-pink-600 font-bold text-sm mt-2 md:mt-0">
                    ● Active
                  </div>

                </div>
              ))}

            </div>
          )}

        </div>

        <Footer />

      </div>

      {/* STYLE */}
      <style>{`
        .badge {
          padding: 5px 12px;
          background: #FCE7F3;
          color: #EC4899;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 600;
        }
      `}</style>

    </div>
  );
}

/* STAT CARD */
function StatCard({ icon, label, value }) {
  return (
    <div className="bg-white/90 backdrop-blur-md p-5 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition flex items-center gap-4">

      <div className="p-3 rounded-xl bg-pink-100 text-pink-600">
        {icon}
      </div>

      <div>
        <p className="text-sm font-bold text-gray-500 uppercase tracking-wide">
          {label}
        </p>

        <h2 className="text-2xl font-extrabold text-gray-900">
          {value}
        </h2>
      </div>

    </div>
  );
}

/* CHART BOX */
function ChartBox({ title, children }) {
  return (
    <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-md hover:shadow-xl transition">
      <h2 className="font-bold text-pink-600 mb-4">{title}</h2>
      {children}
    </div>
  );
}