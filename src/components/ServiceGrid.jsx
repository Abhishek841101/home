import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import axios from "axios";

export default function ServiceGrid() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    businessName: "",
    ownerName: "",
    mobile: "",
    email: "",
    category: "",
    city: "",
    description: "",
  });

  const services = [
    {
      name: "Real Estate",
      route: "/real-estate",
      icon: "🏘️",
      color: "from-green-500 to-green-600",
    },

    {
      name: "B2B Services",
      route: "/b2b",
      icon: "🏢",
      color: "from-pink-500 to-pink-600",
    },

    {
      name: "Auto Care",
      route: "/carWashingRepair",
      icon: "🚗🛠️",
      color: "from-gray-600 to-gray-700",
    },

    {
      name: "Solar Service",
      route: "/solar",
      icon: "🔆",
      color: "from-yellow-300 to-green-500",
    },
  ];

  const filtered = services.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()),
  );

  /* HANDLE CHANGE */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* SUBMIT */
  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:5000/api/business/create", formData);

      alert("Business Submitted Successfully 🚀");

      setOpen(false);

      setFormData({
        businessName: "",
        ownerName: "",
        mobile: "",
        email: "",
        category: "",
        city: "",
        description: "",
      });
    } catch (err) {
      console.log(err);
      alert("Failed To Submit Business ❌");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* HEADER */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md shadow-sm px-4 py-4">
        <h1 className="text-xl md:text-2xl font-bold text-center text-gray-800">
          Explore All Services 🚀
        </h1>

        {/* SEARCH */}
        <div className="mt-3 relative max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Search services (b2b, solar, real-states...)"
            className="w-full border border-gray-200 rounded-full pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <span className="absolute left-3 top-3.5 text-gray-400">🔍</span>
        </div>
      </div>

      {/* GRID */}
      <div className="flex-1 px-4 py-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 min-h-[300px]">
          {filtered.map((s, i) => (
            <div
              key={i}
              onClick={() => navigate(s.route)}
              className={`cursor-pointer rounded-2xl p-5 text-white bg-gradient-to-r ${s.color} shadow-md hover:shadow-xl hover:scale-105 transition`}
            >
              <div className="text-3xl">{s.icon}</div>

              <h2 className="mt-3 font-bold text-lg">{s.name}</h2>

              <p className="text-xs opacity-80 mt-1">
                Explore {s.name} services
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 📢 BANNER */}
      <div className="px-4 md:px-8 lg:px-12 mb-10">
        <div
          className="
            mt-12
            bg-white
            border
            rounded-2xl
            p-6
            flex
            flex-col sm:flex-row
            items-start sm:items-center
            justify-between
            gap-4
            shadow-md
          "
        >
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-gray-900 font-semibold text-base md:text-lg">
              List your business
            </span>

            <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full">
              Free
            </span>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="
              bg-blue-600
              text-white
              px-6
              py-3
              rounded-xl
              font-semibold
              hover:bg-blue-700
              transition
              w-full sm:w-auto
            "
          >
            Start Now
          </button>
        </div>
      </div>

      {/* POPUP */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl">
            {/* HEADER */}
            <div className="bg-blue-600 text-white p-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">List Your Business</h2>

                <p className="text-sm text-blue-100 mt-1">
                  Grow your business online
                </p>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="text-3xl leading-none"
              >
                ×
              </button>
            </div>

            {/* FORM */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Business Name
                </label>

                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  placeholder="Enter business name"
                  className="w-full mt-2 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Owner Name
                </label>

                <input
                  type="text"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleChange}
                  placeholder="Enter owner name"
                  className="w-full mt-2 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Mobile Number
                </label>

                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="+91 Enter mobile number"
                  className="w-full mt-2 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  className="w-full mt-2 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Business Category
                </label>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full mt-2 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>Select Category</option>
                  <option>Manufacturer</option>
                  <option>Real Estate</option>
                  <option>Wholesaler</option>
                  <option>Distributor</option>
                  <option>Retailer</option>
                  <option>Service Provider</option>
                  <option>Solar Provider</option>
                  <option>Others</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  City
                </label>

                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter city"
                  className="w-full mt-2 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700">
                  Business Description
                </label>

                <textarea
                  rows={4}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Tell us about your business..."
                  className="w-full mt-2 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="md:col-span-2 flex justify-end gap-4">
                <button
                  onClick={() => setOpen(false)}
                  className="border px-5 py-3 rounded-xl font-medium"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSubmit}
                  className="
                    bg-blue-600
                    text-white
                    px-6
                    py-3
                    rounded-xl
                    font-semibold
                    hover:bg-blue-700
                  "
                >
                  Submit Business
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
