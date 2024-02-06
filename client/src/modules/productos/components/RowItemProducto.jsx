import { TableCell, TableRow } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { CustomMoreVerticalActions } from "../../../components";

export const RowItemProducto = ({ item, onDeleteItemSelected }) => {
  const { id, nombre, codigo, numero, area, tipo, proyecto, estado } = item;
  const navigate = useNavigate();

  const onEditItemSelected = () => {
    navigate(`/producto/update/${id}`);
  };

  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell>
        <CustomMoreVerticalActions
          onDelete={() => onDeleteItemSelected(item)}
          onEdit={onEditItemSelected}
          activeOnDelete={estado === "A" ? true : false}
        />
      </TableCell>
      <TableCell>
        <Link
          to={`/producto/detail/${id}`}
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
      <TableCell>{numero}</TableCell>
      <TableCell>{area}</TableCell>
      <TableCell>{tipo?.nombre ?? ""}</TableCell>
      <TableCell>{proyecto?.nombre ?? ""}</TableCell>
    </TableRow>
  );
};
