/** @format */

import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { AuthContext } from "../providers/authContextProvider";
import AppLayout from "../components/header/appLayout";

const ProtectedRouts = () => {
  const { authToken } = useContext(AuthContext);
  const isAuthed = authToken && authToken.token;
  if (!isAuthed) {
    return <Navigate to="/login" />;
  }
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
};

export default ProtectedRouts;
