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
  const [userProfile, setUserProfile] = useState(true);
  const history = useNavigate();
  const updatedLoggedIn = !!token;

  const logInHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };
  const logOutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("userName");
    //history("/");
  };
  const addedUserProfileHadler = () => {
    const userName = localStorage.getItem("userName");
   if(userName){
    if (userName.length === 0) {
      setUserProfile(true);
    }
    else{
      setUserProfile(false);
    }
  }
  };
  const contextValue = {
    token: token,
    IsLoggedIn: updatedLoggedIn,
    LogIn: logInHandler,
    LogOut: logOutHandler,
    addedUserProfile: addedUserProfileHadler,
    userProfile: userProfile,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

//export default AuthContext;
// const getUserDetail = async () => {
//   try {
//     const response = await axios.post(
//       "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAsYiOMRFfKqpJUw5bwYBUc_DiWf4MyXL0",
//       {
//         idToken: idtoken,
//       }
//     );
//     //console.log(response.data);
//     if (response.data) {
//       const name = response.data.users[0].displayName;
//       setUserDisplay(name);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };
// getUserDetail();