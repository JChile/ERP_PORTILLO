import React from "react";
import { Route, Routes } from "react-router-dom";
import { CreateRol, DetailRol, ListRol, UpdateRol } from "../pages";

export const RolRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<ListRol />} />
      <Route path="create" element={<CreateRol />} />
      <Route path="update/:idRol" element={<UpdateRol />} />
      <Route path="detail/:idRol" element={<DetailRol />} />
    </Routes>
  );
};
