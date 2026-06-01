import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      {/* TOP SECTION */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* BRAND */}
        <div>
          <h2 className="text-white text-2xl font-bold">🌐 Advixio</h2>

          <p className="text-sm text-gray-400 mt-3">
            India’s growing business discovery platform connecting customers
            with trusted local businesses and services.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>

          <ul className="space-y-2 text-sm">
            <li
              className="hover:text-white cursor-pointer"
              onClick={() => navigate("/")}
            >
              Home
            </li>

            <li
              className="hover:text-white cursor-pointer"
              onClick={() => navigate("/about")}
            >
              About Us
            </li>

            <li
              className="hover:text-white cursor-pointer"
              onClick={() => navigate("/services")}
            >
              Services
            </li>

            <li
              className="hover:text-white cursor-pointer"
              onClick={() => navigate("/contact")}
            >
              Contact
            </li>
          </ul>
        </div>

        {/* CATEGORIES */}
        <div>
          <h3 className="text-white font-semibold mb-4">Categories</h3>

          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Real Estate</li>
            <li className="hover:text-white cursor-pointer">B2B Services</li>
            <li className="hover:text-white cursor-pointer">Auto Care</li>
            <li className="hover:text-white cursor-pointer">Solar Services</li>
            <li className="hover:text-white cursor-pointer">
              Local Businesses
            </li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contact</h3>

          <ul className="space-y-2 text-sm">
            <li>📍 India</li>
            <li>📞 +91 00000 00000</li>
            <li>✉️ support@bizora.com</li>
          </ul>
        </div>
      </div>

      {/* DIVIDER */}
      <div className="border-t border-gray-800"></div>

      {/* BOTTOM SECTION */}
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Advixio. All rights reserved.</p>

        <div className="flex gap-4 mt-3 md:mt-0">
          <span className="hover:text-white cursor-pointer">
            Privacy Policy
          </span>
          <span className="hover:text-white cursor-pointer">Terms</span>
          <span className="hover:text-white cursor-pointer">Support</span>
        </div>
      </div>
    </footer>
  );
}
