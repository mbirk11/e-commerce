/** @format */

import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router";

const useClearParams = () => {
  const { q } = useParams();
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    if (query.get("q")) {
      query.delete("q");
      const newUrl = `${location.pathname}?${query.toString()}`;
      window.history.replaceState({}, "", newUrl);
    }
  }, [location.search, q]);
};

export default useClearParams;
