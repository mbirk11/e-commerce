/** @format */

import React, { useContext, useEffect, useState } from "react";

import Api from "../../utils/Api";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { Link, useNavigate, useParams } from "react-router-dom";

import Rating from "../../components/raiting";
import Products from "../products";
import { cartContext } from "../../providers/CartContextProvider";

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState("");
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const navigate = useNavigate();

  const { handleAddCart, cartItems, incItemQty, decItemQty } =
    useContext(cartContext);

  const handlepPrevImage = () => {
    setCurrentImgIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };
  const handlepNextImage = () => {
    setCurrentImgIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };
  const handleImageClick = (curIndex) => {
    setCurrentImgIndex(curIndex);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await Api.get(`/products/${id}`);
        setProduct(res.data);

        console.log(res.data);
      } catch (error) {
        console.error("User Data fetching error:", error);
      }
    }
    console.log("Cart Items:", cartItems); // Log cartItems here
    fetchData();
  }, [id]);
  const currentProduct = cartItems.find((item) => item.id === product.id);

  return (
    <div>
      <Header />

      {product && (
        <section className="py-10 font-poppins dark:bg-gray-800">
          <div className="max-w-6xl px-4 mx-auto">
            <div className="flex flex-wrap mb-24 -mx-4">
              <div className="w-full px-4 mb-8 md:w-1/2 md:mb-0">
                <div className="sticky top-0 overflow-hidden ">
                  <div className="relative mb-6 lg:mb-10 lg:h-96">
                    <a
                      className="absolute left-0 transform lg:ml-2 top-1/2 translate-1/2"
                      onClick={handlepPrevImage}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="w-5 h-5 text-sky-500 bi bi-chevron-left dark:text-sky-200"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                        ></path>
                      </svg>
                    </a>
                    <img
                      className="object-contain w-full lg:h-full"
                      src={product.images[currentImgIndex]}
                    />

                    <a
                      className="absolute right-0 transform lg:mr-2 top-1/2 translate-1/2"
                      onClick={handlepNextImage}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="w-5 h-5 text-sky-500 bi bi-chevron-right dark:text-sky-200"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                        ></path>
                      </svg>
                    </a>
                  </div>
                  <div className="flex-wrap hidden -mx-2 md:flex">
                    {product.images.map((image, index) => (
                      <div key={index} className="w-1/2 p-2 sm:w-1/4">
                        <a
                          onClick={() => handleImageClick(index)}
                          className="block border border-gray-200 hover:border-sky-400 dark:border-gray-700 dark:hover:border-sky-300"
                        >
                          <img
                            key={index}
                            src={image}
                            className={
                              index === currentImgIndex
                                ? "border border-sky-600"
                                : ""
                            }
                          />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="w-full px-4 md:w-1/2">
                <div className="lg:pl-20">
                  <div className="mb-6 ">
                    <span className="px-2.5 py-0.5 text-xs text-sky-600 bg-sky-100 dark:bg-gray-700 rounded-xl dark:text-gray-200">
                      Rating: {product.rating}
                    </span>
                    <h2 className="max-w-xl mt-6 mb-6 text-xl font-semibold leading-loose tracking-wide text-gray-700 md:text-2xl dark:text-gray-300">
                      {product.title}
                    </h2>
                    <div className="flex flex-wrap items-center mb-6">
                      <Rating product={product.rating} />
                      <Link
                        className="mb-4 text-xs underline hover:text-sky-600 dark:text-gray-400 dark:hover:text-gray-300 lg:mb-0"
                        to={product.thumbnail}
                      >
                        View Image
                      </Link>
                    </div>

                    <p className="inline-block text-2xl font-semibold text-gray-700 dark:text-gray-400 ">
                      <span>$ {product.price}</span>
                      <span className="ml-3 text-base font-normal text-red-500  dark:text-gray-400">
                        - {product.discountPercentage} %
                      </span>
                    </p>
                  </div>
                  <div className="mb-6">
                    <h2 className="mb-2 text-lg font-bold text-gray-700 dark:text-gray-400">
                      {product.description} :
                    </h2>
                  </div>
                  <div className="py-6 mb-6 border-t border-b border-gray-200 dark:border-gray-700">
                    <span className="text-base text-gray-600 dark:text-gray-400">
                      In Stock qty :
                      <span style={{ color: "green", fontWeight: "bold" }}>
                        {product.stock}
                      </span>
                    </span>
                    <p className="mt-2 text-sm text-sky-500 dark:text-sky-200">
                      Ships from china.
                      <span className="text-gray-600 dark:text-gray-400">
                        Most customers receive within 3-31 days.
                      </span>
                    </p>
                  </div>
                  <div className="mb-6 "></div>
                  <div className="flex flex-wrap items-center mb-6">
                    <div className="mb-4 mr-4 lg:mb-0">
                      <div className="w-28">
                        <div className="relative flex flex-row w-full h-10 bg-transparent rounded-lg">
                          <button className="w-20 h-full text-gray-600 bg-gray-100 border-r rounded-l outline-none cursor-pointer dark:border-gray-700 dark:hover:bg-gray-700 dark:text-gray-400 hover:text-gray-700 dark:bg-gray-900 hover:bg-gray-300">
                            <span
                              className="m-auto text-2xl font-thin"
                              onClick={() => decItemQty(product.id)}
                            >
                              -
                            </span>
                          </button>
                          <input
                            type="number"
                            className="flex items-center w-full font-semibold text-center text-gray-700 placeholder-gray-700 bg-gray-100 outline-none dark:text-gray-400 dark:placeholder-gray-400 dark:bg-gray-900 focus:outline-none text-md hover:text-black"
                            value={currentProduct ? currentProduct.qty : 0}
                            onChange={(e) => {
                              e.target.value;
                            }}
                          />

                          <button className="w-20 h-full text-gray-600 bg-gray-100 border-l rounded-r outline-none cursor-pointer dark:border-gray-700 dark:hover:bg-gray-700 dark:text-gray-400 dark:bg-gray-900 hover:text-gray-700 hover:bg-gray-300">
                            <span
                              className="m-auto text-2xl font-thin"
                              onClick={() => incItemQty(product.id)}
                            >
                              +
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="mb-4 lg:mb-0">
                      <button className="flex items-center justify-center w-full h-10 p-2 mr-4 text-gray-700 border border-gray-300 lg:w-11 hover:text-gray-50 dark:text-gray-200 dark:border-sky-600 hover:bg-sky-600 hover:border-sky-600 dark:bg-sky-600 dark:hover:bg-sky-500 dark:hover:border-sky-500 dark:hover:text-gray-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className=" bi bi-heart"
                          viewBox="0 0 16 16"
                        >
                          <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"></path>
                        </svg>
                      </button>
                    </div>
                    <a
                      href="#"
                      onClick={() => {
                        if (!cartItems.some((item) => item.id === product.id)) {
                          handleAddCart(product);
                        }
                      }}
                      className={
                        cartItems.find((item) => item.id === product.id)
                          ? ""
                          : "w-full px-4 py-3 text-center text-sky-600 bg-sky-100 border border-sky-600 dark:hover:bg-gray-900 dark:text-gray-400 dark:border-gray-700 dark:bg-gray-700 hover:bg-sky-600 hover:text-gray-100 lg:w-1/2 rounded-xl"
                      }
                    >
                      {cartItems.find((item) => item.id === product.id)
                        ? "Already In Cart"
                        : "Add To Cart"}
                    </a>
                  </div>
                  <div className="flex gap-4 mb-6">
                    <a
                      onClick={() => {
                        navigate("/products/payment");
                      }}
                      href="#"
                      className="w-full px-4 py-3 text-center text-gray-100 bg-sky-600 border border-transparent dark:border-gray-700 hover:border-sky-500 hover:text-sky-700 hover:bg-sky-100 dark:text-gray-400 dark:bg-gray-700 dark:hover:bg-gray-900 rounded-xl"
                    >
                      Buy now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      <Footer />
    </div>
  );
};

export default SingleProduct;
