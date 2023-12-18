/** @format */
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/authContextProvider";
import { useNavigate } from "react-router";
import { Link, NavLink } from "react-router-dom";
import Api from "../../utils/Api";
import { ProductContext } from "../../providers/ProductContext";
import { cartContext } from "../../providers/CartcontextProvider";
import useCategoryFetch from "../../hooks/useCategoryFetch";

const Header = () => {
  const { cartItems } = useContext(cartContext);
  const navigate = useNavigate();
  const { fetchProducts } = useContext(ProductContext);
  const { authToken, logOut } = useContext(AuthContext);
  const { active, categories, handleCategoryClick } = useCategoryFetch(
    fetchProducts,
    navigate
  );

  const [searchItem, setSearchItem] = useState("");
  const [dropdown, setDropdown] = useState(false);

  const toggleDropDown = () => {
    setDropdown(!dropdown);
  };
  const toggleCart = () => {
    navigate("/products/cart");
  };
  const totalQuantity = cartItems.reduce(
    (total, currentItem) => total + currentItem.qty,
    0
  );

  const { isAuthed, user } = authToken;
  const userName = user ? user.username : "";
  const userId = user ? user.id : null;
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

  const handleAuth = () => {
    if (isAuthed) {
      logOut();
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="bg-white ">
      <div className="border py-3 px-6">
        <div className="flex justify-between">
          <Link to={"/"}>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                />
              </svg>
              <span className="ml-2 font-semibold text-[#252C32]">
                What a Market
              </span>
            </div>
          </Link>
          <div className="ml-6 flex flex-1 gap-x-3">
            {/* <span
              className="cursor-pointer rounded-sm py-1 px-2 text-sm font-medium hover:bg-gray-100"
              onClick={() => sortProductsByRating()}
            >
              Rating
            </span>
            <div>
              <span
                className="cursor-pointer rounded-sm py-1 px-2 text-sm font-medium hover:bg-gray-100"
                onClick={() => sortProductsByPrice()}
              >
                Lower Price
              </span>
            </div> */}
            {/* //categories */}
            <div className="ml-6 flex flex-1 gap-x-3 relative">
              <div
                onClick={toggleDropDown}
                className="flex cursor-pointer select-none items-center gap-x-2 rounded-md border bg-[#4094F7] py-2 px-4 text-white hover:bg-blue-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <span className="text-sm font-medium">Categories</span>
              </div>

              <div
                className={`hs-dropdown-menu absolute top-full left-0 ${
                  dropdown ? "opacity-100 visible" : "opacity-0 invisible"
                } bg-white shadow-md rounded-lg p-2 mt-2 z-10 dark:bg-gray-800 dark:border dark:border-gray-700`}
              >
                {categories.map((category, index) => (
                  <NavLink
                    key={index}
                    className={
                      active === categories[index]
                        ? "flex items-center cursor-pointer gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-300 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700"
                        : "flex items-center cursor-pointer gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-300 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700"
                    }
                    onClick={() => {
                      handleCategoryClick(category);
                    }}
                  >
                    {category}
                  </NavLink>
                ))}
              </div>
            </div>
            <input
              type="text"
              className="w-full rounded-md border border-[#DDE2E4] px-3 py-2 text-sm"
              value={searchItem}
              onChange={(e) => {
                setSearchItem(e.target.value);
              }}
            />
            <div className="ml-2 flex cursor-pointer items-center gap-x-1 rounded-md border py-2 px-4 hover:bg-gray-100">
              <Link>
                <button className="text-sm font-medium" onClick={onSearch}>
                  Search
                </button>
              </Link>
            </div>
          </div>
          <div className="ml-2 flex">
            <div className="flex cursor-pointer items-center gap-x-1 rounded-md py-2 px-4 hover:bg-gray-100">
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
                <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 p-2 text-xs text-white">
                  {totalQuantity}
                </span>
              </div>
              <span className="text-sm font-medium" onClick={toggleCart}>
                Cart
              </span>
            </div>

            <div className="ml-2 flex cursor-pointer items-center gap-x-1 rounded-md  py-2 px-4 hover:bg-gray-100">
              {isAuthed && (
                <>
                  <img
                    className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
                    src={user.image}
                  ></img>

                  <Link to={`/user/${userId}`}>
                    <span className="text-sm font-medium ">{userName}</span>
                  </Link>
                </>
              )}
            </div>

            <div className="ml-2 flex cursor-pointer items-center gap-x-1 rounded-md border py-2 px-4 hover:bg-gray-100">
              <button className="text-sm font-medium" onClick={handleAuth}>
                {isAuthed ? "Log Out" : "Sign in"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
