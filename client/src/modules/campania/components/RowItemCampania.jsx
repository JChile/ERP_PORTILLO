import { TableCell, TableRow } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { formatDate_ISO861_to_formatdate } from "../../../utils/formatDate";
import { CustomMoreVerticalActionsCampania } from "./CustomMoreVerticalActionsCampania";

export const RowItemCampania = ({ item, onDeleteCampania }) => {
  const { id, nombre, codigo, fecha_creacion, proyecto, categoria, estado } =
    item;

  const navigate = useNavigate();

  const onDeleteCampaniaSelected = () => {
    onDeleteCampania(item);
  };

  const onEditItemSelected = () => {
    navigate(`/campania/update/${id}`);
  };

  const onViewGastos = () => {
    navigate(`/campania/gastos/${id}`)
  }

  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell>
        <CustomMoreVerticalActionsCampania
          onDelete={onDeleteCampaniaSelected}
          onEdit={onEditItemSelected}
          onViewGasto={onViewGastos}
          activeOnDelete={estado === "A" ? true : false}
          descriptionDialog="¿Deseas eliminar esta campaña?"
        />
      </TableCell>
      <TableCell>
        <Link className="text-blue-500" to={`/campania/detail/${id}`}>
          {nombre}
        </Link>
      </TableCell>
      <TableCell>{codigo}</TableCell>
      <TableCell>{proyecto.nombre}</TableCell>
      <TableCell>{categoria.nombre}</TableCell>
      <TableCell>{formatDate_ISO861_to_formatdate(fecha_creacion)}</TableCell>
    </TableRow>
  );
};
