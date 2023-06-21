import React from "react";
import { Login } from "../modules/auth";
import { Route, Routes } from "react-router-dom";
import { RRHHRoutes } from "../modules/rrhh";

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route
          path="login/*"
          element={
            <Routes>
              <Route path="/*" element={<Login />} />
            </Routes>
          }
        />
        <Route
          path="/*"
          element={
            <Routes>
              <Route path="/*" element={<Login />} />
            </Routes>
          }
        />
        <Route path="rrhh/*" element={<RRHHRoutes />} />
      </Routes>
    </>
  );
};
