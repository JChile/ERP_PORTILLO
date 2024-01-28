import { Checkbox, TableCell, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CustomMoreVerticalActions } from "../../../../components";

const RowItemLeadAsignado = ({ item, checkedElement }) => {
  return (
    <TableRow>
      <TableCell>
        <Checkbox
          checked={item["isSelected"]}
          onChange={(e) => checkedElement(e, item.id)}
          inputProps={{ "aria-label": "controlled" }}
        />
        <CustomMoreVerticalActions />
      </TableCell>
      <TableCell>{item.celular}</TableCell>
      <TableCell>{item.nombre}</TableCell>
      <TableCell>{item.campania.proyecto.nombre}</TableCell>
      <TableCell>{item.estadoLead}</TableCell>
      <TableCell>
        {item.asesor.first_name} {item.asesor.last_name}
      </TableCell>
    </TableRow>
  );
};

export default RowItemLeadAsignado;
