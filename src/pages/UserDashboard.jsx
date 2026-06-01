

import { useState } from "react";
import UserSidebar from "../components/UserSidebar";
import {
  Home,
  Users,
  Building2,
  UserCheck,
  MapPin,
  Ticket,
  IndianRupee,
  TrendingUp,
  SquareStack,
  MessageCircle,
  Briefcase,
  UserPlus,
  Bell,
  Moon,
  Sun,
  Plus,
} from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { motion } from "framer-motion";

// 📊 Chart Data
const chartData = [
  { name: "Mon", value: 10 },
  { name: "Tue", value: 25 },
  { name: "Wed", value: 18 },
  { name: "Thu", value: 35 },
  { name: "Fri", value: 28 },
];

// 🧠 Lead Pipeline
const leads = {
  new: ["Rahul", "Aman"],
  followUp: ["Sahil"],
  closed: ["Ankit", "Ravi"],
};

export default function UserDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [showNotif, setShowNotif] = useState(false);

  const user = {
    name: "Abhishek Kumar",
    role: "Premium CRM Agent",
    avatar: "https://i.pravatar.cc/150?img=12",
  };

  const keyMetrics = [
    { label: "Total Deal Amount", value: "₹12.4L", icon: IndianRupee },
    { label: "Deals Done", value: 34, icon: TrendingUp },
    { label: "Self Earnings", value: "₹2.1L", icon: IndianRupee },
    { label: "Deal SqFt", value: "18,450", icon: SquareStack },
  ];

  const business = [
    { label: "Properties", value: 24, icon: Building2 },
    { label: "Customers", value: 56, icon: Users },
    { label: "Enquiries", value: 18, icon: MessageCircle },
    { label: "Builders", value: 10, icon: Briefcase },
    { label: "Employees", value: 6, icon: UserPlus },
    { label: "Sales Partners", value: 14, icon: UserCheck },
    { label: "Territory Partners", value: 5, icon: MapPin },
    { label: "Tickets", value: 7, icon: Ticket },
  ];

  return (
    <div
      className={
        dark
          ? "bg-gray-950 text-white min-h-screen"
          : "bg-[#F4F6FF] min-h-screen"
      }
    >
      <div className="flex">

        {/* SIDEBAR */}
        <UserSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* MAIN */}
        <div className="flex-1 md:ml-72 w-full p-4 md:p-8">

          {/* TOP BAR */}
          <div className="flex justify-between items-center mb-6">

            <button onClick={() => setSidebarOpen(true)}>
              <Home />
            </button>

            <div className="flex items-center gap-3">

              {/* DARK MODE */}
              <button
                onClick={() => setDark(!dark)}
                className="p-2 rounded-lg bg-white/70 dark:bg-gray-800"
              >
                {dark ? <Sun /> : <Moon />}
              </button>

              {/* NOTIFICATION */}
              <div className="relative">
                <button onClick={() => setShowNotif(!showNotif)}>
                  <Bell />
                </button>

                {showNotif && (
                  <div className="absolute right-0 mt-2 w-60 bg-white dark:bg-gray-800 shadow-xl rounded-xl p-3 text-sm">
                    🔔 New enquiry received<br />
                    🔔 Property viewed<br />
                    🔔 Payment success
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* HERO (WELCOME + PROFILE) */}
          <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 text-white p-6 rounded-3xl shadow-xl flex justify-between items-center">

            <div>
              <h1 className="text-2xl font-bold">
                Welcome, {user.name} 👋
              </h1>
              <p className="text-sm opacity-80">
                {user.role}
              </p>
            </div>

            <img
              src={user.avatar}
              className="w-14 h-14 rounded-full border-2 border-white"
            />
          </div>

          {/* KEY METRICS */}
          <div className="mt-6">
            <h2 className="font-bold mb-3">📊 Key Metrics</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {keyMetrics.map((item, i) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow"
                  >
                    <Icon className="mb-2" />
                    <h2 className="text-xl font-bold">{item.value}</h2>
                    <p className="text-sm text-gray-500">{item.label}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* BUSINESS OVERVIEW */}
          <div className="mt-8">
            <h2 className="font-bold mb-3">🏢 Business Overview</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

              {business.map((item, i) => {
                const Icon = item.icon;

                return (
                  <div
                    key={i}
                    className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow flex items-center gap-3"
                  >
                    <Icon />
                    <div>
                      <p className="text-xs text-gray-500">{item.label}</p>
                      <h2 className="font-bold">{item.value}</h2>
                    </div>
                  </div>
                );
              })}

            </div>
          </div>

          {/* CHART */}
          <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl mt-6 shadow">
            <h2 className="font-bold mb-3">📈 Growth Analytics</h2>

            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#6366f1"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* LEADS */}
          <div className="grid md:grid-cols-3 gap-4 mt-6">

            <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl">
              <h2 className="font-bold">🆕 New</h2>
              {leads.new.map((l, i) => (
                <div key={i} className="p-2 bg-gray-100 dark:bg-gray-700 rounded mt-2">
                  {l}
                </div>
              ))}
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl">
              <h2 className="font-bold">⏳ Follow Up</h2>
              {leads.followUp.map((l, i) => (
                <div key={i} className="p-2 bg-gray-100 dark:bg-gray-700 rounded mt-2">
                  {l}
                </div>
              ))}
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl">
              <h2 className="font-bold">✅ Closed</h2>
              {leads.closed.map((l, i) => (
                <div key={i} className="p-2 bg-gray-100 dark:bg-gray-700 rounded mt-2">
                  {l}
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>

      {/* FLOAT BUTTON */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-indigo-600 text-white rounded-full shadow-xl flex items-center justify-center">
        <Plus />
      </button>
    </div>
  );
}