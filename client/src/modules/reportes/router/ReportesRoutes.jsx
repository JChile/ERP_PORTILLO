import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  ReporteRetornoCampania,
  ReportesHome,
  ReporteDesasignacion,
} from "../pages";

export const ReportesRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<ReportesHome />} />
      <Route path="retornoCampania/" element={<ReporteRetornoCampania />} />
      <Route path="desasignacion/" element={<ReporteDesasignacion />} />
    </Routes>
  );
};

export default ReportesRoutes;
