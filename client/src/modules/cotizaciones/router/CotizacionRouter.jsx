import React from "react";
import { Route, Routes } from "react-router-dom";
import ListCotizaciones from "../pages/ListCotizaciones";
import CreateCotizaciones from "../pages/CreateCotizaciones";
import ListLeadCotizaciones from "../pages/ListLeadCotizaciones";

const CotizacionRouter = () => {
  return (
    <Routes>
      {/* Dashboard */}
      <Route path="" element={<ListCotizaciones />} />
      {/* Lista de leads segun el proyecto */}
      <Route path="/create" element={<ListLeadCotizaciones />} />
      {/* Crear cotización, formulario, tabs plantilla. */}
      <Route path="/create/plantilla" element={<CreateCotizaciones />} />
    </Routes>
  );
};

export default CotizacionRouter;
