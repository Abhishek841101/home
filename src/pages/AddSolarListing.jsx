import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSolar } from "../features/solar/solarSlice";

import AdminSidebar from "../components/AdminSidebar";
import Footer from "../components/Footer";
import { Menu, Upload, X, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

/* SECTION */
const Section = ({ title, children }) => (
  <div className="mb-6">
    <h2 className="font-bold mb-2 text-lg">{title}</h2>
    {children}
  </div>
);

export default function AddSolarListing() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [form, setForm] = useState({
    image: "",
    phone: "",
    location: "",
    watt: "",
    warranty: "",
    lat: "",
    lng: "",
  });

  const [preview, setPreview] = useState("");

  /* HANDLE CHANGE */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  /* IMAGE */
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setForm((prev) => ({ ...prev, image: file }));
    setPreview(URL.createObjectURL(file));
  };

  /* LOCATION */
  const getLiveLocation = () => {
    if (!navigator.geolocation) return alert("Not supported");

    navigator.geolocation.getCurrentPosition((pos) => {
      setForm((prev) => ({
        ...prev,
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
        location: `${pos.coords.latitude}, ${pos.coords.longitude}`,
      }));
    });
  };

  /* SUBMIT */
  const handleSubmit = async () => {
    try {
      if (!form.image || !form.phone || !form.watt) {
        return alert("❌ Please fill required fields");
      }

      const formData = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });

      await dispatch(createSolar({ formData, token })).unwrap();

      alert("☀️ Solar Vendor Added Successfully");

      navigate("/solar");
    } catch (err) {
      console.log(err);
      alert("❌ Failed to add solar vendor");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 md:ml-72 flex flex-col">
        {/* MOBILE MENU */}
        <div className="md:hidden p-4">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu />
          </button>
        </div>

        <div className="max-w-4xl mx-auto w-full p-4 md:p-8 flex-1">
          <h1 className="text-3xl font-bold mb-6">Add Solar Vendor ☀️</h1>

          <div className="bg-white p-6 rounded-2xl shadow space-y-6">
            {/* IMAGE */}
            <Section title="Upload Image">
              <label className="border-2 border-dashed border-gray-300 p-8 rounded-2xl flex flex-col items-center cursor-pointer">
                <Upload size={28} />
                <input type="file" hidden onChange={handleImage} />
              </label>

              {preview && (
                <div className="relative mt-4 w-40">
                  <img
                    src={preview}
                    className="h-40 w-full object-cover rounded-xl"
                  />
                  <button
                    onClick={() => {
                      setForm((prev) => ({ ...prev, image: "" }));
                      setPreview("");
                    }}
                    className="absolute top-2 right-2 bg-white text-red-500 p-1 rounded-full"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
            </Section>

            {/* PHONE */}
            <Section title="Phone Number">
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="field"
                placeholder="Enter phone number"
              />
            </Section>

            {/* LOCATION */}
            <Section title="Location">
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                className="field"
                placeholder="Enter location"
              />

              <button
                onClick={getLiveLocation}
                className="text-blue-600 mt-2 flex items-center gap-2"
              >
                <MapPin size={16} />
                Fetch Live Location
              </button>
            </Section>

            {/* WATT */}
            <Section title="Solar Capacity (Watt)">
              <input
                name="watt"
                value={form.watt}
                onChange={handleChange}
                className="field"
                placeholder="e.g. 3KW / 5KW / 10KW"
              />
            </Section>

            {/* WARRANTY */}
            <Section title="Warranty">
              <input
                name="warranty"
                value={form.warranty}
                onChange={handleChange}
                className="field"
                placeholder="e.g. 5 Years / 10 Years"
              />
            </Section>

            {/* SUBMIT */}
            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                className="bg-yellow-500 text-white px-6 py-3 rounded-xl font-bold"
              >
                Submit Solar 🚀
              </button>
            </div>
          </div>
        </div>

        <Footer />
      </div>

      {/* STYLE */}
      <style>{`
        .field {
          width: 100%;
          padding: 14px;
          border: 1px solid #ddd;
          border-radius: 12px;
          margin-top: 8px;
        }
      `}</style>
    </div>
  );
}
