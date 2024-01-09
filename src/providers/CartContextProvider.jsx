/** @format */

import React, { createContext, useContext, useState } from "react";

import { useNavigate } from "react-router";
import { ProductContext } from "./ProductContext";
import useLocalStorage from "../hooks/useLocalStorage";

export const cartContext = createContext();

const CartcontextProvider = ({ children }) => {
  const { products } = useContext(ProductContext);

  const navigate = useNavigate();
  const [cartItems, setCartItems] = useLocalStorage("cartitem", []);

  const deleteItemFromCart = (itemId) => {
    const newCartData = cartItems.filter((item) => item.id !== itemId);
    setCartItems(newCartData);
  };
  const handleSinglePage = (itemId) => {
    navigate(`/products/${itemId}`);
  };
  const handleAddCart = (product) => {
    const isProductInCart = cartItems.find((item) => item.id === product.id);

    if (!isProductInCart) {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    } else {
      setCartItems(
        cartItems.map((item) => {
          if (item.id === product.id) return { ...item, qty: item.qty + 1 };
        })
      );
    }
  };

  const incItemQty = (itemId) => {
    setCartItems(
      cartItems.map((item) => {
        if (item.id === itemId) {
          return { ...item, qty: item.qty + 1 };
        }
        return item;
      })
    );
  };

  const decItemQty = (itemId) => {
    setCartItems(
      cartItems.map((item) => {
        if (item.id === itemId && item.qty > 0) {
          return { ...item, qty: item.qty - 1 };
        }
        return item;
      })
    );
  };
  const totalQuantity = cartItems.reduce((total, currentItem) => {
    if (currentItem.qty !== undefined) {
      return total + currentItem.qty;
    } else {
      return total;
    }
  }, 0);
  const subTotal = cartItems.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  return (
    <cartContext.Provider
      value={{
        cartItems,
        setCartItems,
        deleteItemFromCart,
        handleSinglePage,
        handleAddCart,
        incItemQty,
        decItemQty,
        totalQuantity,
        subTotal,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export default CartcontextProvider;
