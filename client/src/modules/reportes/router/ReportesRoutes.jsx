import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ReportesHome from '../pages/ReportesHome'

const ReportesRoutes = () => {
  return (
    <Routes>
        <Route path="" element={<ReportesHome />} />
    </Routes>
  )
}

export default ReportesRoutes