import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ReporteRetornoCampania, ReportesHome } from '../pages'

export const ReportesRoutes = () => {
  return (
    <Routes>
        <Route path="" element={<ReportesHome />} />
        <Route path="retornoCampania/" element={<ReporteRetornoCampania />} />
    </Routes>
  )
}

export default ReportesRoutes