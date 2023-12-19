import React from "react";
import { Route, Routes } from "react-router-dom";
import ListCotizaciones from "../pages/ListCotizaciones";
import CreateCotizaciones from "../pages/CreateCotizaciones";
import ListLeadCotizaciones from "../pages/ListLeadCotizaciones";
import CreatePlantilla from "../pages/CreatePlantilla";

const CotizacionRouter = () => {
  return (
    <Routes>
      {/* Dashboard */}
      <Route path="" element={<ListCotizaciones />} />
      {/* Lista de leads segun el proyecto */}
      <Route path="/list-lead/" element={<ListLeadCotizaciones />} />
      {/* Crear cotización, formulario, tabs plantilla. */}
      <Route path="/list-lead/create/" element={<CreateCotizaciones />} />
      {/* vista creación plantilla */}
      <Route path="/list-lead/create/plantilla/" element={<CreatePlantilla />} />
    </Routes>
  );
};

export default CotizacionRouter;
