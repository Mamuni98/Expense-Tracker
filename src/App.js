import React from "react";
import LogIn from "./Components/Authentication/LogIn";
import SignUp from "./Components/Authentication/SignUp";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Components/Pages/Home";
import Profile from "./Components/Pages/Profile";
import TheNavbar from "./Components/Navbar/TheNavbar";
import ForgotPassword from "./Components/Authentication/ForgotPassword";
import Expense from "./Components/Pages/Expense";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { expenseActions } from "./Components/store/expense";
import { profileActions } from "./Components/store/profile";

function App() {
  const IsLoggedIn = useSelector((state) => state.auth.IsLoggedIn);
  const idtoken = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  useEffect(() => {
    if (IsLoggedIn) {
      const getUserDetail = async () => {
        try {
          const response = await axios.post(
            "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAsYiOMRFfKqpJUw5bwYBUc_DiWf4MyXL0",
            {
              idToken: idtoken,
            }
          );
          const name = response.data.users[0].displayName;
          dispatch(profileActions.finalUserName(name));
        } catch (error) {
          console.log(error);
        }
      };
      getUserDetail();
    }
  }, [IsLoggedIn, idtoken, dispatch]);

  useEffect(() => {
    const useremail = localStorage.getItem("email");
    if (useremail) {
      const user = useremail.replace("@", "").replace(".", "");

      const finalDataFromDataBase = async () => {
        try {
          const response = await axios.get(
            `https://expense-tracker-auth-33f29-default-rtdb.firebaseio.com/${user}.json`
          );
          if (response.data) {
            if(response.data.expense === undefined){
              dispatch(expenseActions.savedFinalList({expense:[], totalExpense:0}));
            }
            else{
              dispatch(expenseActions.savedFinalList(response.data));
            }
            
          }
        } catch (error) {
          console.log(error);
        }
      };
      finalDataFromDataBase();
    }
  }, [IsLoggedIn, dispatch]);
  return (
    <>
      <TheNavbar />
      <Routes>
        {!IsLoggedIn && <Route path="/" element={<SignUp />} />}

        {!IsLoggedIn && <Route path="/logIn" element={<LogIn />} />}
        {!IsLoggedIn && (
          <Route path="/forgotPassword" element={<ForgotPassword />} />
        )}
        <Route
          path="/home"
          element={IsLoggedIn ? <Home /> : <Navigate replace to="/" />}
        />
        {IsLoggedIn && <Route path="/profile" element={<Profile />} />}
        {IsLoggedIn && <Route path="/expense" element={<Expense />} />}
        <Route path="*" element={<p>Path not resolved</p>} />
      </Routes>
    </>
  );
}

export default App;
