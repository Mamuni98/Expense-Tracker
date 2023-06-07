import { createSlice } from "@reduxjs/toolkit";

const authInitialState = {
  IsLoggedIn: !!localStorage.getItem("token"),
  token: localStorage.getItem("token"),
};

const authSlice = createSlice({
  name: "authentication",
  initialState: authInitialState,
  reducers: {
    logIn(state, action) {
      localStorage.setItem("token", action.payload);
      state.IsLoggedIn = true;
      state.token = action.payload;
    },
    logOut(state) {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      state.IsLoggedIn = false;
      state.token = null;
    },
  },
});
export const authActions = authSlice.actions;

export default authSlice.reducer;
