/** @format */

import { Route, Routes } from "react-router";
import "./App.css";
import LogIn from "./pages/logIn";
import Home from "./pages/home";
import ProtectedRouts from "./utils/ProtectedRouts";
import Products from "./pages/products";
import ContactUs from "./pages/contactUs";
import AboutUs from "./pages/aboutUs";
import AuthContextProvider from "./providers/authContextProvider";
import Register from "./pages/register";
import UserProfile from "./pages/profile/userProfile";

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/" element={<Home />} />
        <Route path="/" element={<ProtectedRouts />}>
          <Route path="user/:id" element={<UserProfile />}></Route>
          <Route path="/products" element={<Products />}></Route>
        </Route>
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
