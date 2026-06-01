

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProperty } from "../features/property/propertySlice";

import AdminSidebar from "../components/AdminSidebar";
import Footer from "../components/Footer";
import { Menu, Upload, X } from "lucide-react";

export default function AddListingDetails() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);
  const [temp, setTemp] = useState(null);

  const [form, setForm] = useState({
    furnishing: "",
    waterSupply: "",
    powerBackup: "",
    loanAvailable: false,
    aboutProperty: "",
    amenities: [],
    facing: "", // ✅ added
    totalUnits: "",
    availableUnits: "",
  });

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("tempProperty"));

    if (!data) {
      alert("⚠️ First fill basic details");
      window.location.href = "/add-listing";
      return;
    }

    setTemp(data);
  }, []);

  // IMAGE
  const handleImage = (e) => {
    const selected = Array.from(e.target.files);

    if (files.length + selected.length > 5) {
      alert("❌ Max 5 images allowed");
      return;
    }

    setFiles((prev) => [...prev, ...selected]);
    const preview = selected.map((f) => URL.createObjectURL(f));
    setImages((prev) => [...prev, ...preview]);
  };

  const removeImage = (i) => {
    setImages((prev) => prev.filter((_, index) => index !== i));
    setFiles((prev) => prev.filter((_, index) => index !== i));
  };

  // AUTO OVERVIEW


// AUTO OVERVIEW (UPDATED + PRO LEVEL)

const generateOverview = () => {
  if (!temp) return "";

  // ✅ DEFINE HERE (FIX)
  const parsedUnits = (() => {
    try {
      const data = temp?.units;

      if (Array.isArray(data)) return data;

      if (typeof data === "string") {
        return JSON.parse(data);
      }

      return [];
    } catch (err) {
      return [];
    }
  })();

  const totalUnits = parsedUnits.length;

  const availableUnits = parsedUnits.filter(
    (u) => u.status === "available"
  ).length;

  const bookedUnits = parsedUnits.filter(
    (u) => u.status === "booked"
  ).length;

  const occupancy =
    totalUnits > 0
      ? Math.round((bookedUnits / totalUnits) * 100)
      : 0;

  return `This ${temp.propertyCategory} is available for ${temp.purpose} in ${temp.location}.

Area: ${temp.area || "N/A"} sq.ft
Price: ₹${temp.price || "N/A"}
Expected Price: ₹${temp.expectedPrice || "N/A"}

Furnishing: ${temp.furnishing || "Unfurnished"}
Water Supply: ${temp.waterSupply || "Standard"}
Power Backup: ${temp.powerBackup === "Yes" ? "Available" : "No"}
Facing: ${temp.facing || "Not specified"}

Total Units: ${totalUnits}
Available Units: ${availableUnits}
Booked Units: ${bookedUnits}

Occupancy Status: ${
    totalUnits ? `${occupancy}% Occupied` : "N/A"
  }`;
};
  const mapFurnishing = (val) => {
    if (val === "Fully Furnished") return "Furnished";
    if (val === "Semi Furnished") return "Semi-Furnished";
    return "Unfurnished";
  };

  // SUBMIT
  const handleSubmit = async () => {
    try {
      if (!temp) return alert("Missing data");

      if (files.length === 0) {
        return alert("❌ Upload at least 1 image");
      }

      if (form.availableUnits > form.totalUnits) {
        return alert("❌ Available units cannot exceed total units");
      }

      const payload = {
        ...temp,
        furnishing: mapFurnishing(form.furnishing),
        propertyCategory: temp.propertyCategory,
        waterSupply: form.waterSupply,
        powerBackup: form.powerBackup === "Yes",
        loanAvailable: form.loanAvailable,

        // ✅ NEW
        facing: form.facing,
        amenities: form.amenities,

        overview: generateOverview(),
        aboutProperty: form.aboutProperty,
        totalUnits: Number(form.totalUnits || 0),
        availableUnits: Number(form.availableUnits || 0),
      };

      const formData = new FormData();

      Object.entries(payload).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((v) => formData.append(key, v));
        } else if (typeof value === "object") {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value);
        }
      });

      files.forEach((file) => formData.append("images", file));

      await dispatch(createProperty({ formData, token })).unwrap();

      alert("✅ Property Added Successfully");
      localStorage.removeItem("tempProperty");
      window.location.href = "/properties";

    } catch (err) {
      console.error(err);
      alert("❌ Failed to add property");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 md:ml-72 flex flex-col">
        <div className="md:hidden p-4">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu />
          </button>
        </div>

        <div className="max-w-5xl mx-auto w-full p-4 md:p-8 flex-1">
          <h1 className="text-3xl font-bold mb-6">
            Complete Property Details
          </h1>

          <div className="space-y-8 bg-white p-6 rounded-2xl shadow">

            {/* IMAGE */}
            <div>
              <h2 className="font-bold text-lg mb-3">Property Images</h2>

              <label className="border-2 border-dashed border-gray-300 hover:border-pink-500 p-8 rounded-2xl flex flex-col items-center cursor-pointer bg-gray-50">
                <Upload size={28} />
                <input type="file" multiple hidden onChange={handleImage} />
              </label>

              {images.length > 0 && (
                <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mt-4">
                  {images.map((img, i) => (
                    <div key={i} className="relative group">
                      <img src={img} className="h-24 w-full object-cover rounded-xl" />
                      <button
                        onClick={() => removeImage(i)}
                        className="absolute top-2 right-2 bg-white text-red-500 rounded-full p-1 opacity-0 group-hover:opacity-100"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            
            {/* FEATURES */}
            <SelectBox title="Furnishing" field="furnishing"
              options={["Fully Furnished", "Semi Furnished", "Unfurnished"]}
              form={form} setForm={setForm} />

            <SelectBox title="Water Supply" field="waterSupply"
              options={["24/7", "Borewell", "Municipal"]}
              form={form} setForm={setForm} />

            <SelectBox title="Power Backup" field="powerBackup"
              options={["Yes", "No"]}
              form={form} setForm={setForm} />

            {/* FACING */}
            <SelectBox title="Facing" field="facing"
              options={["East", "West", "North", "South"]}
              form={form} setForm={setForm} />

            {/* AMENITIES */}
            <div>
              <h3 className="font-semibold mb-3">Amenities</h3>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {["Gym","Parking","Lift","Security","Swimming Pool","Garden","Power Backup","Club House","Play Area"]
                  .map((item) => {
                    const active = form.amenities.includes(item);

                    return (
                      <div
                        key={item}
                        onClick={() => {
                          const exists = form.amenities.includes(item);
                          setForm((prev) => ({
                            ...prev,
                            amenities: exists
                              ? prev.amenities.filter((a) => a !== item)
                              : [...prev.amenities, item],
                          }));
                        }}
                        className={`px-4 py-3 rounded-xl border cursor-pointer ${
                          active ? "bg-pink-500 text-white" : "bg-white"
                        }`}
                      >
                        {item}
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* DESCRIPTION */}
            <textarea className="input bg-gray-100"
              value={generateOverview()} readOnly />

            <textarea className="input"
              placeholder="Write about property..."
              onChange={(e) => setForm({ ...form, aboutProperty: e.target.value })} />

            {/* SUBMIT */}
            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                className="bg-pink-500 text-white px-8 py-3 rounded-xl"
              >
                Submit Property 🚀
              </button>
            </div>

          </div>
        </div>

        <Footer />
      </div>

      <style>{`
        .input {
          width: 100%;
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 12px;
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
}

// SELECT BOX
function SelectBox({ title, field, options, form, setForm }) {
  return (
    <div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <div className="flex flex-wrap gap-3">
        {options.map((o) => {
          const active = form[field] === o;
          return (
            <button
              key={o}
              onClick={() => setForm({ ...form, [field]: o })}
              className={`px-4 py-2 rounded-full border ${
                active ? "bg-pink-500 text-white" : "bg-white"
              }`}
            >
              {o}
            </button>
          );
        })}
      </div>
    </div>
  );
}