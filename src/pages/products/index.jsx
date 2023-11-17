/** @format */

import { useEffect, useState } from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);
  async function fetchProducts() {
    try {
      const response = await axios.get(
        "https://api.escuelajs.co/api/v1/products"
      );
      const productData = response.data;
      setProducts(productData);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      <Header />
      {/* 
      <div className="flex flex-wrap bg-gray-100 p-4 ">
        {products.map((product) => (
          <div key={product.id}>
            <div className="flex  bg-gray-100">
              <div className="max-w-xs cursor-pointer rounded-lg bg-white p-2 shadow duration-150 hover:scale-105 hover:shadow-md aspect-w-16 aspect-h-9 ">
                <img
                  className="w-full rounded-lg object-cover aspect-w-16 aspect-h-9"
                  src={product.images}
                  alt={product.title}
                />
                <p className="my-4 pl-4 font-bold text-gray-500">
                  {product.title}
                </p>
                <p className="mb-4 ml-4 text-xl font-semibold text-gray-800">
                  Price:{product.price}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div> */}
      <div
        tabindex="0"
        className="focus:outline-none flex flex-wrap p-4 bg-gray-100"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="flex flex-wrap items-center lg:justify-between justify-center "
          >
            <div
              tabindex="0"
              className="focus:outline-none mx-2 w-72 xl:mb-0 mb-8"
            >
              <div className="shadow duration-150 hover:scale-105 hover:shadow max-w-xs cursor-pointer ">
                <img
                  alt={product.title}
                  src={product.images}
                  tabindex="0"
                  className="focus:outline-none w-full h-44 rounded-lg"
                />
              </div>
              <div className="bg-white">
                <div className="flex items-center justify-between px-4 pt-4">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      tabindex="0"
                      className="focus:outline-none"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="#2c3e50"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M9 4h6a2 2 0 0 1 2 2v14l-5-3l-5 3v-14a2 2 0 0 1 2 -2"></path>
                    </svg>
                  </div>
                  <div className="bg-yellow-200 py-1.5 px-6 rounded-full">
                    <p
                      tabindex="0"
                      className="focus:outline-none text-xs text-yellow-700"
                    >
                      Featured
                    </p>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center">
                    <h2
                      tabindex="0"
                      className="focus:outline-none text-lg font-semibold"
                    >
                      {product.title}
                    </h2>
                    <p
                      tabindex="0"
                      className="focus:outline-none text-xs text-gray-600 pl-5"
                    >
                      4 days ago
                    </p>
                  </div>
                  <p
                    tabindex="0"
                    className="focus:outline-none text-xs text-gray-600 mt-2"
                  >
                    The Apple iPhone XS is available in 3 colors with 64GB
                    memory. Shoot amazing videos
                  </p>
                  <div className="flex mt-4">
                    <div>
                      <p
                        tabindex="0"
                        className="focus:outline-none text-xs text-gray-600 px-2 bg-gray-200 py-1"
                      >
                        12 months warranty
                      </p>
                    </div>
                    <div className="pl-2">
                      <p
                        tabindex="0"
                        className="focus:outline-none text-xs text-gray-600 px-2 bg-gray-200 py-1"
                      >
                        Complete box
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-4">
                    <h2
                      tabindex="0"
                      className="focus:outline-none text-indigo-700 text-xs font-semibold"
                    >
                      Bay Area, San Francisco
                    </h2>
                    <h3
                      tabindex="0"
                      className="focus:outline-none text-indigo-700 text-xl font-semibold"
                    ></h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Products;
