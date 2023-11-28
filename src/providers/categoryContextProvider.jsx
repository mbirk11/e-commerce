/** @format */

import { createContext, useEffect, useState } from "react";
import Api from "../utils/Api";
import { useParams } from "react-router";

export const CategoryContext = createContext();
const { category } = useParams;

const CategoryContextProvider = ({ children }) => {
  const [selectedCategoryProducts, setSelectedCategoryProducts] = useState([]);

  const onChangeCategory = async (category, limit = 5, skip = 0) => {
    try {
      const url = `/products/category/${category}?limit=${limit}&skip=${skip}`;
      const res = await Api.get(url);
      setSelectedCategoryProducts(res.data.products);
      console.log(res.data.products);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (category) onChangeCategory(category);
  }, [category]);
  return (
    <CategoryContext.Provider
      value={{
        onChangeCategory,
        selectedCategoryProducts,
        setSelectedCategoryProducts,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryContextProvider;
