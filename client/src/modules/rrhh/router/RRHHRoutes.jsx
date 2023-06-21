import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  CreateUsuarios,
  DetailUsuarios,
  ListUsuarios,
  UpdateUsuarios,
} from "../pages";
import { NavBarRRHH } from "../components";

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
        </Routes>
      </div>
    </>
  );
};
