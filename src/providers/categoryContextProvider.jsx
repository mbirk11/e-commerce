/** @format */

import { createContext, useCallback, useEffect, useState } from "react";
import Api from "../utils/Api";
import { useLocation, useNavigate, useParams } from "react-router";
import useClearParams from "../hooks/useClearParams";

export const CategoryContext = createContext();

const CategoryContextProvider = ({ children }) => {
  const [selectedCategoryProducts, setSelectedCategoryProducts] = useState([]);
  const location = useLocation();

  const navigateToCategory = useCallback(
    async (category) => {
      try {
        const url = `/products/category/${category}`; // Set your API URL here
        const res = await Api.get(url);
        setSelectedCategoryProducts(res.data.products);
        console.log(res.data.products);
      } catch (error) {
        console.error(error);
      }
    },
    [setSelectedCategoryProducts]
  );
  const categoryParams = new URLSearchParams(location.search);
  const categoryQuery = categoryParams.get("q");
  useEffect(() => {
    if (categoryQuery) {
      navigateToCategory(categoryQuery);
    }
  }, [categoryQuery]);
  return (
    <CategoryContext.Provider
      value={{
        navigateToCategory,
        selectedCategoryProducts,
        setSelectedCategoryProducts,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryContextProvider;
