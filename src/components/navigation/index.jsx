/** @format */

import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ProductContext } from "../../providers/productContext";
import Search from "../search";

const Shownavigation = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const {
    range,
    setRange,
    handleChangerange,
    handleCheckboxChange,
    handleClear,
  } = useContext(ProductContext);
  const navigate = useNavigate();
  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
  };

  const toggleDropdown = () => {
    const dropdown = document.getElementById("dropdownHelperRadio");
    dropdown.classList.toggle("hidden");
  };

  const minLabelPosition = "0px"; //For Range
  const maxLabelPosition = "calc(100% - 53px)";
  return (
    <>
      <div className="text-center">
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          type="button"
          onClick={toggleDrawer}
        >
          Show navigation
        </button>
      </div>

      <div
        id="drawer-navigation"
        className={`fixed top-0 left-0 z-40 w-64 h-screen p-4 overflow-y-auto transition-transform ${
          showDrawer ? "translate-x-0" : "-translate-x-full"
        } bg-white dark:bg-gray-800`}
        tabIndex="-1"
        aria-labelledby="drawer-navigation-label"
      >
        <h5
          id="drawer-navigation-label"
          className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
        >
          Filters
        </h5>
        <button
          onClick={() => toggleDrawer(true)}
          type="button"
          data-drawer-hide="drawer-navigation"
          aria-controls="drawer-navigation"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Close menu</span>
        </button>
        <div className="py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 20"
                >
                  <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
                </svg>
                <span
                  className="flex-1 ms-3 whitespace-nowrap"
                  onClick={() => navigate("/products")}
                >
                  All Products
                </span>
              </a>
            </li>
            <li>
              <div>
                <button
                  id="dropdownCheckboxButton"
                  data-dropdown-toggle="dropdownHelperRadio"
                  className="flex w-full items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  type="button"
                  onClick={toggleDropdown}
                >
                  <svg
                    className="w-5 h-5 mr-1 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 21"
                  >
                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                  </svg>
                  Sort Products
                  <svg
                    className="w-2.5 h-2.5 ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>

                <div
                  id="dropdownHelperRadio"
                  className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-60 dark:bg-gray-700 dark:divide-gray-600"
                  data-popper-reference-hidden=""
                  data-popper-escaped=""
                  data-popper-placement="top"
                >
                  <ul
                    className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownHelperRadioButton"
                  >
                    <li>
                      <div className="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                        <div className="flex items-center h-5">
                          <input
                            id="helper-radio-5"
                            name="helper-radio"
                            type="radio"
                            value="rating"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 "
                            onClick={() => handleCheckboxChange("rating")}
                          />
                        </div>
                        <div className="ms-2 text-sm">
                          <label
                            htmlFor="helper-radio-5"
                            className="font-medium text-gray-900 dark:text-gray-300"
                          >
                            <div>By Rating</div>
                          </label>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                        <div className="flex items-center h-5">
                          <input
                            id="helper-radio-5"
                            name="helper-radio"
                            type="radio"
                            value="price"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 "
                            onClick={() => handleCheckboxChange("priceUp")}
                          />
                        </div>
                        <div className="ms-2 text-sm">
                          <label
                            htmlFor="helper-radio-5"
                            className="font-medium text-gray-900 dark:text-gray-300"
                          >
                            <div>By Lower Price </div>
                          </label>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                        <div className="flex items-center h-5">
                          <input
                            id="helper-radio-5"
                            name="helper-radio"
                            type="radio"
                            value="price"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 "
                            onClick={() => handleCheckboxChange("priceDown")}
                          />
                        </div>
                        <div className="ms-2 text-sm">
                          <label
                            htmlFor="helper-radio-5"
                            className="font-medium text-gray-900 dark:text-gray-300"
                          >
                            <div>By Higher Price</div>
                          </label>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            <li>
              <label
                htmlFor="number-input"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                $ Price Range
              </label>
            </li>
            <li>
              <div className="relative mb-6">
                <label htmlFor="labels-range-input" className="sr-only">
                  Labels range
                </label>
                <input
                  id="labels-range-input"
                  type="range"
                  value={range.to}
                  min={range.from}
                  max={5000}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  onChange={handleChangerange}
                />
                <span
                  style={{ left: minLabelPosition }}
                  className="text-sm text-gray-500 dark:text-gray-400 absolute -bottom-6"
                >
                  ${range.from}
                </span>

                <span
                  style={{ left: maxLabelPosition }}
                  className="text-sm text-gray-500 dark:text-gray-400 absolute -bottom-6"
                >
                  ${range.to}
                </span>
              </div>
            </li>
            <li className="flex ">
              <form className="flex-1  mr-2">
                <input
                  type="number"
                  id="number-input"
                  aria-describedby="helper-text-explanation"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="From:"
                  required
                  value={range.from === "" ? "" : range.from}
                  onChange={(e) => setRange({ ...range, from: e.target.value })}
                />
              </form>
              <form className="flex-1">
                <input
                  type="number"
                  id="number-input"
                  aria-describedby="helper-text-explanation"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="To:"
                  required
                  value={range.to}
                  onChange={(e) => setRange({ ...range, to: e.target.value })}
                />
              </form>
            </li>

            <li className="flex">
              <button
                onClick={handleClear}
                type="button"
                className="flex-1 mr-2 text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Clear
              </button>
            </li>
          </ul>
        </div>
        <div className="fixed bottom-10 left-0 w-full">
          <Search />
        </div>
      </div>
    </>
  );
};

export default Shownavigation;
