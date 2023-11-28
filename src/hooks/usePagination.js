/** @format */

import Api from "../utils/Api";
import { useState, useEffect } from "react";

const usePagination = (initialUrl) => {
  const [currentPage, setCurrentPage] = useState({
    limit: 10,
    skip: 0,
  });
  const [data, setData] = useState({
    products: [],
    total: 0,
    skip: 0,
    limit: 10,
  });

  const handlePrevPage = async () => {
    if (currentPage.skip - currentPage.limit >= 0) {
      setCurrentPage((prevPage) => ({
        ...prevPage,
        skip: prevPage.skip - prevPage.limit,
      }));
    }
  };

  const handleNextPage = async () => {
    if (currentPage.skip + currentPage.limit < data.total) {
      setCurrentPage((prevPage) => ({
        ...prevPage,
        skip: prevPage.skip + prevPage.limit,
      }));
    }
  };

  const fetchData = async (url) => {
    try {
      const response = await Api.get(url);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const apiUrl = `${initialUrl}?limit=${currentPage.limit}&skip=${currentPage.skip}`;
    fetchData(apiUrl);
  }, [currentPage, initialUrl]);

  return {
    data,
    handlePrevPage,
    handleNextPage,
  };
};

export default usePagination;
