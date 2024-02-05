import React from "react";
import { Navigate } from "react-router-dom";

export const ControllNotFoundPage = () => {
  return <Navigate to={"/no-found-page"} />;
};
