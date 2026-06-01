


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const API = "http://localhost:5000/api/properties";




const API = `${import.meta.env.VITE_API_URL}/api/properties`;

console.log("ENV API:", import.meta.env.VITE_API_URL);


console.log("FINAL API:", API);
// // =======================
// AUTH HEADER
// =======================
const authHeader = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// =======================
// GET ALL
// =======================
export const fetchProperties = createAsyncThunk(
  "property/fetchAll",
  async (params, { rejectWithValue }) => {
    try {
      const res = await axios.get(API, { params });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// =======================
// SINGLE
// =======================
export const getSingleProperty = createAsyncThunk(
  "property/single",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API}/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const createProperty = createAsyncThunk(
  "property/create",
  async ({ formData, token }, { rejectWithValue }) => {
    try {
      console.log("🚀 FORM DATA BEING SENT:");

      // DEBUG: show all formData values
      for (let pair of formData.entries()) {
        console.log(pair[0], "=>", pair[1]);
      }

      const res = await axios.post(API, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("✅ RESPONSE:", res.data);
      return res.data;

    } catch (err) {
      console.log("❌ ERROR RESPONSE:", err.response?.data);
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
// =======================
// UPDATE
// =======================
export const updateProperty = createAsyncThunk(
  "property/update",
  async ({ id, formData, token }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${API}/${id}`, formData, authHeader(token));
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// =======================
// DELETE
// =======================
export const deleteProperty = createAsyncThunk(
  "property/delete",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      await axios.delete(`${API}/${id}`, authHeader(token));
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// =======================
// BOOK FLAT
// =======================
export const bookFlat = createAsyncThunk(
  "property/book",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API}/${id}/book`,
        {},
        authHeader(token)
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// =======================
// SLICE
// =======================
const propertySlice = createSlice({
  name: "property",
  initialState: {
    properties: [],
    singleProperty: null,
    total: 0,
    page: 1,
    pages: 1,
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // =======================
      // FETCH
      // =======================
      .addCase(fetchProperties.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.loading = false;

        state.properties = action.payload?.data || [];
        state.total = action.payload?.total || 0;
        state.page = action.payload?.page || 1;
        state.pages = action.payload?.pages || 1;
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // =======================
      // SINGLE
      // =======================
      .addCase(getSingleProperty.fulfilled, (state, action) => {
        state.singleProperty = action.payload?.data || null;
      })

      // =======================
      // CREATE
      // =======================
      .addCase(createProperty.fulfilled, (state, action) => {
        state.properties.unshift(action.payload?.data);
      })

      // =======================
      // UPDATE
      // =======================
      .addCase(updateProperty.fulfilled, (state, action) => {
        const updated = action.payload?.data;

        const index = state.properties.findIndex(
          (p) => p._id === updated?._id
        );

        if (index !== -1) {
          state.properties[index] = updated;
        }
      })

      // =======================
      // DELETE
      // =======================
      .addCase(deleteProperty.fulfilled, (state, action) => {
        state.properties = state.properties.filter(
          (p) => p._id !== action.payload
        );
      })

      // =======================
      // BOOK FLAT
      // =======================
      .addCase(bookFlat.fulfilled, (state, action) => {
        state.singleProperty = action.payload?.data || null;

        // also update list
        const updated = action.payload?.data;

        const index = state.properties.findIndex(
          (p) => p._id === updated?._id
        );

        if (index !== -1) {
          state.properties[index] = updated;
        }
      });
  },
});

export default propertySlice.reducer;