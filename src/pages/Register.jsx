import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/auth/authSlice";

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  // ✅ After register → login page
  useEffect(() => {
    if (!loading && !error) {
      // optional redirect logic handled after submit
    }
  }, [loading, error]);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      return alert("All fields are required");
    }

    const res = await dispatch(registerUser(form));

    // ✅ Success check
    if (res.meta.requestStatus === "fulfilled") {
      alert("Registered successfully ✅");
      navigate("/login");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-2xl shadow-md w-[350px]"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Register
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-3">{error}</p>
        )}

        <input
          type="text"
          placeholder="Name"
          className="w-full p-3 border rounded-lg mb-4"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border rounded-lg mb-4"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded-lg mb-4"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-sm text-center mt-4">
          Already have account?{" "}
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}