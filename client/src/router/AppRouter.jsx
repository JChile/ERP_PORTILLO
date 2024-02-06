import React, { useContext } from "react";
import { AuthContext, AuthProvider, Login, MainContainerApp } from "../auth";
import { Route, Routes } from "react-router-dom";
import { RolRoutes } from "../modules/roles";
import { UsuarioRoutes } from "../modules/usuario";
import { CampaniaRoutes } from "../modules/campania";
import { LeadRoutes } from "../modules/lead";
import { ControllNotFoundPage, HomePage, NotFoundPage } from "../components";
import { VentasRouter } from "../modules/ventas/router/VentasRouter";
import { ProyectoRoutes } from "../modules/proyectos/router/ProyectoRoutes";
import { ProductoRoutes } from "../modules/productos/router/ProductoRoutes";
import ReportesRoutes from "../modules/reportes/router/ReportesRoutes";
import { PrivateModuleRouter } from "./PrivateModuleRouter";
import { PublicRoutes } from "./PublicRoutes";
import { NotPublicPage } from "../components/NotPublicPage";
import { NotAccessPage } from "../components/NotAccessPage";

export const AppRouter = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="" element={<PublicRoutes component={Login} />} />
        <Route path="/*" element={<AppRouterContent />} />
        <Route path="no-access-page" element={<NotAccessPage />} />
        <Route path="no-access-public-page" element={<NotPublicPage />} />
        <Route path="no-found-page" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  );
};
const AppRouterContent = () => {
  const { permissions } = useContext(AuthContext);

  return (
    <>
      <MainContainerApp>
        <Routes>
          {/* ROUTE HOME */}
          <Route path="home/*" exact element={<HomePage />} />
          <Route path="reportes/*" element={<ReportesRoutes />} />
          <Route
            path="usuario/*"
            exact
            element={
              <PrivateModuleRouter
                component={UsuarioRoutes}
                userPermissions={permissions.find(
                  (element) => element.url === "usuario"
                )}
                requiredPermissions={["can_view"]}
              />
            }
          />
          <Route
            path="rol/*"
            exact
            element={
              <PrivateModuleRouter
                component={RolRoutes}
                userPermissions={permissions.find(
                  (element) => element.url === "rol"
                )}
                requiredPermissions={["can_view"]}
              />
            }
          />
          <Route
            path="campania/*"
            exact
            element={
              <PrivateModuleRouter
                component={CampaniaRoutes}
                userPermissions={permissions.find(
                  (element) => element.url === "campania"
                )}
                requiredPermissions={["can_view"]}
              />
            }
          />
          <Route
            path="lead/*"
            exact
            element={
              <PrivateModuleRouter
                component={LeadRoutes}
                userPermissions={permissions.find(
                  (element) => element.url === "lead"
                )}
                requiredPermissions={["can_view"]}
              />
            }
          />
          <Route
            path="evento/*"
            exact
            element={
              <PrivateModuleRouter
                component={VentasRouter}
                userPermissions={permissions.find(
                  (element) => element.url === "evento"
                )}
                requiredPermissions={["can_view"]}
              />
            }
          />
          <Route
            path="proyecto/*"
            exact
            element={
              <PrivateModuleRouter
                component={ProyectoRoutes}
                userPermissions={permissions.find(
                  (element) => element.url === "proyecto"
                )}
                requiredPermissions={["can_view"]}
              />
            }
          />
          <Route
            path="producto/*"
            exact
            element={
              <PrivateModuleRouter
                component={ProductoRoutes}
                userPermissions={permissions.find(
                  (element) => element.url === "producto"
                )}
                requiredPermissions={["can_view"]}
              />
            }
          />
          <Route path="*" element={<ControllNotFoundPage />} />
        </Routes>
      </MainContainerApp>
    </>
  );
};
