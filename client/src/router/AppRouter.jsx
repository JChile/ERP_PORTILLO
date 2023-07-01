import React from "react";
import { AuthProvider, Login } from "../auth";
import { Route, Routes } from "react-router-dom";
import { RRHHRoutes } from "../modules/rrhh";
import { PrivateRouterRRHH } from "./PrivateRouterRRHH";

export const AppRouter = () => {
  return (
    <>
      <AuthProvider>
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

          <Route
            path="rrhh/*"
            element={
              <PrivateRouterRRHH>
                <RRHHRoutes />
              </PrivateRouterRRHH>
            }
          />
        </Routes>
      </AuthProvider>
    </>
  );
};
