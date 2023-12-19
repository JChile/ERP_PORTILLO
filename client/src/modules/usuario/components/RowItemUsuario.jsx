import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { Link, useNavigate } from "react-router-dom";
import { CustomMoreVerticalActions } from "../../../components";

export const RowItemUsuario = ({ item, onShowDeleteDialog }) => {
  const navigate = useNavigate();

  const onDeleteItemSelected = () => {
    onShowDeleteDialog(item);
  };

  const onEditItemSelected = () => {
    navigate(`/usuario/update/${item.id}`);
  };

  return (
    <TableRow
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
      }}
    >
      <TableCell>
        <CustomMoreVerticalActions
          activeOnDelete={item.is_active}
          onEdit={onEditItemSelected}
          onDelete={onDeleteItemSelected}
        />
      </TableCell>
      <TableCell>
        <Link
          className="text-blue-500"
          to={`/usuario/detail/${item.id}`}
        >{`${item.first_name} ${item.last_name}`}</Link>
      </TableCell>
      <TableCell>{item.groups[0].name}</TableCell>
      <TableCell>{item.username}</TableCell>
      <TableCell>{item.email}</TableCell>
    </TableRow>
  );
};
