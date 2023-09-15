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
import { LeadRoutes } from "../modules/lead";
import { AsesorRoutes } from "../modules/asesor";
import { NotFoundPage } from "../components";
import { PrivateModuleRouter } from "./PrivateModuleRouter";
import { PublicRoutes } from "./PublicRoutes";
import { NotPublicPage } from "../components/NotPublicPage";

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
          <Route path="no-access-page" element={<NotFoundPage />} />
          <Route path="no-access-public-page" element={<NotPublicPage />} />
          <Route
            path="/*"
            element={
<<<<<<< HEAD
  
=======
>>>>>>> 2ef913311a6bc489294276a9c76249322c532edb
                <SideBarApp>
                  <Routes>
                    <Route path="user/*" element={<UsuarioRoutes />}></Route>
                    <Route path="group/*" element={<RolRoutes />}></Route>
                    <Route
                      path="campania/*"
                      element={<CampaniaRoutes />}
                    ></Route>
                    <Route path="lead/*" element={<LeadRoutes />}></Route>
                    <Route path="asesor/*" element={<AsesorRoutes />} />
                  </Routes>
                </SideBarApp>
            }
          />
        </Routes>
      </AuthProvider>
    </>
  );
};
