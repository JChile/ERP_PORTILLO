import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth";
import { Navigate, useLocation } from "react-router-dom";

export const PublicRoutes = ({ children }) => {
  const { user } = useContext(AuthContext);
  return !user ? children : <Navigate to={"/no-access-public-page"} replace />;
};
