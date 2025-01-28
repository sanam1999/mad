import { Routes, Route } from "react-router-native";
import Setiins from "./pages/Setiins";
import Home from "./pages/home";
import { useState } from "react";
import About from "./pages/About";
import Post from "./pages/Post";
import Updateprofile from './pages/UpdateProfile'
import Wallet from "./pages/Wallet";
import Solution from "./pages/Solution";
import ChangePassword from './pages/ChangePassword'
import Singup  from "./pages/Singup";
import Login  from "./pages/Login";
import Profile from './pages/Profile'


import { useNavigate } from "react-router-native"; 
import { PATHS } from "@/constants/pathConstants";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


export default function Layout() {
  const [name, setName] = useState("sanam");
  // Initialize QueryClient
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  return (
    <QueryClientProvider client={client}>
      <Routes>
      <Route path={PATHS.SETTING} element={<Setiins changename={setName} />} />
        <Route path={PATHS.HOME} element={<Home username={name} />} />
        <Route path={PATHS.ABOUT} element={<About username={name} />} />
        <Route path={PATHS.WALLET} element={<Wallet/>} />
        <Route path={PATHS.LOGIN} element={<Login />} />
        <Route path={PATHS.POST} element={<Post />} />
        <Route path={PATHS.SINGUP} element={<Singup />} />
        <Route path={PATHS.UPDATEPROFILE} element={< Updateprofile />} />
        <Route path={PATHS.CHANGEPASSWORD} element={< ChangePassword />} />
        <Route path={PATHS.PROFILE} element={< Profile />} />
      </Routes>
    </QueryClientProvider>
  );
}


