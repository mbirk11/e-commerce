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
import SingleProduct from "./pages/singleProduct";
import Cart from "./pages/cart";
import ProductContextProvider from "./providers/ProductContext";
import CartcontextProvider from "./providers/CartcontextProvider";

function App() {
  return (
    <AuthContextProvider>
      <ProductContextProvider>
        <CartcontextProvider>
          <Routes>
            <Route path="/login" element={<LogIn />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/" element={<Home />} />

            <Route path="/" element={<ProtectedRouts />}>
              <Route path="user/:id" element={<UserProfile />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<SingleProduct />} />
              <Route path="/products/cart" element={<Cart />} />{" "}
            </Route>
          </Routes>
        </CartcontextProvider>
      </ProductContextProvider>
    </AuthContextProvider>
  );
}

export default App;
