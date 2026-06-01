import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Home,
  User,
  PlusCircle,
  LogOut,
  X,
  Sun,
  Building2,
  ChevronDown,
  Car,
  Package,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function AdminSidebar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);
  const [addOpen, setAddOpen] = useState(false);

  const [user, setUser] = useState({
    name: "Admin",
    email: "admin@gmail.com",
  });

  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("userProfile")) ||
      JSON.parse(localStorage.getItem("user"));

    if (stored) {
      setUser({
        name: stored.name || "Admin",
        email: stored.email || "",
      });
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

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
        className={`fixed top-0 left-0 h-full z-50 flex flex-col
        bg-gradient-to-b from-pink-50 to-white shadow-2xl
        transition-all duration-300
        ${collapsed ? "w-20" : "w-80"}
        ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between p-4">
          {!collapsed && (
            <div>
              <h2 className="text-xl font-extrabold text-pink-600">
                Admin Panel
              </h2>
              <p className="text-xs text-gray-500">Manage everything</p>
            </div>
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-2 rounded-lg text-pink-600 hover:bg-pink-100 font-bold"
            >
              {collapsed ? "›" : "‹"}
            </button>

            <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
              <X />
            </button>
          </div>
        </div>

        {/* PROFILE */}
        {!collapsed && (
          <div className="px-4 mb-3">
            <div className="bg-white rounded-3xl shadow-md p-5 text-center">
              <div className="w-20 h-20 mx-auto bg-pink-600 text-white flex items-center justify-center rounded-full text-2xl font-bold">
                {user.name.charAt(0)}
              </div>

              <h2 className="mt-3 text-lg font-extrabold">{user.name}</h2>
              <p className="text-sm text-gray-500">{user.email}</p>

              <button
                onClick={() => navigate("/admin/profile")}
                className="mt-4 bg-pink-600 text-white px-5 py-2 rounded-xl text-sm font-bold"
              >
                View Profile
              </button>
            </div>
          </div>
        )}

        {/* MENU */}
        <div className="flex-1 overflow-y-auto px-3 space-y-3">
          {/* DASHBOARD */}
          <button
            onClick={() => navigate("/admin")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold ${
              isActive("/admin")
                ? "bg-pink-600 text-white"
                : "bg-white hover:bg-pink-50"
            }`}
          >
            <LayoutDashboard size={22} />
            {!collapsed && "Dashboard"}
          </button>

          {/* ADD DROPDOWN */}
          <div className="bg-white rounded-2xl overflow-hidden">
            <button
              onClick={() => setAddOpen(!addOpen)}
              className="w-full flex items-center justify-between px-4 py-3 font-bold hover:bg-pink-50"
            >
              <div className="flex items-center gap-3">
                <PlusCircle size={22} />
                {!collapsed && "Add"}
              </div>

              {!collapsed && <ChevronDown size={18} />}
            </button>

            {/* dropdown items */}
            {addOpen && !collapsed && (
              <div className="px-3 pb-3 space-y-2">
                {/* PROPERTY */}
                <button
                  onClick={() => {
                    navigate("/add-property");
                    setSidebarOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-pink-100"
                >
                  <Building2 size={18} />
                  Add Property
                </button>

                {/* SOLAR */}
                <button
                  onClick={() => {
                    navigate("/add-solar");
                    setSidebarOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-yellow-100"
                >
                  <Sun size={18} />
                  Add Solar
                </button>

                {/* CAR WASHING */}
                <button
                  onClick={() => {
                    navigate("/add-carwashing");
                    setSidebarOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-blue-100"
                >
                  <Car size={18} />
                  Add Car Washing
                </button>

                {/* ⭐ POPULAR PRODUCT */}
                <button
                  onClick={() => {
                    navigate("/add-popularProduct");
                    setSidebarOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-green-100"
                >
                  <Package size={18} />
                  Add Popular Product
                </button>
              </div>
            )}
          </div>

          {/* OTHER MENU */}
          <button
            onClick={() => navigate("/properties")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-white hover:bg-pink-50 font-bold"
          >
            <Home size={22} />
            {!collapsed && "Manage Properties"}
          </button>

          <button
            onClick={() => navigate("/admin/profile")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-white hover:bg-pink-50 font-bold"
          >
            <User size={22} />
            {!collapsed && "Profile"}
          </button>
        </div>

        {/* LOGOUT */}
        <div className="p-3">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-red-500 text-white font-bold"
          >
            <LogOut size={20} />
            {!collapsed && "Logout"}
          </button>
        </div>
      </div>
    </>
  );
}
