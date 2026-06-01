import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/api/popularproduct`;
/* =========================
   CREATE (SOLAR STYLE)
========================= */
export const createPopularProduct = createAsyncThunk(
  "popularProduct/create",
  async ({ formData, token }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(API, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      return data.popularProduct;
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
export const fetchPopularProducts = createAsyncThunk(
  "popularProduct/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(API);
      return data.popularProducts;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

/* =========================
   DELETE
========================= */
export const deletePopularProduct = createAsyncThunk(
  "popularProduct/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API}/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

/* =========================
   SLICE
========================= */
const popularProductSlice = createSlice({
  name: "popularProduct",
  initialState: {
    popularProductList: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      /* CREATE */
      .addCase(createPopularProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPopularProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.popularProductList.unshift(action.payload);
      })
      .addCase(createPopularProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* FETCH */
      .addCase(fetchPopularProducts.fulfilled, (state, action) => {
        state.popularProductList = action.payload;
      })

      /* DELETE */
      .addCase(deletePopularProduct.fulfilled, (state, action) => {
        state.popularProductList = state.popularProductList.filter(
          (item) => item._id !== action.payload
        );
      });
  },
});

export default popularProductSlice.reducer;