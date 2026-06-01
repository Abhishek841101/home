


import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Building2,
  UserCheck,
  Map,
  Home,
  MessageCircle,
  Ticket,
  CreditCard,
  Gift,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function UserSidebar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState({
    name: "User",
    email: "user@gmail.com",
  });

  useEffect(() => {
    const storedUser =
      JSON.parse(localStorage.getItem("userProfile")) ||
      JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
      setUser({
        name: storedUser.name || "User",
        email: storedUser.email || "",
      });
    }
  }, []);

  const handleNavigate = (path) => {
    navigate(path);
    setSidebarOpen(false);
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  const menu = [
    {
      title: "Network & CRM",
      items: [
        { name: "Customers", path: "/customers", icon: <Users size={20} /> },
        { name: "Builders", path: "/builders", icon: <Building2 size={20} /> },
        { name: "Sales Partners", path: "/sales", icon: <UserCheck size={20} /> },
        { name: "Territory Partners", path: "/territory", icon: <Map size={20} /> },
      ],
    },
    {
      title: "Business Modules",
      items: [
        { name: "Properties", path: "/properties", icon: <Home size={20} /> },
        { name: "Enquiries", path: "/enquiries", icon: <MessageCircle size={20} /> },
        { name: "Tickets", path: "/tickets", icon: <Ticket size={20} /> },
      ],
    },
    {
      title: "Account & Settings",
      items: [
        { name: "Subscription Plan", path: "/subscription", icon: <CreditCard size={20} /> },
        { name: "Invite Friends", path: "/referral", icon: <Gift size={20} /> },
      ],
    },
  ];

  return (
    <>
      {/* BACKDROP */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full w-full md:w-80 z-50 shadow-xl
        bg-gradient-to-b from-pink-50 to-gray-100
        transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >

        {/* SCROLL WRAPPER */}
        <div className="h-full flex flex-col overflow-hidden">

          <div className="flex-1 overflow-y-auto">

            {/* HEADER */}
            <div className="p-4 bg-white/70">
              <h2 className="text-sm font-bold text-black">Menu</h2>
              <p className="text-xs text-gray-500">Navigation</p>
            </div>

            {/* PROFILE CARD */}
            <div className="px-3 mt-3">
              <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center text-center">

                <div className="w-16 h-16 bg-pink-600 text-white flex items-center justify-center rounded-full text-xl font-bold">
                  {user.name.charAt(0)}
                </div>

                <h2 className="mt-2 font-bold text-lg text-black">
                  {user.name}
                </h2>

                <p className="text-xs text-gray-500">{user.email}</p>

                {/* VIEW PROFILE - FIXED ROUTE */}
                <button
                  onClick={() => handleNavigate("/profile")}
                  className="mt-3 bg-pink-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-pink-700"
                >
                  View Profile
                </button>
              </div>
            </div>

            {/* DASHBOARD */}
            <div className="p-3 mt-3">
              <button
                onClick={() => handleNavigate("/user/dashboard")}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-[17px] font-bold
                ${
                  isActive("/user/dashboard")
                    ? "bg-pink-600 text-white"
                    : "bg-white hover:bg-pink-100 text-black"
                }`}
              >
                <div className="flex items-center gap-3">
                  <LayoutDashboard size={20} />
                  Dashboard
                </div>
                <span className="opacity-60">&gt;</span>
              </button>
            </div>

            {/* MENU SECTIONS */}
            <div className="px-3 space-y-6">

              {menu.map((section) => (
                <div
                  key={section.title}
                  className="bg-white rounded-2xl shadow-sm border border-pink-100 p-2"
                >

                  <h2 className="text-[18px] font-bold text-black px-2 mb-2">
                    {section.title}
                  </h2>

                  {section.items.map((item, i) => {
                    const active = isActive(item.path);

                    return (
                      <button
                        key={i}
                        onClick={() => handleNavigate(item.path)}
                        className={`flex items-center justify-between w-full px-3 py-3 rounded-lg text-[16px] font-bold
                        ${
                          active
                            ? "bg-pink-600 text-white"
                            : "hover:bg-pink-50 text-black"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-2 rounded-full ${
                              active
                                ? "bg-white/20"
                                : "bg-pink-100 text-pink-600"
                            }`}
                          >
                            {item.icon}
                          </div>
                          {item.name}
                        </div>

                        <span className="opacity-60">&gt;</span>
                      </button>
                    );
                  })}

                </div>
              ))}
            </div>

            {/* LOGOUT */}
            <div className="p-3">
              <button
                onClick={logout}
                className="w-full bg-red-500 text-white py-3 rounded-xl text-[17px] font-bold"
              >
                Logout
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}