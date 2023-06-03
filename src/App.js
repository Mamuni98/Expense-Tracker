import LogIn from "./Components/Authentication/LogIn";
import SignUp from "./Components/Authentication/SignUp";
import {Routes, Route} from "react-router-dom";
import Home from "./Components/Pages/Home";
import Profile from "./Components/Pages/Profile";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignUp/>}/>
        <Route path="/logIn" element={<LogIn/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/profile" element={<Profile/>}/>

      </Routes>
    </>
  );
}

export default App;
