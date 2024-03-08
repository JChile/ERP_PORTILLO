import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  CreateCampania,
  DetailCampania,
  ListCampaniaGastos,
  ListCampanias,
  UpdateCampania,
} from "../pages";
import ListCampaniaReportes from "../pages/reportes/ListCampaniaReporte";

export const CampaniaRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<ListCampanias />} />
      <Route path="create/" element={<CreateCampania />} />
      <Route path="detail/:idCampania" element={<DetailCampania />} />
      <Route path="update/:idCampania" element={<UpdateCampania />} />
      <Route path="gastos/:idCampania" element={<ListCampaniaGastos />} />
      <Route path="reportes" element={<ListCampaniaReportes />} />
    </Routes>
  );
};
