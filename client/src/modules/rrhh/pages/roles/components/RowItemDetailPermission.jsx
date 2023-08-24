import React from "react";
import { TableCell, TableRow } from "@mui/material";
import { BsFillCheckCircleFill, BsXCircleFill } from "react-icons/bs";

export const RowItemDetailPermission = ({ item }) => {
  return (
    <TableRow
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
      }}
    >
      <TableCell>{item.nombre}</TableCell>
      <TableCell align="center">
        {item.canView ? (
          <BsFillCheckCircleFill color="green" size={20} className="mx-auto" />
        ) : (
          <BsXCircleFill color="red" size={20} className="mx-auto" />
        )}
      </TableCell>
      <TableCell align="center">
        {item.canEdit ? (
          <BsFillCheckCircleFill color="green" size={20} className="mx-auto" />
        ) : (
          <BsXCircleFill color="red" size={20} className="mx-auto" />
        )}
      </TableCell>
      <TableCell align="center">
        {item.canDelete ? (
          <BsFillCheckCircleFill color="green" size={20} className="mx-auto" />
        ) : (
          <BsXCircleFill color="red" size={20} className="mx-auto" />
        )}
      </TableCell>
      <TableCell align="center">
        {item.canCreate ? (
          <BsFillCheckCircleFill color="green" size={20} className="mx-auto" />
        ) : (
          <BsXCircleFill color="red" size={20} className="mx-auto" />
        )}
      </TableCell>
    </TableRow>
  );
};
