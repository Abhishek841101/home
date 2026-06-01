import { useState } from "react";
import { useDispatch } from "react-redux";
import { createCarWashing } from "../features/carWashing/carWashingSlice";

export default function AddCarWashing() {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    serviceType: "",
    name: "",
    price: "",
  });

  /* =========================
     HANDLE CHANGE
  ========================= */
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /* =========================
     HANDLE SUBMIT
  ========================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!form.serviceType || !form.name || !form.price) {
      alert("All fields are required");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      alert("No token found. Please login again.");
      return;
    }

    try {
      await dispatch(
        createCarWashing({
          formData: {
            serviceType: form.serviceType,
            name: form.name,
            price: Number(form.price),
          },
          token,
        }),
      ).unwrap();

      alert("Car Washing Added Successfully 🚀");

      // Reset Form
      setForm({
        serviceType: "",
        name: "",
        price: "",
      });
    } catch (err) {
      console.error("❌ ERROR:", err);
      alert(err || "Something went wrong");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4">Add Car Washing Service</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* SERVICE TYPE */}
        <select
          name="serviceType"
          value={form.serviceType}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="">Select Service Type</option>

          <option value="Detailing Services">Detailing Services</option>

          <option value="Repair Services">Repair Services</option>

          <option value="Washing Services">Washing Services</option>

          <option value="Premium Service">Premium Service</option>
        </select>

        {/* NAME */}
        <input
          type="text"
          name="name"
          placeholder="Enter Service Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {/* PRICE */}
        <input
          type="number"
          name="price"
          placeholder="Enter Price"
          value={form.price}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
