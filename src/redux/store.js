import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/slices/authSlice";
import cartReducer from "../redux/slices/cartSlice";
// Import other reducers if needed

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    // Add other reducers here
    // e.g., cart: cartReducer
  },
  devTools: true, // Enable Redux DevTools
});

export default store;
