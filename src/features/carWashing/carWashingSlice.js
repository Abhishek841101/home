import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const API = "http://localhost:5000/api/carwashing";
const API = `${import.meta.env.VITE_API_URL}/api/carwashing`;
/* =========================
   CREATE
========================= */
export const createCarWashing = createAsyncThunk(
  "carwashing/create",
  async ({ formData, token }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${API}/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return data.carwashing;

    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

/* =========================
   FETCH
========================= */
export const fetchCarWashings = createAsyncThunk(
  "carwashing/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(API);

      return data.carwashing;

    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

/* =========================
   DELETE
========================= */
export const deleteCarWashing = createAsyncThunk(
  "carwashing/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API}/${id}`);

      return id;

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
const carWashingSlice = createSlice({
  name: "carwashing",

  initialState: {
    carWashingList: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      /* CREATE */
      .addCase(createCarWashing.pending, (state) => {
        state.loading = true;
      })

      .addCase(createCarWashing.fulfilled, (state, action) => {
        state.loading = false;

        state.carWashingList.unshift(action.payload);
      })

      .addCase(createCarWashing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* FETCH */
      .addCase(fetchCarWashings.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchCarWashings.fulfilled, (state, action) => {
        state.loading = false;

        state.carWashingList = action.payload;
      })

      .addCase(fetchCarWashings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* DELETE */
      .addCase(deleteCarWashing.fulfilled, (state, action) => {
        state.carWashingList =
          state.carWashingList.filter(
            (item) => item._id !== action.payload
          );
      });
  },
});

export default carWashingSlice.reducer;