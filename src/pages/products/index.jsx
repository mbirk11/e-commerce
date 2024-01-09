/** @format */

import { useContext } from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";
import { Link } from "react-router-dom";

import { ProductContext } from "../../providers/ProductContext";

import CustomPagination from "../../components/pagination";
import Shownavigation from "../../components/navigation";
import { cartContext } from "../../providers/CartContextProvider";

const Products = () => {
  const {
    currentPage,
    totalPage,
    handlePageChange,
    filteredProducts,
    sortedProducts,
  } = useContext(ProductContext);
  console.log("filtered", filteredProducts);

  const { handleAddCart, cartItems } = useContext(cartContext);

  return (
    <>
      <Header />
      <Shownavigation />
      <section
        id="Projects"
        className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
      >
        {sortedProducts.length === 0 ? (
          <>No Items To Display</>
        ) : (
          sortedProducts.map((product) => (
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
              </Link>
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
                      fill={
                        cartItems.some((item) => item.id === product.id)
                          ? "red"
                          : "currentColor"
                      }
                      onClick={() => {
                        if (!cartItems.some((item) => item.id === product.id)) {
                          handleAddCart(product);
                        }
                      }}
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
            </div>
          ))
        )}
      </section>
      <div className="flex flex-col items-center pb-8 mt-5">
        <CustomPagination
          count={totalPage}
          shape="rounded"
          page={currentPage}
          handlePageChange={handlePageChange}
        />
      </div>
      <Footer />
    </>
  );
};

export default Products;
