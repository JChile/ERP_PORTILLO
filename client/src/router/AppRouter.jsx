import React from "react";
import { AuthProvider, Login, SideBarApp } from "../auth";
import { Route, Routes } from "react-router-dom";
// import { RRHHRoutes } from "../modules/rrhh";
// import { MarketingRoutes } from "../modules/marketing";
// import { PrivateRouterRRHH } from "./PrivateRouterRRHH";
// import { PrivateRouterMarketing } from "./PrivateRouterMarketing";
import { RolRoutes } from "../modules/roles";
import { UsuarioRoutes } from "../modules/usuario";
import { CampaniaRoutes } from "../modules/campania";

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
              <SideBarApp>
                <Routes>
                  <Route path="user/*" element={<UsuarioRoutes />}></Route>
                  <Route path="group/*" element={<RolRoutes />}></Route>
                  <Route path="campania/*" element={<CampaniaRoutes />}></Route>
                </Routes>
              </SideBarApp>
            }
          />
        </Routes>

        {/* <Routes>
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
          <Route
            path="marketing/*"
            element={
              <PrivateRouterMarketing>
                <MarketingRoutes />
              </PrivateRouterMarketing>
            }
          />
        </Routes> */}
      </AuthProvider>
    </>
  );
};
