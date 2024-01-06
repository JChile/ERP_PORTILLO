import React from "react";
import { Route, Routes } from "react-router-dom";
import { CreateProducto } from "../pages/CreateProducto";
import { UpdateProducto } from "../pages/UpdateProducto";
import { DetailProducto, ListProductos } from "../pages";

export const ProductoRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<ListProductos />} />
      <Route path="create/" element={<CreateProducto />} />
      <Route path="update/:idProducto" element={<UpdateProducto />} />
      <Route path="detail/:idProducto" element={<DetailProducto />} />
    </Routes>
  );
};
