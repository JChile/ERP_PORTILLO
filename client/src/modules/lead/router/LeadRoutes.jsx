import React from "react";
import { Route, Routes } from "react-router-dom";
import { AddLeadManual, AddLeadSheet, ListLeads } from "../pages";

export const LeadRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<ListLeads />} />
      <Route path="create/sheet" element={<AddLeadSheet />}></Route>
      <Route path="create" element={<AddLeadManual />}></Route>
    </Routes>
  );
};
