import React from "react";
import { Route, Routes } from "react-router-dom";
import { CalendarView } from "../pages";
import JefeVentasDashboardProject from "../pages/JefeVentasDashboardProject";

export const VentasRouter = () => {
  return (
    <Routes>
      <Route path="" element={<CalendarView />} />
      <Route path="proyecto/:id" element={<JefeVentasDashboardProject />} />
    </Routes>
  );
};
