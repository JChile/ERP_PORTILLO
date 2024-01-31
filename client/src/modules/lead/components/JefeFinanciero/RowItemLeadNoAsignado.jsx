import React from "react";
import { Checkbox, TableCell, TableRow } from "@mui/material";

export const RowItemLeadNoAsignado = ({ item, checkedElement }) => {
  const { campania } = item;
  const { proyecto } = campania;

  return (
    <TableRow>
      <TableCell>
        <Checkbox
          checked={item["isSelected"]}
          onChange={(e) => {
            checkedElement(e, item.id);
          }}
          inputProps={{ "aria-label": "controlled" }}
        />
      </TableCell>
      <TableCell>{item["celular"]}</TableCell>
      <TableCell>{item["nombre"]}</TableCell>
      <TableCell>{item["apellido"]}</TableCell>
      <TableCell>{proyecto["nombre"]}</TableCell>
      <TableCell>{item["estadoLead"]}</TableCell>
    </TableRow>
  );
};
