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
import { VentasRouter } from "../modules/ventas/router/VentasRouter";
import CotizacionRouter from "../modules/cotizaciones/router/CotizacionRouter";
import { ProyectoRoutes } from "../modules/proyectos/router/ProyectoRoutes";
import { ProductoRoutes } from "../modules/productos/router/ProductoRoutes";

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
                  <Route path="usuario/*" element={<UsuarioRoutes />}></Route>
                  <Route path="rol/*" element={<RolRoutes />}></Route>
                  <Route path="campania/*" element={<CampaniaRoutes />}></Route>
                  <Route path="lead/*" element={<LeadRoutes />}></Route>
                  <Route path="asesor/*" element={<AsesorRoutes />} />
                  <Route path="evento/*" element={<VentasRouter />} />
                  <Route path="cotizaciones/*" element={<CotizacionRouter />} />
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
