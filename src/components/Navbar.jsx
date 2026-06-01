import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Search } from "lucide-react";
import properties from "../data/properties";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [openLocation, setOpenLocation] = useState(false);
  const [search, setSearch] = useState("");

  const locationRef = useRef();
  const isAuth = localStorage.getItem("token");

  // ✅ Scroll lock
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [menuOpen]);

  // close dropdown
  useEffect(() => {
    const handler = (e) => {
      if (locationRef.current && !locationRef.current.contains(e.target)) {
        setOpenLocation(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // close menu on route change
  useEffect(() => {
    setMenuOpen(false);
    setOpenLocation(false);
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path;

  const filteredProperties = properties.filter((item) =>
    `${item.name} ${item.location} ${item.address}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  const goToProfile = () => {
    const role = localStorage.getItem("role");
    if (!isAuth) return navigate("/login");
    navigate(role === "admin" ? "/admin/profile" : "/profile");
    setMenuOpen(false);
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b shadow">
        <div className="flex items-center justify-between px-4 md:px-10 py-4">
          {/* LOGO */}
          <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text">
            Advixio
          </h1>

          {/* DESKTOP MENU */}
          <ul className="hidden md:flex gap-8 font-semibold text-gray-700">
            {["/", "/about", "/contact"].map((path) => (
              <Link
                key={path}
                to={path}
                className={`hover:text-pink-600 ${
                  isActive(path) ? "text-pink-600" : ""
                }`}
              >
                {path === "/" ? "Home" : path.replace("/", "")}
              </Link>
            ))}

            {isAuth ? (
              <button
                onClick={goToProfile}
                className="px-4 py-2 bg-pink-500 text-white rounded-xl"
              >
                My Profile
              </button>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </ul>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3">
            {/* SEARCH */}
            <div ref={locationRef} className="hidden md:block relative">
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow">
                <Search size={18} />
                <input
                  value={search}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSearch(value);
                    setOpenLocation(value.trim() !== "");
                  }}
                  placeholder="Search property..."
                  className="outline-none text-sm"
                />
              </div>

              {openLocation && (
                <div className="absolute top-14 right-0 w-72 bg-white shadow-xl rounded-xl z-50">
                  {filteredProperties.map((item, i) => (
                    <Link
                      key={i}
                      to="/properties"
                      className="block p-3 hover:bg-pink-50"
                      onClick={() => setOpenLocation(false)}
                    >
                      <p className="font-semibold text-sm">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.location}</p>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* ✅ MOBILE MENU BUTTON FIXED */}
            <button
              onClick={() => setMenuOpen(true)}
              className="block md:hidden p-2 bg-white shadow rounded-xl z-50"
            >
              <Menu className="text-black" size={22} />
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-0 z-[9999] transition-all duration-300 ${
          menuOpen
            ? "opacity-100 visible pointer-events-auto"
            : "opacity-0 invisible pointer-events-none"
        }`}
      >
        {/* BACKDROP */}
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-md"
          onClick={() => setMenuOpen(false)}
        />

        {/* SIDE PANEL */}
        <div
          className={`absolute right-0 top-0 h-full w-[80%] bg-white p-6 shadow-2xl transform transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* HEADER */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-pink-600">Menu</h2>
            <X onClick={() => setMenuOpen(false)} className="cursor-pointer" />
          </div>

          {/* LINKS */}
          <div className="flex flex-col gap-6 text-lg font-semibold text-black">
            <Link to="/" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
            <Link to="/properties" onClick={() => setMenuOpen(false)}>
              Properties
            </Link>
            <Link to="/about" onClick={() => setMenuOpen(false)}>
              About
            </Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)}>
              Contact
            </Link>

            {isAuth ? (
              <button onClick={goToProfile} className="text-pink-600 text-left">
                My Profile
              </button>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
