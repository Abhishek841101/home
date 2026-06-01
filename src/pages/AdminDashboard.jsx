


import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import Footer from "../components/Footer";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { Menu, User, MessageCircle } from "lucide-react";

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [stats, setStats] = useState({
    totalProperties: 0,
    totalUnits: 0,
    available: 0,
    booked: 0,
    revenue: 0,
  });

  const [recent, setRecent] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const properties =
      JSON.parse(localStorage.getItem("properties")) || [];

    const users =
      JSON.parse(localStorage.getItem("users")) || [
        { name: "Amit Sharma", email: "amit@gmail.com" },
        { name: "Ravi Kumar", email: "ravi@gmail.com" },
        { name: "Neha Singh", email: "neha@gmail.com" },
      ];

    const feedbackData =
      JSON.parse(localStorage.getItem("feedbacks")) || [
        { name: "Amit", msg: "Great service!", rating: 5 },
        { name: "Neha", msg: "Nice property listing", rating: 4 },
        { name: "Ravi", msg: "Booking process smooth", rating: 5 },
      ];

    let totalUnits = 0;
    let available = 0;
    let booked = 0;
    let revenue = 0;
    let recentBookings = [];

    properties.forEach((p) => {
      p.units?.forEach((u) => {
        totalUnits++;

        if (u.status === "available") available++;
        else {
          booked++;
          revenue += Number(u.price || 0);

          recentBookings.push({
            name: p.title,
            flat: u.flat,
            price: u.price,
          });
        }
      });
    });

    setStats({
      totalProperties: properties.length || 3,
      totalUnits: totalUnits || 20,
      available: available || 12,
      booked: booked || 8,
      revenue: revenue || 1200000,
    });

    setRecent(
      recentBookings.length > 0
        ? recentBookings.slice(0, 5)
        : [
            { name: "Royal Keshava", flat: "101", price: "60L" },
            { name: "Sky Heights", flat: "202", price: "45L" },
          ]
    );

    setRecentUsers(users.slice(0, 5));
    setFeedbacks(feedbackData.slice(0, 5));
  }, []);

  const pieData = [
    { name: "Available", value: stats.available },
    { name: "Booked", value: stats.booked },
  ];

  const monthlyData = [
    { month: "Jan", revenue: 20000 },
    { month: "Feb", revenue: 45000 },
    { month: "Mar", revenue: 30000 },
    { month: "Apr", revenue: stats.revenue },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50 via-white to-pink-100">

      <div className="flex flex-1">

        {/* SIDEBAR */}
        <AdminSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* MAIN */}
        <div className="flex-1 md:ml-80 p-4 md:p-8">

          {/* MOBILE */}
          <button
            className="md:hidden mb-4 text-pink-600"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={28} />
          </button>

          {/* TITLE */}
          <h1 className="text-3xl font-extrabold text-pink-600 mb-6">
            📊 Admin Dashboard
          </h1>

          {/* STATS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
            <Card title="Properties" value={stats.totalProperties} />
            <Card title="Flats" value={stats.totalUnits} />
            <Card title="Available" value={stats.available} />
            <Card title="Booked" value={stats.booked} />
          </div>

          {/* REVENUE */}
          <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white p-6 rounded-2xl shadow-lg mb-8">
            <h2 className="font-bold text-lg">Total Revenue</h2>
            <p className="text-3xl font-extrabold mt-2">
              ₹ {stats.revenue.toLocaleString()}
            </p>
            <p className="text-sm opacity-90 mt-1">
              +18% growth this month
            </p>
          </div>

          {/* CHARTS */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">

            {/* PIE */}
            <div className="bg-white p-6 rounded-2xl shadow-md border border-pink-100">
              <h2 className="font-bold text-pink-600 mb-4">Flat Status</h2>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={pieData} dataKey="value">
                    <Cell fill="#ec4899" />
                    <Cell fill="#f43f5e" />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* BAR */}
            <div className="bg-white p-6 rounded-2xl shadow-md border border-pink-100">
              <h2 className="font-bold text-pink-600 mb-4">
                Monthly Revenue
              </h2>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={monthlyData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#ec4899" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* GRID SECTIONS */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">

            {/* BOOKINGS */}
            <div className="bg-white p-5 rounded-2xl shadow-md border border-pink-100">
              <h2 className="font-bold text-pink-600 mb-4">
                Recent Bookings
              </h2>

              {recent.map((r, i) => (
                <div
                  key={i}
                  className="p-3 mb-2 rounded-xl hover:bg-pink-50 transition"
                >
                  <p className="font-bold">{r.name}</p>
                  <p className="text-sm text-gray-500">
                    Flat {r.flat}
                  </p>
                  <p className="text-pink-600 font-bold">
                    ₹ {r.price}
                  </p>
                </div>
              ))}
            </div>

            {/* USERS */}
            <div className="bg-white p-5 rounded-2xl shadow-md border border-pink-100">
              <h2 className="font-bold text-pink-600 mb-4 flex items-center gap-2">
                <User size={18} /> Recent Users
              </h2>

              {recentUsers.map((u, i) => (
                <div
                  key={i}
                  className="p-3 mb-2 rounded-xl hover:bg-pink-50 transition"
                >
                  <p className="font-bold">{u.name}</p>
                  <p className="text-sm text-gray-500">{u.email}</p>
                </div>
              ))}
            </div>

            {/* FEEDBACK */}
            <div className="bg-white p-5 rounded-2xl shadow-md border border-pink-100">
              <h2 className="font-bold text-pink-600 mb-4 flex items-center gap-2">
                <MessageCircle size={18} /> Feedback
              </h2>

              {feedbacks.map((f, i) => (
                <div
                  key={i}
                  className="p-3 mb-2 rounded-xl hover:bg-pink-50 transition"
                >
                  <p className="font-bold">{f.name}</p>
                  <p className="text-sm text-gray-600">{f.msg}</p>
                  <p className="text-pink-600 font-bold">
                    ⭐ {f.rating}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}

/* CARD */
function Card({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-pink-100 hover:shadow-xl transition">

      <h3 className="text-black font-bold text-lg">{title}</h3>

      <p className="text-3xl font-extrabold mt-2 text-black">
        {value}
      </p>

    </div>
  );
}