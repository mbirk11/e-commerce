/** @format */

import { Route, Routes } from "react-router";
import "./App.css";
import LogIn from "./pages/logIn";
import Home from "./pages/home";
import ProtectedRouts from "./utils/protectedRouts";
import Products from "./pages/products";
import ContactUs from "./pages/contactUs";
import AboutUs from "./pages/aboutUs";
import AuthContextProvider from "./providers/authContextProvider";
import Register from "./pages/register";

import SingleProduct from "./pages/singleProduct";
import Cart from "./pages/cart";
import ProductContextProvider from "./providers/productContext";
import CartcontextProvider from "./providers/cartContextProvider";
import Payment from "./payment";

import SuccessPayment from "./payment/SuccessPayment";
import UserProfile from "./pages/profile/UserProfile";

function App() {
  return (
    <AuthContextProvider>
      <ProductContextProvider>
        <CartcontextProvider>
          <Routes>
            <Route path="/login" element={<LogIn />} />
            <Route path="/success" element={<SuccessPayment />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/" element={<Home />} />

            <Route path="/" element={<ProtectedRouts />}>
              <Route path="user/:id" element={<UserProfile />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<SingleProduct />} />
              <Route path="/products/cart" element={<Cart />} />
              <Route path="/products/payment" element={<Payment />} />
            </Route>
          </Routes>
        </CartcontextProvider>
      </ProductContextProvider>
    </AuthContextProvider>
  );
}

export default App;
