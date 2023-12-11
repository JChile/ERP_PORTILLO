import React from "react";
import { Route, Routes } from "react-router-dom";
import { CalendarMain } from "../pages";

export const VentasRouter = () => {
  return (
    <Routes>
      <Route path="" element={<CalendarMain />} />
    </Routes>
  );
};
