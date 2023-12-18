/** @format */

import React, { useContext, useState } from "react";
import { ProductContext } from "../../providers/ProductContext";
import Api from "../../utils/Api";
import { useNavigate } from "react-router";

const Search = () => {
  const [searchItem, setSearchItem] = useState("");
  const { fetchProducts } = useContext(ProductContext);
  const navigate = useNavigate();
  // useEffect(() => {
  //   onSearch();
  // }, [searchItem]); ძებნა ქლიქის გარეშე
  const onSearch = async () => {
    try {
      const response = await Api(`/products/search?q=${searchItem}`);
      setSearchItem("");
      navigate(`/products?q=${searchItem}`);
      fetchProducts(searchItem);
      console.log(response.data.products);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form>
      <div className="flex w-full">
        <div
          id="dropdown"
          className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
        ></div>
        <div className="relative w-full">
          <input
            type="search"
            value={searchItem}
            onChange={(e) => setSearchItem(e.target.value)}
            className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
            placeholder="Search products"
            required
          />
          <button
            onClick={() => onSearch()}
            type="button"
            className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default Search;
