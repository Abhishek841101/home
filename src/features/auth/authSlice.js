import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const API = "http://localhost:5000/api/auth";
const API = `${import.meta.env.VITE_API_URL}/api/auth`;


// 🔐 LOGIN
export const loginUser = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API}/login`, data);

      // ✅ Expected response:
      // { success, token, user }

      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Something went wrong" }
      );
    }
  }
);

// 🆕 REGISTER (optional but useful)
export const registerUser = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API}/register`, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Register failed" }
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",

  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
    role: localStorage.getItem("role") || null, // 🔥 IMPORTANT
    loading: false,
    error: null,
  },

  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;

      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    },
  },

  extraReducers: (builder) => {
    builder

      // =========================
      // 🔐 LOGIN
      // =========================
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;

        state.user = action.payload.user;
        state.token = action.payload.token;
        state.role = action.payload.user.role;

        // 💾 Save in localStorage
        localStorage.setItem(
          "user",
          JSON.stringify(action.payload.user)
        );
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("role", action.payload.user.role);
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Login failed";
      })

      // =========================
      // 🆕 REGISTER
      // =========================
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Register failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;