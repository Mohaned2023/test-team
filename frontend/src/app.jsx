import Users from "./Test/Users";
import SignUp from "./Test/Sign-up";
import {BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./Test/Sign-in";

export function App() {
  
  return(
    <>
    {/* <Users/> */}
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/users" element={<Users />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
    </>
  )
  
}
