import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token, user, loading, error } = useSelector(
    (state) => state.auth
  );

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // ✅ redirect after login
  useEffect(() => {
    if (token) {
      if (user?.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
  }, [token]);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      return alert("Fill all fields");
    }

    dispatch(loginUser(form)); // 🔥 MAIN CONNECT
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-md w-[350px]"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Login
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-3">{error}</p>
        )}

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
          {loading ? "Logging..." : "Login"}
        </button>

        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}