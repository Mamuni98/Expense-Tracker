import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const AuthContext = React.createContext({
  token: "",
  IsLoggedIn: false,
  LogIn: (token) => {},
  LogOut: () => {},
});
export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);
  const history = useNavigate();
  const updatedLoggedIn = !!token;
  const logInHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };
  const logOutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
    history("/");
  };
  const contextValue = {
    token: token,
    IsLoggedIn: updatedLoggedIn,
    LogIn: logInHandler,
    LogOut: logOutHandler,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
