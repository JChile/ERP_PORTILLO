import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { Link, useNavigate } from "react-router-dom";
import { CustomMoreVerticalActions } from "../../../components";

export const RowItemUsuario = ({ item, onDeleteUsuario }) => {
  const idGroup = item["groups"][0]["id"];
  const nameGroup = item.groups[0].name;
  const navigate = useNavigate();

  const onDeleteItemSelected = () => {
    onDeleteUsuario(item);
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
          titleDialog="Dialogo de confirmación"
          descriptionDialog={`${
            idGroup === 1
              ? "Se ha detectado que este usuario es asesor. Recuerda que esta operación desasociará sus lead en un rango de 1 mes."
              : ""
          }¿Estas seguro de eliminar este usuario?`}
        />
      </TableCell>
      <TableCell>
        <Link
          className="text-blue-500"
          to={`/usuario/detail/${item.id}`}
        >{`${item.first_name} ${item.last_name}`}</Link>
      </TableCell>
      <TableCell>{nameGroup}</TableCell>
      <TableCell>{item.username}</TableCell>
      <TableCell>{item.email}</TableCell>
    </TableRow>
  );
};
