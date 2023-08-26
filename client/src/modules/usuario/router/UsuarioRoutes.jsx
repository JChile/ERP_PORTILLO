import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  CreateUsuarios,
  DetailUsuarios,
  ListUsuarios,
  UpdateUsuarios,
} from "../pages";

export const UsuarioRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<ListUsuarios />} />
      <Route path="create" element={<CreateUsuarios />} />
      <Route path="update/:idUsuario" element={<UpdateUsuarios />} />
      <Route path="detail/:idUsuario" element={<DetailUsuarios />} />
    </Routes>
  );
};
