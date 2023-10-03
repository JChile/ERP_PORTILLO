import { TableCell, TableRow } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { CustomMoreVerticalActions } from "../../../components";
import { formatDate_ISO861_to_formatdate } from "../../../utils/formatDate";

export const RowItemCampania = ({ item, onShowDeleteDialog }) => {
  const { id, nombre, codigo, fecha_creacion, proyecto, categoria, estado } =
    item;

  const navigate = useNavigate();

  const onEditItemSelected = () => {
    navigate(`/campania/update/${id}`);
  };

  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell>
        <CustomMoreVerticalActions
          onDelete={() => onShowDeleteDialog(item)}
          onEdit={onEditItemSelected}
          activeOnDelete={estado === "A" ? true : false}
        />
      </TableCell>
      <TableCell>
        <Link
          to={`/campania/detail/${id}`}
          style={{
            textDecoration: "none",
            color: "black",
            transition: "color 0.3s", // Add a smooth transition effect
          }}
          onMouseEnter={(e) => {
            e.target.style.color = "blue";
          }}
          onMouseLeave={(e) => {
            e.target.style.color = "black";
          }}
        >
          {nombre}
        </Link>
      </TableCell>
      <TableCell>{codigo}</TableCell>
      <TableCell>{formatDate_ISO861_to_formatdate(fecha_creacion)}</TableCell>
      <TableCell>{proyecto.nombre}</TableCell>
      <TableCell>{categoria.nombre}</TableCell>
    </TableRow>
  );
};
