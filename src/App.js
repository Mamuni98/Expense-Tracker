import React, {} from "react";
import LogIn from "./Components/Authentication/LogIn";
import SignUp from "./Components/Authentication/SignUp";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Components/Pages/Home";
import Profile from "./Components/Pages/Profile";
import TheNavbar from "./Components/Navbar/TheNavbar";
import ForgotPassword from "./Components/Authentication/ForgotPassword";
import Expense from "./Components/Pages/Expense";
import { useSelector } from "react-redux";

function App() {
 const IsLoggedIn = useSelector((state) => state.auth.IsLoggedIn);
  return (
    <>
      <TheNavbar />
      <Routes>
        {!IsLoggedIn && <Route path="/" element={<SignUp />} />}
        {!IsLoggedIn && <Route path="/logIn" element={<LogIn />} />}
        {!IsLoggedIn && <Route path="/forgotPassword" element={<ForgotPassword />} />}
        <Route
          path="/home"
          element={IsLoggedIn ? <Home /> : <Navigate replace to="/" />}
        />
        {IsLoggedIn && <Route path="/profile" element={<Profile />} />}
        {IsLoggedIn && <Route path="/expense" element={<Expense />} />}
      </Routes>
    </>
  );
}

export default App;
