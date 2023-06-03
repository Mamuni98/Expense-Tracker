import React, { useContext } from "react";
import LogIn from "./Components/Authentication/LogIn";
import SignUp from "./Components/Authentication/SignUp";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Components/Pages/Home";
import Profile from "./Components/Pages/Profile";
import TheNavbar from "./Components/Navbar/TheNavbar";
import AuthContext from "./Components/contexts/auth-context";
import ForgotPassword from "./Components/Authentication/ForgotPassword";

function App() {
  const authCntxt = useContext(AuthContext);
  const { IsLoggedIn } = authCntxt;
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
      </Routes>
    </>
  );
}

export default App;
