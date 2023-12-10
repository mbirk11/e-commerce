/** @format */

import { createContext, useEffect, useState } from "react";
import Api from "../utils/Api";
import { useLocation } from "react-router";
import useLocalStorage from "../hooks/useLocalStorage";
export const ProductContext = createContext();
export const useProductContext = () => useContext(ProductContext);

const ProductContextProvider = ({ children }) => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState({
    limit: 10,
    skip: 0,
  });
  const [active, setActive] = useLocalStorage("activeId", null);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => ({
      ...prevPage,
      skip: prevPage.skip - prevPage.limit,
    }));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => ({
      ...prevPage,
      skip: prevPage.skip + prevPage.limit,
    }));
  };

  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("q");
  const categoryQuery = searchParams.get("category");

  async function fetchProducts(categoryQuery, searchQuery) {
    let url = "/products";

    if (searchQuery) {
      url += `/search?q=${searchQuery}&limit=${currentPage.limit}&skip=${currentPage.skip}`;
    } else if (categoryQuery) {
      url += `/category/${categoryQuery}?limit=${currentPage.limit}&skip=${currentPage.skip}`;
    } else {
      url += `?limit=${currentPage.limit}&skip=${currentPage.skip}`;
    }

    try {
      const response = await Api.get(url);
      setProducts(response.data.products);
      console.log(response.data.products);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    fetchProducts(categoryQuery, searchQuery);
  }, [currentPage, location.search, categoryQuery]);

  return (
    <ProductContext.Provider
      value={{
        products,
        handlePrevPage,
        handleNextPage,
        fetchProducts,
        setActive,
        active,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
