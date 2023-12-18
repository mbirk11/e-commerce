/** @format */

import React, { useEffect, useState } from "react";
import Api from "../utils/Api";

const useCategoryFetch = (fetchProducts, navigate) => {
  const [categories, setCategories] = useState([]);
  const indexToShow = [0, 1, 2, 6, 16, 17, 18, 19]; //სასურველი კატეგორიი
  const indexForHome = [3, 4, 5];
  const indexForHomeTwo = [1, 7];
  const [active, setActive] = useState("");
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await Api(`/products/categories/`);
        const productsCategories = response.data;
        setCategories(productsCategories);
      } catch (e) {
        console.log(e);
      }
    }
    fetchCategories();
  }, []);
  const handleCategoryClick = async (categoryQuery) => {
    setActive(categoryQuery);
    if (fetchProducts) {
      await fetchProducts(categoryQuery, "");
    }
    if (navigate) {
      navigate(`/products?category=${categoryQuery}`);
    }
  };

  return {
    categories,
    indexToShow,
    handleCategoryClick,
    active,
    indexForHome,
    indexForHomeTwo,
  };
};

export default useCategoryFetch;
