import React from "react";
import { AuthProvider, Login } from "../auth";
import { Route, Routes } from "react-router-dom";
import { RRHHRoutes } from "../modules/rrhh";
import { MarketingRoutes } from "../modules/marketing";
import { PrivateRouterRRHH } from "./PrivateRouterRRHH";
import { PrivateRouterMarketing } from "./PrivateRouterMarketing";

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
          {/* RUTAS RECURSOS HUMANOS */}
          <Route
            path="rrhh/*"
            element={
              <PrivateRouterRRHH>
                <RRHHRoutes />
              </PrivateRouterRRHH>
            }
          />
          {/* RUTAS MERKETING */}
          <Route
            path="marketing/*"
            element={
              <PrivateRouterMarketing>
                <MarketingRoutes />
              </PrivateRouterMarketing>
            }
          />
        </Routes>
      </AuthProvider>
    </>
  );
};
