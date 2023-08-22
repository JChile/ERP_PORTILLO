import React from "react";
import {
  ListLeads,
  AddLeadSheet,
  AddLeadManual,
  ListCampañas,
  ListAsesores,
  HomeReportes,
} from "../pages";
import { NavBarMarketing } from "../components";
import { Route, Routes } from "react-router-dom";

export const MarketingRoutes = () => {
  return (
    <>
      <NavBarMarketing>
        <Routes>
          <Route path="" element={<h1>HOME Marketing</h1>}></Route>
          <Route path="campaña/*">
            <Route path="" element={<ListCampañas />} />
          </Route>
          <Route path="lead/*">
            <Route path="" element={<ListLeads />} />
            <Route path="create/sheet" element={<AddLeadSheet />}></Route>
            <Route path="create" element={<AddLeadManual />}></Route>
          </Route>
          <Route path="asesor/*">
            <Route path="" element={<ListAsesores />} />
          </Route>
          <Route path="reporte/*">
            <Route path="" element={<HomeReportes />} />
          </Route>
        </Routes>
      </NavBarMarketing>
    </>
  );
};
