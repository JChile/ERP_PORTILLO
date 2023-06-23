import React from "react";
import { AuthProvider, Login } from "../auth";
import { Route, Routes } from "react-router-dom";
import { RRHHRoutes } from "../modules/rrhh";
import { PrivateRouterRRHH } from "./PrivateRouterRRHH";

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <AuthProvider>
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
          {/* THIS MODULE REPRESENT TO RR.HH*/}
          {/* <PrivateRouterRRHH>
            <Route path="rrhh/*" element={<RRHHRoutes />} />
          </PrivateRouterRRHH> */}
        </AuthProvider>
      </Routes>
    </>
  );
};
