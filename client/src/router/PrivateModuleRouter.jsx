import React, { useContext } from "react";
import { AuthContext } from "../auth";
import { Navigate, useLocation } from "react-router-dom";

export const PrivateModuleRouter = ({ children }) => {
  const { user, permissions } = useContext(AuthContext);

  if (!user || !permissions) {
    return <Navigate to={"/login"} replace />;
  }

  const location = useLocation();
  const pathParts = location.pathname.split("/");
  const lastPathPart = pathParts[pathParts.length - 1];
  const matchedModule = permissions.find((item) => item.url === lastPathPart);

  return matchedModule ? children : <Navigate to={"/no-access-page"} replace />;
};
