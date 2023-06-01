import LogIn from "./Components/Authentication/LogIn";
import SignUp from "./Components/Authentication/SignUp";
import {Routes, Route} from "react-router-dom";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignUp/>}/>
        <Route path="/logIn" element={<LogIn/>}/>
      </Routes>
    </>
  );
}

export default App;
