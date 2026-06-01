
import { useState, useMemo, useCallback } from "react";
import AdminSidebar from "../components/AdminSidebar";
import Footer from "../components/Footer";
import { Menu, ArrowRight, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { State, City } from "country-state-city";

/* =========================
   SECTION COMPONENT
========================= */
const Section = ({ title, children }) => (
  <div className="mb-6">
    <h2 className="font-bold mb-2 text-lg">{title}</h2>
    {children}
  </div>
);

export default function AddListing() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const [purpose, setPurpose] = useState("Rent");

  const [form, setForm] = useState({
    propertyName: "",
    propertyCategory: "",
    location: "",
    state: "",
    city: "",
    price: "",
    expectedPrice: "",
    area: "",
    ownerName: "",
    phone: "",
    email: "",
    lat: "",
    lng: "",
  });

  const [units, setUnits] = useState([
    { number: "", status: "available" },
  ]);

  /* =========================
     HANDLERS
  ========================= */
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const addUnit = () => {
    setUnits((prev) => [...prev, { number: "", status: "available" }]);
  };

  const removeUnit = (index) => {
    setUnits((prev) => prev.filter((_, i) => i !== index));
  };

  const updateUnit = (index, key, value) => {
    setUnits((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [key]: value };
      return updated;
    });
  };

  /* =========================
     DATA
  ========================= */
  const states = useMemo(() => State.getStatesOfCountry("IN"), []);
  const cities = useMemo(() => {
    return form.state ? City.getCitiesOfState("IN", form.state) : [];
  }, [form.state]);

  const rentalTypes = [
    "Rental Flat","Rental Plot","Rental Villa","Rental Shop",
    "Rental Office","Rental House","Rental Godown","Rental Land"
  ];

  const resaleTypes = [
    "Resale Flat","Resale Plot","Resale House","Resale Villa",
    "Resale Shop","Resale Office","Resale Farm House",
    "Resale Godown","Resale Bunglow","Resale ShowRoom"
  ];

  const saleTypes = [
    "Sale Flat","Sale Plot","Sale House","Sale Villa",
    "Sale Shop","Sale Office","Sale Farm House","Sale Godown","Sale Bunglow"
  ];

  const categories =
    purpose === "Rent"
      ? rentalTypes
      : purpose === "Resale"
      ? resaleTypes
      : saleTypes;

  const categoryMap = {
    "Rental Flat": "Apartment",
    "Rental Villa": "Villa",
    "Rental House": "House",
    "Rental Shop": "Shop",
    "Rental Office": "Office",
    "Rental Godown": "Godown",
    "Rental Plot": "Plot",
    "Rental Land": "Land",

    "Resale Flat": "Apartment",
    "Resale Villa": "Villa",
    "Resale House": "House",
    "Resale Shop": "Shop",
    "Resale Office": "Office",
    "Resale Godown": "Godown",
    "Resale Plot": "Plot",
    "Resale Bunglow": "Bunglow",
    "Resale ShowRoom": "Shop",

    "Sale Flat": "Apartment",
    "Sale Villa": "Villa",
    "Sale House": "House",
    "Sale Shop": "Shop",
    "Sale Office": "Office",
    "Sale Godown": "Godown",
    "Sale Plot": "Plot",
    "Sale Bunglow": "Bunglow",
  };

  const getLiveLocation = () => {
    if (!navigator.geolocation) return alert("Not supported");

    navigator.geolocation.getCurrentPosition((pos) => {
      setForm((prev) => ({
        ...prev,
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      }));
    });
  };

  const handleContinue = () => {
    if (!form.propertyName || !form.propertyCategory || !form.location) {
      return alert("Please fill required fields");
    }

    const cleanUnits = units.filter((u) => u.number.trim() !== "");

    const payload = {
      ...form,
      purpose,
      propertyCategory: categoryMap[form.propertyCategory] || "Apartment",
      price: Number(form.price),
      expectedPrice: Number(form.expectedPrice),
      area: Number(form.area),
      units: JSON.stringify(cleanUnits),
      contact: {
        ownerName: form.ownerName,
        phone: form.phone,
        email: form.email,
      },
      furnishing: "Unfurnished",
    };

    localStorage.setItem("tempProperty", JSON.stringify(payload));
    navigate("/add-listing-details");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 md:pl-80 flex flex-col">

        <div className="md:hidden p-4">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu />
          </button>
        </div>

        <div className="max-w-5xl mx-auto w-full px-4 md:px-10 py-6 flex-1">

          <h1 className="text-4xl font-bold">Add Property Listing</h1>

          {/* TYPE */}
          <Section title="Listing Type">
            <div className="flex gap-3">
              {["Rent", "Sale", "Resale"].map((p) => (
                <button
                  key={p}
                  onClick={() => {
                    setPurpose(p);
                    setForm((prev) => ({ ...prev, propertyCategory: "" }));
                  }}
                  className={`px-5 py-2 rounded-full ${
                    purpose === p ? "bg-pink-500 text-white" : "bg-white"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </Section>

          {/* CATEGORY */}
          <Section title="Property Category">
            <div className="flex flex-wrap gap-3">
              {categories.map((c) => (
                <div
                  key={c}
                  onClick={() =>
                    setForm((prev) => ({ ...prev, propertyCategory: c }))
                  }
                  className={`px-5 py-2 rounded-full border cursor-pointer ${
                    form.propertyCategory === c
                      ? "bg-pink-500 text-white"
                      : "bg-white"
                  }`}
                >
                  {c}
                </div>
              ))}
            </div>
          </Section>

          {/* PROPERTY NAME */}
          <Section title="Property Name">
            <input
              name="propertyName"
              value={form.propertyName}
              onChange={handleChange}
              className="field"
              placeholder="Enter property name (e.g. 2BHK Flat, Villa, Shop)"
            />
          </Section>

          {/* LOCATION */}
          <Section title="Location">
            <select
              name="state"
              value={form.state}
              onChange={handleChange}
              className="field"
            >
              <option value="">Select State (e.g. Tamil Nadu)</option>
              {states.map((s) => (
                <option key={s.isoCode} value={s.isoCode}>
                  {s.name}
                </option>
              ))}
            </select>

            <select
              name="city"
              value={form.city}
              onChange={handleChange}
              className="field mt-2"
            >
              <option value="">Select City (e.g. Chennai)</option>
              {cities.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </Section>

          {/* ADDRESS */}
          <Section title="Full Address">
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              className="field"
              placeholder="Enter full address (street, area, landmark)"
            />

            <button
              onClick={getLiveLocation}
              className="text-blue-600 mt-2 flex gap-2"
            >
              <MapPin size={16} />
              Detect Current Location
            </button>
          </Section>

          {/* AREA */}
          <Section title="Area">
            <input
              name="area"
              value={form.area}
              onChange={handleChange}
              className="field"
              placeholder="Enter area in sq.ft (e.g. 1200)"
            />
          </Section>

          {/* UNITS */}
          <Section title="Units">
            {units.map((u, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input
                  value={u.number}
                  onChange={(e) => updateUnit(i, "number", e.target.value)}
                  className="field"
                  placeholder="Enter unit number (e.g. A-101)"
                />

                <select
                  value={u.status}
                  onChange={(e) => updateUnit(i, "status", e.target.value)}
                  className="field w-40"
                >
                  <option value="available">Available</option>
                  <option value="booked">Booked</option>
                </select>

                <button onClick={() => removeUnit(i)} className="text-red-500">
                  ✕
                </button>
              </div>
            ))}

            <button onClick={addUnit} className="bg-gray-200 px-4 py-2 rounded">
              + Add Unit
            </button>
          </Section>

          {/* PRICE */}
          <Section title="Price">
            <input
              name="price"
              value={form.price}
              onChange={handleChange}
              className="field"
              placeholder="Enter price (e.g. 5000000)"
            />

            <input
              name="expectedPrice"
              value={form.expectedPrice}
              onChange={handleChange}
              className="field mt-2"
              placeholder="Enter expected price (optional)"
            />
          </Section>

          {/* CONTACT */}
          <Section title="Contact Details">
            <input
              name="ownerName"
              value={form.ownerName}
              onChange={handleChange}
              className="field"
              placeholder="Enter owner full name"
            />

            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="field mt-2"
              placeholder="Enter phone number (e.g. 9876543210)"
            />

            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className="field mt-2"
              placeholder="Enter email address (e.g. abc@gmail.com)"
            />
          </Section>

          {/* SUBMIT */}
          <div className="flex justify-end">
            <button
              onClick={handleContinue}
              className="bg-pink-500 text-white px-6 py-3 rounded-xl flex gap-2"
            >
              Continue <ArrowRight size={18} />
            </button>
          </div>

        </div>

        <Footer />
      </div>

      <style>{`
        .field {
          width: 100%;
          padding: 14px;
          margin-top: 8px;
          border-radius: 10px;
          border: 1px solid #ddd;
        }
      `}</style>
    </div>
  );
}