import { createSlice } from "@reduxjs/toolkit"; // Ensure this import is present

const initialState = {
  userInfo: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem("userInfo");
      state.userInfo = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
