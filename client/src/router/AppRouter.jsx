import React from "react";
import { AuthProvider, Login, MainContainerApp } from "../auth";
import { Route, Routes } from "react-router-dom";
import { RolRoutes } from "../modules/roles";
import { UsuarioRoutes } from "../modules/usuario";
import { CampaniaRoutes } from "../modules/campania";
import { LeadRoutes } from "../modules/lead";
import { HomePage, NotFoundPage } from "../components";
import { NotPublicPage } from "../components/NotPublicPage";
import { VentasRouter } from "../modules/ventas/router/VentasRouter";
import { ProyectoRoutes } from "../modules/proyectos/router/ProyectoRoutes";
import { ProductoRoutes } from "../modules/productos/router/ProductoRoutes";

export const AppRouter = () => {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="" element={<Login />} />
          <Route path="no-access-page" element={<NotFoundPage />} />
          <Route path="no-access-public-page" element={<NotPublicPage />} />
          <Route
            path="/*"
            element={
              <MainContainerApp>
                <Routes>
                  <Route path="home/*" element={<HomePage />} />
                  <Route path="usuario/*" element={<UsuarioRoutes />} />
                  <Route path="rol/*" element={<RolRoutes />} />
                  <Route path="campania/*" element={<CampaniaRoutes />} />
                  <Route path="lead/*" element={<LeadRoutes />} />
                  <Route path="evento/*" element={<VentasRouter />} />
                  {/* <Route path="cotizaciones/*" element={<CotizacionRouter />} /> */}
                  <Route path="proyecto/*" element={<ProyectoRoutes />} />
                  <Route path="producto/*" element={<ProductoRoutes />} />
                </Routes>
              </MainContainerApp>
            }
          />
        </Routes>
      </AuthProvider>
    </>
  );
};
