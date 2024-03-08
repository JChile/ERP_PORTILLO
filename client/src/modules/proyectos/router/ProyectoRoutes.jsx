import React from "react";
import { Route, Routes } from "react-router-dom";
import ListProyectos from "../pages/ListProyectos";
import { CreateProyecto, UpdateProyecto } from "../pages";
import { PresupuestoProyecto } from "../pages/presupuesto/PresupuestoProyecto";

export const ProyectoRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<ListProyectos />} />
      <Route path="create/" element={<CreateProyecto />} />
      <Route path="update/:idProyecto" element={<UpdateProyecto />} />
      <Route path="presupuesto/:idProyecto" element={<PresupuestoProyecto />} />
    </Routes>
  );
};
