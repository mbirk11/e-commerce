/** @format */

import { useNavigate } from "react-router";
import Footer from "../../components/footer";
import Header from "../../components/header";
import useCategoryFetch from "../../hooks/useCategoryFetch";

import Shownavigation from "../../components/navigation";

import useGetUniqueCategoriesWithImages from "../../hooks/useGetImageByCategory";
import { useContext } from "react";

import { Link } from "react-router-dom";
import { cartContext } from "../../providers/cartContextProvider";
import { productContext } from "../../providers/productContext";

const Home = () => {
  const navigate = useNavigate();
  const { fetchProducts, products } = useContext(productContext);
  const { handleCategoryClick, categories } = useCategoryFetch(
    fetchProducts,
    navigate
  );
  const { handleAddCart, cartItems } = useContext(cartContext);
  const handleDrawerToggle = () => {
    const drawer = document.getElementById("drawer-right-example");
    drawer.classList.toggle("translate-x-full");
  };

  const { homeCategory, homeImages } = useGetUniqueCategoriesWithImages();

  return (
    <>
      <Header />
      <Shownavigation />

      <div className="bg-white dark:bg-gray-800  h-full py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <div className="mb-4 flex items-center justify-between gap-8 sm:mb-8 md:mb-12">
            <div className="flex items-center gap-12">
              <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl dark:text-white">
                Shop by Gategory
              </h2>
              <p className="hidden max-w-screen-sm text-gray-500 dark:text-gray-300 md:block">
                This is a section of some simple filler text, also known as
                placeholder text. It shares some characteristics of a real
                written text.
              </p>
            </div>
            <a
              onClick={handleDrawerToggle}
              href="#"
              className="inline-block rounded-lg border bg-white dark:bg-gray-700 dark:border-none px-4 py-2 text-center text-sm font-semibold text-gray-500 dark:text-gray-200 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-100 focus-visible:ring active:bg-gray-200 md:px-8 md:py-3 md:text-base"
            >
              More
            </a>
            <div
              id="drawer-right-example"
              className="fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform translate-x-full bg-white w-80 dark:bg-gray-800"
              tabIndex="-1"
              aria-labelledby="drawer-right-label"
            >
              <h5
                id="drawer-right-label"
                className="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400"
              >
                All Categories
              </h5>
              <button
                type="button"
                data-drawer-hide="drawer-right-example"
                aria-controls="drawer-right-example"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={handleDrawerToggle}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>

              {/* Drawer content */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {categories.map((category) => (
                  <div className="relative  " key={category}>
                    <div className="border border-gray-300 rounded-lg overflow-hidden h-full  ">
                      <img
                        className="h-auto max-w-full rounded-lg p-4"
                        src={`/categoryPNG/${category}.png`}
                        alt="imagies"
                      />
                      <span className="text-gray-300 text-sm block text-center h-full w-full py-2  ">
                        {category}
                      </span>
                    </div>
                    <div
                      onClick={() => {
                        handleCategoryClick(category);
                      }}
                      className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity bg-black bg-opacity-75 rounded-lg hover:opacity-100"
                    >
                      <p className="text-white text-center cursor-pointer">
                        {category}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 xl:gap-8">
            <a
              href="#"
              className="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-80"
            >
              {" "}
              <img
                onClick={() => handleCategoryClick(homeCategory[19])}
                src={homeImages[19]}
                alt="Image"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>
              <span className="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">
                {homeCategory[19]}
              </span>
            </a>

            <a
              href="#"
              className="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:col-span-2 md:h-80"
            >
              <img
                src={homeImages[1]}
                onClick={() => handleCategoryClick(homeCategory[1])}
                loading="lazy"
                alt="Photo by Magicle"
                className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>
              <span className="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">
                {homeCategory[1]}
              </span>
            </a>
            <a
              href="#"
              className="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:col-span-2 md:h-80"
            >
              <img
                onClick={() => handleCategoryClick(homeCategory[0])}
                src={homeImages[0]}
                loading="lazy"
                alt="Photo by Magicle"
                className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>
              <span className="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">
                {homeCategory[0]}
              </span>
            </a>

            <a
              href="#"
              className="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-80"
            >
              <img
                onClick={() => handleCategoryClick(homeCategory[5])}
                src={homeImages[5]}
                loading="lazy"
                alt="Photo by Lorenzo Herrera"
                className=" flex-1 absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>
              <span className="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">
                {homeCategory[5]}
              </span>
            </a>
          </div>
        </div>
      </div>
      {/* Latest Products */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4"></div>

      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-600 mb-8">
            Introducing Our Latest Product
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.slice(5, 8).map((product, i) => (
              <div key={i} className="bg-white rounded-lg shadow-lg p-8">
                <div className="relative overflow-hidden">
                  <img
                    className="object-cover w-full h-full"
                    src={product.images[3]}
                    alt="Product 3"
                  />

                  <div className="absolute inset-0 bg-black opacity-40"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Link to={`/products/${product.id}`}>
                      <button className="bg-white text-gray-900 py-2 px-6 rounded-full font-bold hover:bg-gray-300">
                        View Product
                      </button>
                    </Link>
                  </div>
                </div>

                <h3
                  onClick={() =>
                    cartItems.some((item) => item.id === product.id)
                      ? navigate("products/cart")
                      : ""
                  }
                  className="text-xl font-bold text-gray-900 mt-4 cursor-pointer"
                >
                  {product.title}
                </h3>

                <p className="text-gray-500 text-sm mt-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-gray-900 font-bold text-lg">
                    ${product.price}
                  </span>

                  <button
                    className={
                      cartItems.some((item) => item.id === product.id)
                        ? "bg-red-900 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800"
                        : "bg-gray-900 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800"
                    }
                    onClick={() => {
                      if (!cartItems.some((item) => item.id === product.id)) {
                        handleAddCart(product);
                      }
                    }}
                  >
                    {cartItems.some((item) => item.id === product.id)
                      ? " Already In Cart"
                      : " Add to Cart"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
