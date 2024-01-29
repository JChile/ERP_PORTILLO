import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { Link, useNavigate } from "react-router-dom";
import { CustomMoreVerticalActions } from "../../../components";
import { formatDate_ISO861_to_formatdate } from "../../../utils";

export const RowItemAsesor = ({ item, onShowDeleteDialog }) => {
  const navigate = useNavigate();

  const onDeleteItemSelected = () => {
    onShowDeleteDialog(item);
  };

  const onEditItemSelected = () => {
    navigate(`/asesor/update/${item.id}`);
  };

  return (
    <TableRow
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
      }}
    >
      <TableCell>
        <CustomMoreVerticalActions
          activeOnDelete={item.estado === "A"}
          onEdit={onEditItemSelected}
          onDelete={onDeleteItemSelected}
        />
      </TableCell>
      <TableCell>{item.codigo}</TableCell>
      <TableCell>
        <Link
          className="text-blue-500"
          to={`/asesor/detail/${item.id}`}
        >{`${item.user.first_name} ${item.user.last_name}`}</Link>
      </TableCell>
      <TableCell>
        {item.maximoLeads === -1 ? "Sin limite" : item.maximoLeads}
      </TableCell>
      <TableCell>
        <span
          className={`px-2 py-1 rounded-full ${
            item.estado === "A"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {item.estado === "A" ? "Activo" : "Inactivo"}
        </span>
      </TableCell>
      <TableCell>
        {formatDate_ISO861_to_formatdate(item.fechaActualizado)}
      </TableCell>
    </TableRow>
  );
};
