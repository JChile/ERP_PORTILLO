import { Checkbox, TableCell, TableRow } from "@mui/material";
import React, { useEffect } from "react";

export const RowItemLeadNoAsignado = ({ item }) => {
  const [checked, setChecked] = React.useState(false);
  const handleChange = (event) => {
    setChecked(event.target.checked);
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
      </TableCell>
      <TableCell>{item.celular}</TableCell>
      <TableCell>{item.nombre}</TableCell>
      <TableCell>Acciones</TableCell>
    </TableRow>
  );
};
