/** @format */

// CustomPagination component
import { Pagination } from "@mui/material";
import { useState } from "react";

const CustomPagination = ({ currentPage, handlePageChange, count }) => {
  const handleChange = (event, value) => {
    handlePageChange(value);
  };

  return (
    <Pagination
      count={count}
      shape="rounded"
      page={currentPage}
      onChange={handleChange}
    />
  );
};

export default CustomPagination;
