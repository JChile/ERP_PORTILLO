import React from "react"
import { Route, Routes } from "react-router-dom"
import { AddLeadManual, AddLeadSheet, DetailLead, UpdateLead } from "../pages"
import HomeController from "../controllers/HomeController"

export const LeadRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<HomeController />} />
      <Route path="create/sheet" element={<AddLeadSheet />}></Route>
      <Route path="create" element={<AddLeadManual />}></Route>
      <Route path="detail/:idLead" element={<DetailLead />} />
      <Route path="update/:idLead" element={<UpdateLead />} />
    </Routes>
  )
}
