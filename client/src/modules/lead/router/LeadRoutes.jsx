import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  AddLeadManual,
  AddLeadSheet,
  ListLeads,
  DetailLead,
  UpdateLead,
  AsignLeads,
} from "../pages";
import CreateCotizaciones from "../../cotizaciones/pages/CreateCotizaciones";
import CreatePlantilla from "../../cotizaciones/pages/CreatePlantilla";

export const LeadRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<ListLeads />} />
      <Route path="create/sheet" element={<AddLeadSheet />}></Route>
      <Route path="create" element={<AddLeadManual />}></Route>
      <Route path="detail/:idLead" element={<DetailLead />} />
      <Route path="update/:idLead" element={<UpdateLead />} />
      <Route path="asign" element={<AsignLeads />} />
      <Route
        path="detail/:idLead/cotizacion/"
        element={<CreateCotizaciones />}
      />

      <Route
        path="detail/:idLead/cotizacion/plantilla/"
        element={<CreatePlantilla />}
      />
    </Routes>
  );
};
