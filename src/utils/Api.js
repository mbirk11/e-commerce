/** @format */

import axios from "axios";

const Api = axios.create({
  baseURL: "https://dummyjson.com",
  headers: {
    "Content-Type": "application/json",
  },
});
Api.interceptors.request.use((config) => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  config.headers.Authorization = `Bearer ${auth?.token}`;
  return config;
});

export default Api;
