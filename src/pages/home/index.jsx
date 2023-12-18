/** @format */

import { useNavigate } from "react-router";
import Footer from "../../components/footer";
import Header from "../../components/header";
import useCategoryFetch from "../../hooks/useCategoryFetch";

import Shownavigation from "../../components/navigation";

import useGetUniqueCategoriesWithImages from "../../hooks/useGetImageByCategory";
import { useContext } from "react";
import { ProductContext } from "../../providers/ProductContext";

const Home = () => {
  const navigate = useNavigate();
  const { fetchProducts, products } = useContext(ProductContext);
  const { handleCategoryClick } = useCategoryFetch(fetchProducts, navigate);

  const handleDrawerToggle = () => {
    const drawer = document.getElementById("drawer-right-example");
    drawer.classList.toggle("translate-x-full");
  };
  const { uniqueCategoriesWithImages } = useGetUniqueCategoriesWithImages();
  const urlImg = Object.values(uniqueCategoriesWithImages).map(
    (categoryData) => categoryData.image
  );
  const productsCategory = Object.values(uniqueCategoriesWithImages).map(
    (product) => product.category
  );
  console.log(uniqueCategoriesWithImages);

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
                {Object.values(uniqueCategoriesWithImages).map((data, i) => (
                  <div className="relative" key={i}>
                    <img
                      className="h-auto max-w-full rounded-lg"
                      src={data.image}
                      alt="imagies"
                    />
                    <div
                      onClick={() => {
                        handleCategoryClick(data.category);
                      }}
                      className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black bg-opacity-75 rounded-lg"
                    >
                      <p className="text-white text-center cursor-pointer">
                        {data.category}
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
              <img
                onClick={() => handleCategoryClick(productsCategory[19])}
                src={urlImg[19]}
                alt="Image"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>
              <span className="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">
                Liting
              </span>
            </a>

            <a
              href="#"
              className="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:col-span-2 md:h-80"
            >
              <img
                src={urlImg[1]}
                onClick={() => handleCategoryClick(productsCategory[1])}
                loading="lazy"
                alt="Photo by Magicle"
                className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>
              <span className="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">
                Laptops
              </span>
            </a>
            <a
              href="#"
              className="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:col-span-2 md:h-80"
            >
              <img
                onClick={() => handleCategoryClick(productsCategory[0])}
                src={urlImg[0]}
                loading="lazy"
                alt="Photo by Magicle"
                className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>
              <span className="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">
                Smartphones
              </span>
            </a>

            <a
              href="#"
              className="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-80"
            >
              <img
                onClick={() => handleCategoryClick(productsCategory[5])}
                src={urlImg[5]}
                loading="lazy"
                alt="Photo by Lorenzo Herrera"
                className=" flex-1 absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>
              <span className="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">
                Home Decoration
              </span>
            </a>
          </div>
        </div>
      </div>
      {/* Latest Products */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* First Column */}
        {/* <div className="grid gap-4">
          <div>
            <img
              className="h-auto max-w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              className="h-auto max-w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              className="h-auto max-w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg"
              alt=""
            />
          </div>
        </div> */}

        {/* Second Column */}
        {/* <div className="grid gap-4">
          <div>
            <img
              className="h-auto max-w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg"
              alt=""
            />
          </div>

          <div>
            <img
              className="h-auto max-w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              className="h-auto max-w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg"
              alt=""
            />
          </div>
        </div> */}

        {/* Third Column */}
        {/* <div className="grid gap-4">
          <div>
          
            <img
              className="h-auto max-w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              className="h-auto max-w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              className="h-auto max-w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg"
              alt=""
            />
          </div>
        </div> */}

        {/* Fourth Column */}
        {/* <div className="grid gap-4">
          <div>
            <img
              className="h-auto max-w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              className="h-auto max-w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              className="h-auto max-w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg"
              alt=""
            />
          </div>
        </div> */}
      </div>

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
                    <button className="bg-white text-gray-900 py-2 px-6 rounded-full font-bold hover:bg-gray-300">
                      View Product
                    </button>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mt-4">
                  {product.title}
                </h3>
                <p className="text-gray-500 text-sm mt-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-gray-900 font-bold text-lg">
                    ${product.price}
                  </span>
                  <button className="bg-gray-900 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800">
                    Add to Cart
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
