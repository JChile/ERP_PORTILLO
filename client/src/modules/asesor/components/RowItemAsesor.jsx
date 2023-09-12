import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { Link, useNavigate } from "react-router-dom";
import { CustomMoreVerticalActions } from "../../../components";

export const RowItemAsesor = ({ item }) => {
  const navigate = useNavigate();

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
          activeOnDelete={item.is_active}
          onEdit={onEditItemSelected}
        />
      </TableCell>
      <TableCell>{item.codigoAsesor}</TableCell>
      <TableCell>
        <Link
          className="text-blue-500"
          to={`/asesor/detail/${item.id}`}
        >{`${item.first_name}`}</Link>
      </TableCell>
      <TableCell>{item.numeroLeads}</TableCell>
      <TableCell>{item.fechaActualizado}</TableCell>
    </TableRow>
  );
};
