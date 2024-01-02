/** @format */

import { useEffect, useState } from "react";
import Api from "../utils/Api";
import useCategoryFetch from "./useCategoryFetch";

const useGetUniqueCategoriesWithImages = () => {
  const { categories } = useCategoryFetch();
  const [uniqueCategories, setUniqueCategories] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await Api("/products?limit=100");
        const products = response.data.products;
        const uniqueCategoriesData = {};
        products.forEach((product) => {
          const { category, images } = product;
          if (category && images && !uniqueCategoriesData[category]) {
            uniqueCategoriesData[category] = images[0];
          }
        });

        setUniqueCategories(uniqueCategoriesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    console.log("uniq", uniqueCategories);
    fetchData();
  }, []);
  const homeCategory = Object.keys(uniqueCategories);
  const homeImages = Object.values(uniqueCategories);
  return { homeCategory, homeImages };
};

export default useGetUniqueCategoriesWithImages;
