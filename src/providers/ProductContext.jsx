/** @format */

import { createContext, useEffect, useState } from "react";
import Api from "../utils/Api";
import { useLocation } from "react-router";
export const ProductContext = createContext();
export const useProductContext = () => useContext(ProductContext);

const ProductContextProvider = ({ children }) => {
  const location = useLocation();
  const [products, setProducts] = useState([]);

  const [range, setRange] = useState({ from: 1, to: 5000 });

  const [currentPage, setCurrentPage] = useState({
    limit: 10,
    skip: 0,
  });
  const [totalPage, setTotalPage] = useState(1);

  const handlePageChange = (value) => {
    setCurrentPage({
      ...currentPage,
      skip: (value - 1) * currentPage.limit,
    });
    fetchProducts(categoryQuery, searchQuery);
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
      const totalPages = Math.ceil(response.data.total / currentPage.limit);
      setTotalPage(totalPages);
    } catch (e) {
      console.error(e);
    }
  }

  const filteredProducts = products.filter((product) => {
    return product.price >= range.from && product.price <= range.to;
  });
  const handleChangerange = (event) => {
    const newValue = parseInt(event.target.value, 10);
    setRange({ ...range, to: newValue });
  };
  const [sortedType, setSortedType] = useState("");

  const sortedProducts =
    sortedType === "priceUp"
      ? [...filteredProducts].sort((a, b) => a.price - b.price)
      : sortedType === "priceDown"
      ? [...filteredProducts].sort((a, b) => b.price - a.price)
      : sortedType === "rating"
      ? [...filteredProducts].sort((a, b) => b.rating - a.rating)
      : products;

  const handleCheckboxChange = (value) => {
    setSortedType(value);
  };
  const handleClear = () => {
    setRange({ from: 0, to: 5000 });
    setSortedType("");
  };

  console.log("Sorted products:", sortedProducts);

  useEffect(() => {
    fetchProducts(categoryQuery, searchQuery);
  }, [currentPage, location.search, categoryQuery, totalPage]);

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        fetchProducts,
        setCurrentPage,
        currentPage,
        categoryQuery,
        handlePageChange,
        range,
        setRange,
        totalPage,
        handleChangerange,
        handleCheckboxChange,
        filteredProducts,
        sortedProducts,
        handleClear,
      }}
    >
      <div>{children}</div>
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
