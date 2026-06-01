import { configureStore } from "@reduxjs/toolkit";

// ✅ correct path
import propertyReducer from "../features/property/propertySlice";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    property: propertyReducer,
    auth: authReducer,
  },
});