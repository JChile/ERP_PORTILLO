import React, { useState } from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { CustomMoreVerticalActions } from "../../../../../components/CustomMoreVerticalActions";
import { Link, useNavigate } from "react-router-dom";

export const RowItemUsuario = ({ item, onShowDeleteDialog }) => {
  const navigate = useNavigate();

  const onDeleteItemSelected = () => {
    onShowDeleteDialog(item);
  };

  const onEditItemSelected = () => {
    navigate(`/rrhh/usuario/update/${item.id}`);
  };

  return (
    <TableRow
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
      }}
    >
      <TableCell>
        <CustomMoreVerticalActions
          onEdit={onEditItemSelected}
          onDelete={onDeleteItemSelected}
        />
      </TableCell>
      <TableCell>
        <Link
          className="text-blue-500"
          to={`/rrhh/usuario/detail/${item.id}`}
        >{`${item.first_name} ${item.last_name}`}</Link>
      </TableCell>
      <TableCell>{item.groups[0]}</TableCell>
      <TableCell>{item.username}</TableCell>
      <TableCell>{item.email}</TableCell>
    </TableRow>
  );
};
