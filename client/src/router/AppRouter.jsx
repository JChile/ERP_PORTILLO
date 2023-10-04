import React from "react";
import { AuthProvider, Login, MainContainerApp } from "../auth";
import { Route, Routes } from "react-router-dom";
import { RolRoutes } from "../modules/roles";
import { UsuarioRoutes } from "../modules/usuario";
import { CampaniaRoutes } from "../modules/campania";
import { LeadRoutes } from "../modules/lead";
import { AsesorRoutes } from "../modules/asesor";
import { NotFoundPage } from "../components";
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
              <MainContainerApp>

                <Routes>
                  <Route path="user/*" element={<UsuarioRoutes />}></Route>
                  <Route path="group/*" element={<RolRoutes />}></Route>
                  <Route path="campania/*" element={<CampaniaRoutes />}></Route>
                  <Route path="lead/*" element={<LeadRoutes />}></Route>
                  <Route path="asesor/*" element={<AsesorRoutes />} />
                </Routes>

              </MainContainerApp>
            }
          />
        </Routes>
      </AuthProvider>
    </>
  );
};
