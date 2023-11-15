/** @format */

import { Navigate, Outlet } from "react-router";

const ProtectedRouts = () => {
  let auth = { token: true };
  return auth.token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRouts;
