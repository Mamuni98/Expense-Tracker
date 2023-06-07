import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
const ProfileContext = React.createContext({
  name: "",
  updateUserName: () => {},
});
export const ProfileContextProvider = (props) => {
  const [name, setName] = useState("");
  const idtoken = useSelector((state) => state.auth.token);
  const LoggedIn = useSelector((state) => state.auth.IsLoggedIn);

  useEffect(() => {
    if (LoggedIn) {
      const getUserDetail = async () => {
        try {
          const response = await axios.post(
            "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAsYiOMRFfKqpJUw5bwYBUc_DiWf4MyXL0",
            {
              idToken: idtoken,
            }
          );
          const name = response.data.users[0].displayName;
          setName(name);
        } catch (error) {
          console.log(error);
        }
      };
      getUserDetail();
    }
  }, [LoggedIn, idtoken]);

  const updateUserHandler = async (name) => {
    try {
      const response = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAsYiOMRFfKqpJUw5bwYBUc_DiWf4MyXL0",
        {
          idToken: idtoken,
          displayName: name,
          returnSecureToken: true,
        }
      );
      const userName = response.data.displayName;
      alert("Updated Successfully");
      setName(userName);
    } catch (error) {
      console.log(error);
    }
  };
  const contextValue = {
    name: name,
    updateUserName: updateUserHandler,
  };
  return (
    <ProfileContext.Provider value={contextValue}>
      {props.children}
    </ProfileContext.Provider>
  );
};

export default ProfileContext;
