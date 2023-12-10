/** @format */

import React, { createContext, useContext, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

import { useNavigate } from "react-router";
import { ProductContext } from "./ProductContext";

export const cartContext = createContext();

const CartcontextProvider = ({ children }) => {
  const { products, setActive } = useContext(ProductContext);

  const navigate = useNavigate();
  const [cartItem, setCartItem] = useLocalStorage("cartItem", []);

  const deleteItemFromCart = (itemId) => {
    const newCartData = cartItem.filter((item) => item.id !== itemId);
    setCartItem(newCartData);
  };
  const handleSinglePage = (itemId) => {
    navigate(`/products/${itemId}`);
  };
  const handleAddCart = (productId) => {
    // Check if the productId is already in the cart
    const isProductInCart = cartItem.some((item) => item.id === productId);
    setActive(productId);
    // If the product is not in the cart, add it
    if (!isProductInCart) {
      const productToAdd = products.find((item) => item.id === productId);
      if (productToAdd) {
        setCartItem([...cartItem, productToAdd]); // Update the cart items in context
      }
    }
  };
  const productsQty = () => {
    const itemInStock = cartItem.map((item) => item.stock);
  };
  return (
    <cartContext.Provider
      value={{
        cartItem,
        setCartItem,
        deleteItemFromCart,
        handleSinglePage,
        handleAddCart,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export default CartcontextProvider;
