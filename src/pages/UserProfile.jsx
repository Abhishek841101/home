




import { useState, useEffect } from "react";
import {
  Edit,
  Heart,
  MessageCircle,
  Home,
  Crown,
  Menu,
} from "lucide-react";
import Footer from "../components/Footer";
import UserSidebar from "../components/UserSidebar";

export default function UserProfile() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [profile, setProfile] = useState({
    name: "Abhishek Kumar",
    email: "user@gmail.com",
    phone: "9876543210",
    city: "Bangalore",
    plan: "Free Trial",
  });

  const [saved, setSaved] = useState([]);
  const [enquiries, setEnquiries] = useState([]);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("savedProperties")) || [];
    const enquiryData = JSON.parse(localStorage.getItem("enquiries")) || [];
    const user = JSON.parse(localStorage.getItem("userProfile"));

    if (user) setProfile(user);

    setSaved(savedData);
    setEnquiries(enquiryData);
  }, []);

  const handleSave = () => {
    localStorage.setItem("userProfile", JSON.stringify(profile));
    setEditMode(false);
    alert("✅ Profile Updated");
  };

  return (
    <div className="flex bg-gradient-to-b from-pink-50 to-gray-100 min-h-screen">

      {/* SIDEBAR */}
      <UserSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* MAIN */}
      <div className="flex-1 md:ml-72 p-4 md:p-8 flex flex-col">

        {/* MOBILE MENU */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 bg-white rounded shadow"
          >
            <Menu />
          </button>
        </div>

        {/* HEADER */}
        <div className="bg-white p-6 rounded-2xl shadow mb-6 flex items-center justify-between">

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-pink-600 text-white flex items-center justify-center rounded-full text-xl font-bold">
              {profile.name.charAt(0)}
            </div>

            <div>
              <h1 className="text-xl font-bold">{profile.name}</h1>
              <p className="text-gray-500 text-sm">{profile.email}</p>
            </div>
          </div>

          <button
            onClick={() => setEditMode(!editMode)}
            className="text-pink-600 flex items-center gap-1"
          >
            <Edit size={16} /> {editMode ? "Cancel" : "Edit"}
          </button>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-6">

          {/* PROFILE */}
          <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow">

            <h2 className="font-bold text-lg mb-4">
              Profile Information
            </h2>

            <div className="grid md:grid-cols-2 gap-4">

              <Input label="Name" value={profile.name} edit={editMode}
                onChange={(v) => setProfile({ ...profile, name: v })} />

              <Input label="Email" value={profile.email} edit={editMode}
                onChange={(v) => setProfile({ ...profile, email: v })} />

              <Input label="Phone" value={profile.phone} edit={editMode}
                onChange={(v) => setProfile({ ...profile, phone: v })} />

              <Input label="City" value={profile.city} edit={editMode}
                onChange={(v) => setProfile({ ...profile, city: v })} />

            </div>

            {editMode && (
              <button
                onClick={handleSave}
                className="mt-4 bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700"
              >
                Save Changes
              </button>
            )}
          </div>

          {/* SUBSCRIPTION */}
          <div className="bg-white p-6 rounded-2xl shadow">

            <h2 className="font-bold mb-3 flex items-center gap-2">
              <Crown size={18} className="text-pink-600" />
              Subscription
            </h2>

            <p className="text-lg font-semibold">{profile.plan}</p>

            <p className="text-sm text-gray-500 mb-4">
              Active Plan
            </p>

            <button className="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700">
              Upgrade Plan
            </button>

          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-6">

          <Stat icon={<Heart />} label="Saved" value={saved.length} />
          <Stat icon={<MessageCircle />} label="Enquiries" value={enquiries.length} />
          <Stat icon={<Home />} label="Viewed" value="120" />

        </div>

        {/* LISTS */}
        <div className="grid md:grid-cols-2 gap-6">

          <Card title="Saved Properties">
            {saved.length > 0 ? (
              saved.map((p, i) => (
                <div key={i} className="border-b py-2">
                  {p.title}
                </div>
              ))
            ) : (
              <p>No saved properties</p>
            )}
          </Card>

          <Card title="Enquiries">
            {enquiries.length > 0 ? (
              enquiries.map((e, i) => (
                <div key={i} className="border-b py-2">
                  {e.property}
                </div>
              ))
            ) : (
              <p>No enquiries</p>
            )}
          </Card>

        </div>

        <Footer />
      </div>
    </div>
  );
}

/* 🔥 COMPONENTS */

function Input({ label, value, edit, onChange }) {
  return (
    <div>
      <label className="text-sm text-gray-500">{label}</label>
      {edit ? (
        <input
          className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-pink-500"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <p className="mt-1 font-medium">{value}</p>
      )}
    </div>
  );
}

function Stat({ icon, label, value }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow flex items-center gap-3 hover:shadow-md transition">

      {/* ICON FIX */}
      <div className="p-2 rounded-full bg-pink-100 text-pink-600">
        {icon}
      </div>

      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <h2 className="font-bold">{value}</h2>
      </div>
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow border border-pink-100">
      <h2 className="font-bold mb-3">{title}</h2>
      {children}
    </div>
  );
}