/** @format */

import { useEffect, useState } from "react";
import Api from "../utils/Api";

const useGetUniqueCategoriesWithImages = () => {
  const [uniqueCategoriesWithImages, setUniqueCategoriesWithImages] = useState(
    []
  );

  useEffect(() => {
    let isMounted = true;

    async function fetchAllProducts() {
      try {
        const limit = 30;
        let skip = 0;
        const products = [];

        while (products.length < 100) {
          const res = await Api(`/products?limit=${limit}&skip=${skip}`);
          products.push(...res.data.products);
          skip += limit;
        }

        const uniqueCategories = [
          ...new Set(products.map((product) => product.category)),
        ];
        const categoryImages = {};

        uniqueCategories.forEach((category) => {
          const categoryProducts = products.filter(
            (product) => product.category === category
          );
          const firstImage =
            categoryProducts.length > 0 ? categoryProducts[0].images[0] : null;
          categoryImages[category] = firstImage;
        });

        const unicCatWithImg = Object.entries(categoryImages).map(
          ([category, image]) => ({
            category,
            image,
          })
        );

        if (isMounted) {
          setUniqueCategoriesWithImages(unicCatWithImg);
        }
      } catch (e) {
        console.log(e);
      }
    }

    fetchAllProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  return { uniqueCategoriesWithImages };
};

export default useGetUniqueCategoriesWithImages;
