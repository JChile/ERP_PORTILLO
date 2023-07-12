import React, { useContext, useEffect } from "react";
import { AuthContext } from "../auth";
import { Navigate } from "react-router-dom";

export const PrivateRouterRRHH = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to={"/login"} replace />;
  }
  // the id 1 represent to RR.HH
  return user.groupsId == "2" ? children : <Navigate to={"/login"} replace />;
};
