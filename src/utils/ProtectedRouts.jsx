/** @format */

import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { AuthContext } from "../providers/authContextProvider";

const ProtectedRouts = () => {
  const { authToken } = useContext(AuthContext);
  const isAuthed = authToken && authToken.token;
  return isAuthed ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRouts;
