import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPopularProduct } from "../features/popularProduct/popularProductSlice";

import AdminSidebar from "../components/AdminSidebar";
import Footer from "../components/Footer";
import { Menu, Upload, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Section = ({ title, children }) => (
  <div className="mb-6">
    <h2 className="font-bold mb-2 text-lg">{title}</h2>
    {children}
  </div>
);

export default function AddPopularProduct() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [form, setForm] = useState({
    category: "",
    name: "",
    location: "",
    phone: "",
    image: "",
  });

  const [preview, setPreview] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setForm((prev) => ({ ...prev, image: file }));
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    try {
      if (!form.image || !form.name || !form.category || !form.phone) {
        return alert("❌ Please fill all required fields");
      }

      const formData = new FormData();

      formData.append("category", form.category);
      formData.append("name", form.name);
      formData.append("location", form.location);
      formData.append("phone", form.phone);
      formData.append("image", form.image);

      await dispatch(createPopularProduct({ formData, token })).unwrap();

      alert("🔥 Popular Product Added Successfully");

      navigate("/add-popularProduct");
    } catch (err) {
      console.log(err);
      alert("❌ Failed to add product");
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

        <div className="max-w-4xl mx-auto w-full p-4 md:p-8 flex-1">
          <h1 className="text-3xl font-bold mb-6">Add Popular Product ⭐</h1>

          <div className="bg-white p-6 rounded-2xl shadow space-y-6">
            {/* CATEGORY */}
            <Section title="Category">
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="field"
              >
                <option value="">Select Category</option>
                <option value="B2B">B2B</option>
                <option value="REAL STATE">REAL STATE</option>
                <option value="Solar">Solar</option>
                <option value="CarWashing">CarWashing</option>
              </select>
            </Section>

            {/* NAME */}
            <Section title="Product Name">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="field"
              />
            </Section>

            {/* LOCATION */}
            <Section title="Location">
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                className="field"
              />
            </Section>

            {/* PHONE */}
            <Section title="Phone Number">
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="field"
                placeholder="919876543210"
              />
            </Section>

            {/* IMAGE */}
            <Section title="Upload Image">
              <label className="border-2 border-dashed p-8 rounded-2xl flex flex-col items-center cursor-pointer">
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
                      setForm((p) => ({ ...p, image: "" }));
                      setPreview("");
                    }}
                    className="absolute top-2 right-2 bg-white text-red-500 p-1 rounded-full"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
            </Section>

            {/* SUBMIT */}
            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                className="bg-green-500 text-white px-6 py-3 rounded-xl font-bold"
              >
                Submit Product 🚀
              </button>
            </div>
          </div>
        </div>

        <Footer />
      </div>

      <style>{`
        .field {
          width: 100%;
          padding: 14px;
          border: 1px solid #ddd;
          border-radius: 12px;
        }
      `}</style>
    </div>
  );
}
