import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  ReporteRetornoCampania,
  ReportesHome,
  ReporteDesasignacion,
  ReporteLeadStatus
} from "../pages";

export const ReportesRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<ReportesHome />} />
      <Route path="retornoCampania/" element={<ReporteRetornoCampania />} />
      <Route path="desasignacion/" element={<ReporteDesasignacion />} />
      <Route path="leadStatus/" element={<ReporteLeadStatus />} />
    </Routes>
  );
};

export default ReportesRoutes;
