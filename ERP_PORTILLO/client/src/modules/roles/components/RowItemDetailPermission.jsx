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
        {item["can_view"][0] ? (
          <BsFillCheckCircleFill color="green" size={20} className="mx-auto" />
        ) : (
          <BsXCircleFill color="red" size={20} className="mx-auto" />
        )}
      </TableCell>
      <TableCell align="center">
        {item["can_add"][0] ? (
          <BsFillCheckCircleFill color="green" size={20} className="mx-auto" />
        ) : (
          <BsXCircleFill color="red" size={20} className="mx-auto" />
        )}
      </TableCell>
      <TableCell align="center">
        {item["can_change"][0] ? (
          <BsFillCheckCircleFill color="green" size={20} className="mx-auto" />
        ) : (
          <BsXCircleFill color="red" size={20} className="mx-auto" />
        )}
      </TableCell>
      <TableCell align="center">
        {item["can_delete"][0] ? (
          <BsFillCheckCircleFill color="green" size={20} className="mx-auto" />
        ) : (
          <BsXCircleFill color="red" size={20} className="mx-auto" />
        )}
      </TableCell>
    </TableRow>
  );
};
