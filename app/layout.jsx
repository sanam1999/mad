import { Routes, Route } from "react-router-native";
import Setiins from "./pages/Setiins";
import Home from "./pages/home";
import { useState } from "react";
import About from "./pages/About";
import Post from "./pages/Post";
import Updateprofile from './pages/UpdateProfile'
import Wallet from "./pages/Wallet";
import Volunteer from "./pages/Volunteer";
import ChangePassword from './pages/ChangePassword'
import Singup  from "./pages/Singup";
import Login  from "./pages/Login";
import Profile from './pages/Profile'

import { PATHS } from "@/constants/pathConstants";


export default function Layout() {

  return (
   
      <Routes>
      <Route path={PATHS.SETTING} element={<Setiins  />} />
        <Route path={PATHS.HOME} element={<Home  />} />
        <Route path={PATHS.ABOUT} element={<About />} />
        <Route path={PATHS.WALLET} element={<Wallet/>} />
        <Route path={PATHS.LOGIN} element={<Login />} />
        <Route path={PATHS.POST} element={<Post />} />
        <Route path={PATHS.SINGUP} element={<Singup />} />
        <Route path={PATHS.UPDATEPROFILE} element={< Updateprofile />} />
        <Route path={PATHS.CHANGEPASSWORD} element={< ChangePassword />} />
        <Route path={PATHS.PROFILE} element={< Profile />} />
        <Route path={PATHS.Volunteer} element={< Volunteer />} />
      </Routes>

  );
}


