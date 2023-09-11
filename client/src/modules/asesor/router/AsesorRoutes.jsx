import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  CreateAsesor,
  DetailAsesor,
  ListAsesores,
  UpdateAsesor,
} from "../pages";

export const AsesorRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<ListAsesores />} />
      <Route path="create/" element={<CreateAsesor />} />
      <Route path="detail/:idAsesor" element={<DetailAsesor />} />
      <Route path="update/:idAsesor" element={<UpdateAsesor />} />
    </Routes>
  );
};
