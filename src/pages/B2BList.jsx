import { useState } from "react";
import Footer from "../components/Footer";

export default function AdminPortal() {
  const [form, setForm] = useState({
    name: "",
    desc: "",
    location: "",
    phone: "",
    category: "",
  });

  const [companies, setCompanies] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newCompany = {
      id: Date.now(),
      ...form,
    };

    setCompanies([newCompany, ...companies]);

    setForm({
      name: "",
      desc: "",
      location: "",
      phone: "",
      category: "",
    });
  };

  const deleteCompany = (id) => {
    setCompanies(companies.filter((c) => c.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* HEADER */}
      <div className="bg-blue-700 text-white p-4 text-center text-xl font-bold">
        B2B Company Registration
      </div>

      <div className="flex flex-col md:flex-row gap-6 p-6 max-w-6xl mx-auto w-full">
        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-5 rounded-xl shadow w-full md:w-1/3 space-y-3"
        >
          <h2 className="font-bold text-lg">Add New Company</h2>

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Company Name"
            className="w-full border p-2 rounded"
            required
          />

          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Category (e.g. Steel, IT, Packaging)"
            className="w-full border p-2 rounded"
            required
          />

          <input
            name="desc"
            value={form.desc}
            onChange={handleChange}
            placeholder="Description"
            className="w-full border p-2 rounded"
            required
          />

          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Location"
            className="w-full border p-2 rounded"
            required
          />

          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full border p-2 rounded"
            required
          />

          <button className="w-full bg-blue-600 text-white py-2 rounded">
            Add Company
          </button>
        </form>

        {/* LIST */}
        <div className="flex-1 space-y-4">
          <h2 className="font-bold text-lg">Registered Companies</h2>

          {companies.length === 0 ? (
            <p className="text-gray-500">No companies added yet</p>
          ) : (
            companies.map((c) => (
              <div
                key={c.id}
                className="bg-white p-4 rounded-xl shadow flex justify-between"
              >
                <div>
                  <h3 className="font-bold">{c.name}</h3>
                  <p className="text-sm text-gray-600">{c.desc}</p>
                  <p className="text-sm">📍 {c.location}</p>
                  <p className="text-sm">📞 {c.phone}</p>
                  <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                    {c.category}
                  </span>
                </div>

                <button
                  onClick={() => deleteCompany(c.id)}
                  className="text-red-600 font-bold"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
