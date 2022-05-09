import React from "react";
import { authContext } from "../contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";


const ProtectedRoute = ({children}:any) => {
  const { auth } = React.useContext(authContext);
  if (!auth.id) {
    return <Navigate to="/" replace />;
  }
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
