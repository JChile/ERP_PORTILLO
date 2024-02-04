import React from "react";
import { Route, Routes } from "react-router-dom";
import { CalendarView } from "../pages";
import EventosController from "../controllers/EventosController";

export const VentasRouter = () => {
  return (
    <Routes>
      <Route path="" element={<EventosController />} />
    </Routes>
  );
};
