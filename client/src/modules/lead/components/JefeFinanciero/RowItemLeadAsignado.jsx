import { Checkbox, TableCell, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CustomMoreVerticalActions } from "../../../../components";

const RowItemLeadAsignado = ({ item, index, updateLeadAsignado }) => {
  const [checked, setChecked] = useState(item["isSelected"]);

  const handleChange = (event) => {
    const state = event.target.checked;
    setChecked(state);
    updateLeadAsignado(index, state);
  };

  useEffect(() => {
    setChecked(item["isSelected"]);
  }, [item]);

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
      <TableCell>{item.campania.proyecto.nombre}</TableCell>
      <TableCell>{item.estadoLead}</TableCell>
      <TableCell>
        {item.asesor.first_name} {item.asesor.last_name}
      </TableCell>
    </TableRow>
  );
};

export default RowItemLeadAsignado;
