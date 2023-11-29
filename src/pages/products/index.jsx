/** @format */

import { useContext, useEffect, useState } from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";
import Api from "../../utils/Api";
import { Link, useLocation } from "react-router-dom";
import { CategoryContext } from "../../providers/categoryContextProvider";
import useClearParams from "../../hooks/useClearParams";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState({
    limit: 10,
    skip: 0,
  });
  const location = useLocation();

  const { selectedCategoryProducts } = useContext(CategoryContext);

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

  async function fetchProducts(queryParam, page) {
    try {
      let url = `/products`;

      if (queryParam) {
        url += `/search?limit=${page.limit}&skip=${page.skip}&q=${queryParam}`;
      } else {
        url = `/products?limit=${page.limit}&skip=${page.skip}`;
      }
      const response = await Api.get(url);
      const { products: productData } = response.data;
      const categorizedProducts = selectedCategoryProducts.length
        ? selectedCategoryProducts
        : productData;
      setProducts(categorizedProducts);
      console.log(categorizedProducts);
    } catch (e) {
      console.error(e);
    }
  }
  const searchParams = new URLSearchParams(location.search);
  const searchQuary = searchParams.get("q");
  useEffect(() => {
    fetchProducts(searchQuary, currentPage);
  }, [searchQuary, currentPage.skip, selectedCategoryProducts]);

  return (
    <>
      <Header />

      <section
        id="Projects"
        className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
          >
            <Link to={`/products/${product.id}`}>
              <img
                src={product.images[0]}
                alt={product.title}
                className="h-80 w-72 object-contain rounded-t-xl"
              />

              <div className="px-4 py-3 w-72">
                <span className="text-gray-400 mr-3 uppercase text-xs">
                  {product.brand}
                </span>
                <p className="text-lg font-bold text-black truncate block capitalize">
                  {product.title}
                </p>

                <div className="flex items-center">
                  <del>
                    <p className="text-lg font-semibold text-balck cursor-auto my-3">
                      {product.price}$
                    </p>
                  </del>

                  <p className="text-sm text-red-600 cursor-auto ml-2 ">
                    {product.discountPercentage}%off
                  </p>

                  <p className="text-sm font-semibold text-green-600  ml-2 cursor-auto my-3">
                    New Price:
                    {(
                      product.price -
                      (product.price * product.discountPercentage) / 100
                    ).toFixed(2)}
                    $
                  </p>

                  <div className="ml-auto">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-bag-plus"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"
                      />
                      <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </section>
      <div className="flex flex-col items-center pb-8 mt-5">
        <div className="inline-flex mt-2 xs:mt-0">
          <button
            onClick={handlePrevPage}
            className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <svg
              className="w-3.5 h-3.5 me-2 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeidth="2"
                d="M13 5H1m0 0 4 4M1 5l4-4"
              />
            </svg>
            Prev
          </button>
          <button
            onClick={handleNextPage}
            className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Next
            <svg
              className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Products;
