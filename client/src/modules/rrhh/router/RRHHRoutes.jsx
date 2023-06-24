import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  CreateUsuarios,
  DetailUsuarios,
  ListUsuarios,
  UpdateUsuarios,
} from "../pages";
import { NavBarRRHH } from "../components";
import CreateRol from "../pages/roles/CreateRol";
import UpdateRol from "../pages/roles/UpdateRol";
import ListRol from "../pages/roles/ListRol";

export const RRHHRoutes = () => {
  return (
    <>
      <NavBarRRHH />
      <div className="container mx-auto my-2">
        <Routes>
          <Route path="usuario/*">
            <Route path="" element={<ListUsuarios />} />
            <Route path="create" element={<CreateUsuarios />} />
            <Route path="update/:idUsuario" element={<UpdateUsuarios />} />
            <Route path="detail/:idUsuario" element={<DetailUsuarios />} />
          </Route>
          {/* Se añadio esta seccion para crear los roles para el manejo de RRHH  */}
          <Route path="roles/*">
              <Route path="" element={<ListRol />} />
              <Route path="create" element={<CreateRol />} />
              <Route path="update/:idRol" element={ <UpdateRol />} />
          </Route>
        </Routes>
      </div>
    </>
  );
};
