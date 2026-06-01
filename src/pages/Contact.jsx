import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import contactBg from "../assets/contact.png";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="w-full bg-white">
      {/* NAVBAR */}
      <Navbar />

      {/* HERO */}
      <section className="relative h-64 w-full overflow-hidden">
        <img
          src={contactBg}
          alt="Contact Banner"
          className="w-full h-full object-cover brightness-50"
        />

        <h1 className="absolute inset-0 flex items-center justify-center text-white text-4xl md:text-5xl font-bold">
          Contact Us
        </h1>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* HEADER */}
        <div className="text-center mb-16">
          <span className="text-blue-600 font-semibold">#Contact Us</span>
          <h2 className="text-3xl font-bold text-gray-900 mt-2">
            Get In Touch With Us
          </h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            We are ready to assist you. Reach out for any queries or support.
          </p>
        </div>

        {/* INFO CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16 border-b pb-10">
          <ContactInfo
            icon={<MapPin size={20} />}
            label="Location"
            detail="Nagpur, India"
          />
          <ContactInfo
            icon={<Phone size={20} />}
            label="Phone"
            detail="+91 9766592053"
          />
          <ContactInfo
            icon={<Mail size={20} />}
            label="Email"
            detail="contact@advixio.in"
          />
          <ContactInfo
            icon={<Clock size={20} />}
            label="Hours"
            detail="Mon-Fri: 9AM-6PM"
          />
        </div>

        {/* FORM + MAP SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* FORM */}
          <div className="bg-gray-50 p-8 rounded-2xl border">
            <h3 className="text-2xl font-bold mb-6">Send Message</h3>

            <form className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <input
                type="text"
                placeholder="Phone"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <textarea
                placeholder="Message"
                className="w-full p-3 border rounded-lg h-32 focus:ring-2 focus:ring-blue-500 outline-none"
              ></textarea>

              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
                Send Message
              </button>
            </form>
          </div>

          {/* MAP */}
          <div className="rounded-2xl overflow-hidden border shadow">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.103... (your-map-link-here)"
              className="w-full h-full min-h-[400px]"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

/* INFO COMPONENT */
function ContactInfo({ icon, label, detail }) {
  return (
    <div className="flex items-center gap-4">
      <div className="p-3 bg-blue-50 text-blue-600 rounded-full">{icon}</div>

      <div>
        <p className="text-sm text-gray-400">{label}</p>
        <p className="font-bold text-gray-800">{detail}</p>
      </div>
    </div>
  );
}
