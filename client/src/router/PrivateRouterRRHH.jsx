import React, { useContext } from "react";
import { AuthContext } from "../auth";
import { Navigate } from "react-router-dom";

export const PrivateRouterRRHH = ({ children }) => {
  const { user } = useContext(AuthContext);
  const { idArea } = user;
  // the id 1 represent to RR.HH
  return idArea == 1 ? children : <Navigate to={"/login"} />;
};
