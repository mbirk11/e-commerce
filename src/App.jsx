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

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/" element={<Home />} />
        <Route path="/" element={<ProtectedRouts />}>
          <Route path="/products" element={<Products />}></Route>
        </Route>
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
