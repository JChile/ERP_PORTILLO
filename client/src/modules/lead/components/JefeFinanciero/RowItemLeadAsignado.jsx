import { Checkbox, TableCell, TableRow } from "@mui/material";
import React, { useState } from "react";
import { CustomMoreVerticalActions } from "../../../../components";

const RowItemLeadAsignado = ({ item }) => {
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  console.log(item);

  return (
    <TableRow>
      <TableCell>
        <Checkbox
          checked={checked}
          onChange={handleChange}
          inputProps={{ "aria-label": "controlled" }}
        />
        <CustomMoreVerticalActions />
      </TableCell>
      <TableCell>{item.celular}</TableCell>
      <TableCell>{item.nombre}</TableCell>
      <TableCell>{item.campania.nombre}</TableCell>
      <TableCell>{"Proyecto"}</TableCell>
      <TableCell>{item.estadoLead}</TableCell>
      <TableCell>
        {item.asesor.first_name} {item.asesor.last_name}
      </TableCell>
    </TableRow>
  );
};

export default RowItemLeadAsignado;
