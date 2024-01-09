/** @format */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import AppLayout from "./components/header/AppLayout.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppLayout>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppLayout>
  </React.StrictMode>
);
