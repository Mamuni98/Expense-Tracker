import { createSlice } from "@reduxjs/toolkit";

const initialThemeState = {
  theme: "dark-mode",
};
const darkModeSlice = createSlice({
  name: "darkMode",
  initialState: initialThemeState,
  reducers: {
    setAppTheme(state, action) {
      state.theme = action.payload;
    },
  },
});

export const darkModeActions = darkModeSlice.actions;

export default darkModeSlice.reducer;
