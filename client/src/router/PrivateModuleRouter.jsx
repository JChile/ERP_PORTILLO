import React, { useContext } from "react";
import { AuthContext } from "../auth";
import { Navigate, useLocation } from "react-router-dom";

export const PrivateModuleRouter = ({ children }) => {
  const { user, permissions } = useContext(AuthContext);

  if (!user || !permissions) {
    return <Navigate to={"/login"} replace />;
  }

  /* ejemplos de rutas: 
    - localhost:3467/user
    - localhost:3467/user/create
    - localhost:3467/user/create?page=4
  */
  const location = useLocation();
  const pathParts = location.pathname.split("/");
  const lastPathPart = pathParts[1];
  console.log(lastPathPart);
  const matchedModule = permissions.find((item) => item.url === lastPathPart);

  return matchedModule ? children : <Navigate to={"/no-access-page"} replace />;
};
