import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/* =========================
   BASE URL (IMPORTANT FIX)
========================= */
// const API = "http://localhost:5000/api/solar";
const API = `${import.meta.env.VITE_API_URL}/api/solar`;
/* =========================
   CREATE SOLAR VENDOR
========================= */
export const createSolar = createAsyncThunk(
  "solar/createSolar",
  async ({ formData, token }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(API, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      return data.solar; // IMPORTANT FIX
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

/* =========================
   SLICE
========================= */
const solarSlice = createSlice({
  name: "solar",
  initialState: {
    solarList: [],
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(createSolar.pending, (state) => {
        state.loading = true;
      })
      .addCase(createSolar.fulfilled, (state, action) => {
        state.loading = false;

        // push only solar object (not full response)
        state.solarList.unshift(action.payload);
      })
      .addCase(createSolar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default solarSlice.reducer;