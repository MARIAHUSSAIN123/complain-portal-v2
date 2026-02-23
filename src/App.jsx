import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Admin from "./Pages/Admin";
import Complain from "./Pages/Complain";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import MyComplain from "./Pages/MyComplain";
import SignUp from "./Pages/Signup";

export default function App() {
  return (
    <BrowserRouter>
   <Routes>
  <Route path='/' element={<SignUp/>}/>
  <Route path='/login' element={<Login/>}/>
  <Route path='/dashboard' element={<Dashboard/>}/>
  <Route path='/complain' element={<Complain/>}/>
  <Route path='/mycomplain' element={<MyComplain/>}/>
  <Route path='/admin' element={<Admin/>}/>
</Routes>
    </BrowserRouter>
  );
}
