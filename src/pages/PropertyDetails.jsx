import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProperty } from "../features/property/propertySlice";
import dummyProperties from "../data/Properties";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PropertyDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { singleProperty, loading } = useSelector((state) => state.property);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    dispatch(getSingleProperty(id));
  }, [dispatch, id]);

  const fallbackProperty = dummyProperties.find(
    (p) => String(p._id) === String(id),
  );

  const property =
    singleProperty && Object.keys(singleProperty).length > 0
      ? singleProperty
      : fallbackProperty;

  if (loading && !property) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        <p>Loading property...</p>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        <p>Property not found</p>
      </div>
    );
  }

  const images =
    property.images?.length > 0
      ? property.images.map((img) => (typeof img === "string" ? img : img.url))
      : ["https://via.placeholder.com/800x500?text=No+Image"];

  const units = property.units || [];

  const availableUnits = units.filter((u) => u.status === "available").length;
  const bookedUnits = units.filter((u) => u.status === "booked").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#020617] text-white flex flex-col">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 flex-grow">
        {/* IMAGE */}
        <div className="rounded-3xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_25px_80px_rgba(0,0,0,0.6)] hover:shadow-[0_35px_100px_rgba(0,0,0,0.9)] transition duration-500">
          <img
            src={images[activeImage]}
            className="w-full h-[430px] object-cover"
          />

          <div className="flex gap-3 p-4 overflow-x-auto bg-white/5 backdrop-blur-md">
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setActiveImage(i)}
                className={`w-20 h-20 rounded-2xl object-cover cursor-pointer transition-all duration-300
                ${
                  activeImage === i
                    ? "scale-105 shadow-xl ring-2 ring-pink-400"
                    : "opacity-60 hover:opacity-100"
                }`}
              />
            ))}
          </div>
        </div>

        {/* MAIN CARD */}
        <div className="mt-7 rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.6)] hover:shadow-[0_30px_100px_rgba(0,0,0,0.9)] p-6 md:p-8 transition duration-500">
          <h1 className="text-3xl font-semibold">{property.propertyName}</h1>

          <p className="text-gray-400 mt-1">
            📍 {property.location}, {property.city}, {property.state}
          </p>

          <div className="mt-4 flex items-center gap-4">
            <p className="text-3xl font-bold text-pink-400">
              ₹ {property.price}
            </p>

            {property.expectedPrice && (
              <p className="text-gray-500 line-through">
                ₹ {property.expectedPrice}
              </p>
            )}
          </div>

          {/* OVERVIEW */}
          <GlassBox>
            <h2 className="font-semibold mb-2">Overview</h2>
            <p className="text-gray-300">
              {property?.overview ||
                property?.aboutProperty ||
                "No overview available"}
            </p>
          </GlassBox>

          {/* STATS */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
            <SoftStat label="Available" value={availableUnits} color="green" />
            <SoftStat label="Booked" value={bookedUnits} color="red" />
            <SoftStat label="Total" value={units.length} color="blue" />
          </div>

          {/* INFO */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
            <SoftInfo label="Category" value={property.propertyCategory} />
            <SoftInfo label="Purpose" value={property.purpose} />
            <SoftInfo label="Furnishing" value={property.furnishing} />
            <SoftInfo label="Water Supply" value={property.waterSupply} />
            <SoftInfo
              label="Power Backup"
              value={property.powerBackup ? "Yes" : "No"}
            />
            <SoftInfo
              label="Loan"
              value={property.loanAvailable ? "Yes" : "No"}
            />
            <SoftInfo label="Area" value={`${property.area || "-"} sq.ft`} />
          </div>

          {/* AMENITIES */}
          <GlassBox>
            <h2 className="font-semibold mb-3">Amenities</h2>
            <div className="flex flex-wrap gap-2">
              {property.amenities?.length ? (
                property.amenities.map((a, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs rounded-full bg-white/10 backdrop-blur border border-white/10"
                  >
                    {a}
                  </span>
                ))
              ) : (
                <p>No amenities</p>
              )}
            </div>
          </GlassBox>

          {/* UNITS */}
          <div className="mt-8">
            <h2 className="font-semibold mb-4">Units</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {units.length > 0 ? (
                units.map((u, i) => (
                  <div
                    key={i}
                    className={`p-4 rounded-2xl text-center backdrop-blur-xl border border-white/10 shadow-lg hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.05] transition duration-300 ${
                      u.status === "available"
                        ? "bg-green-500/10"
                        : "bg-red-500/10"
                    }`}
                  >
                    <p className="font-bold text-lg">{u.number}</p>
                    <p
                      className={`text-xs mt-2 font-semibold ${
                        u.status === "available"
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {u.status}
                    </p>
                  </div>
                ))
              ) : (
                <p>No units available</p>
              )}
            </div>
          </div>

          {/* CONTACT */}
          {property.contact && (
            <GlassBox>
              <h2 className="font-semibold mb-2">Contact Owner</h2>
              <p>Name: {property.contact.ownerName}</p>
              <p>Phone: {property.contact.phone}</p>
              <p>Email: {property.contact.email}</p>
            </GlassBox>
          )}

          {/* ABOUT PROPERTY (NEW SECTION) */}
          <GlassBox>
            <h2 className="font-semibold mb-2 text-pink-400">About Property</h2>
            <p className="text-gray-300 leading-relaxed">
              {property?.aboutProperty || "No description available"}
            </p>
          </GlassBox>

          {/* BUTTONS */}
          <div className="mt-8 flex flex-col md:flex-row gap-3">
            <button className="w-full py-3 rounded-2xl font-semibold text-white bg-gradient-to-r from-pink-500 to-red-500 shadow-[0_10px_30px_rgba(255,0,100,0.4)] hover:shadow-[0_20px_60px_rgba(255,0,100,0.7)] hover:scale-[1.03] transition">
              🏠 Book Now
            </button>

            <button
              onClick={() =>
                window.open(
                  `https://www.google.com/maps/search/${property.location}`,
                )
              }
              className="w-full py-3 rounded-2xl font-semibold bg-white/10 backdrop-blur border border-white/20 text-pink-400 hover:bg-white/20 transition"
            >
              📍 View on Map
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

/* GLASS BOX */
function GlassBox({ children }) {
  return (
    <div className="mt-6 p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg hover:shadow-2xl transition">
      {children}
    </div>
  );
}

/* INFO CARD */
function SoftInfo({ label, value }) {
  return (
    <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.04] transition duration-300 cursor-pointer">
      <p className="text-xs text-gray-400 mb-1">{label}</p>
      <p className="font-semibold text-white">{value || "-"}</p>
    </div>
  );
}

/* STATS CARD */
function SoftStat({ label, value, color }) {
  const colors = {
    green: "text-green-400",
    red: "text-red-400",
    blue: "text-blue-400",
  };

  return (
    <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.05] transition duration-300 cursor-pointer">
      <p className={`text-2xl font-bold ${colors[color]}`}>{value}</p>
      <p className="text-xs text-gray-400 mt-1">{label}</p>
    </div>
  );
}
