import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  CreateRol,
  CreateUsuarios,
  DetailRol,
  DetailUsuarios,
  ListRol,
  ListUsuarios,
  UpdateRol,
  UpdateUsuarios,
} from "../pages";
import { NavBarRRHH } from "../components";

export const RRHHRoutes = () => {
  return (
    <>
      <NavBarRRHH>
        <Routes>
          <Route path="" element={<h1>HOME RR.HH</h1>}></Route>
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
            <Route path="update/:idRol" element={<UpdateRol />} />
            <Route path="detail/:idRol" element={<DetailRol />} />
          </Route>
        </Routes>
      </NavBarRRHH>
    </>
  );
};
