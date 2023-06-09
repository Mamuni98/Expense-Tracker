import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./auth";
import ExpenseReducer from "./expense";
import DarkModeReducer from "./dark-mode";
import ProfileReducer from './profile';
const store = configureStore({
  reducer: {
    auth: AuthReducer,
    expenses: ExpenseReducer,
    darkMode: DarkModeReducer,
    profile: ProfileReducer,
  },
});

export default store;
