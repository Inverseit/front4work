import React from "react";
import { UserAuth } from "../types";
import { Navigate, Outlet } from "react-router-dom";

type Props = {
  auth: UserAuth;
  children?: JSX.Element;
};

const ProtectedRoute = ({ auth, children }: Props) => {
  if (!auth.cookie) {
    return <Navigate to="/" replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
