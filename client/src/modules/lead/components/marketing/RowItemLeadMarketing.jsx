import React from "react";
import { formatDate_ISO861_to_formatdate } from "../../../../utils";
import { Checkbox, TableCell, TableRow } from "@mui/material";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";

export const RowItemLeadMarketing = ({ item, checkedElement }) => {
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
      <TableCell>{proyecto["nombre"]}</TableCell>
      <TableCell align="center">
        {item["asignado"] === true ? (
          <FiCheckCircle
            color="green"
            style={{ margin: "auto", display: "block", fontSize: "20px" }}
          />
        ) : (
          <FiXCircle
            color="red"
            style={{ margin: "auto", display: "block", fontSize: "20px" }}
          />
        )}
      </TableCell>
      <TableCell>
        {formatDate_ISO861_to_formatdate(item["horaRecepcion"])}
      </TableCell>
      <TableCell>
        {formatDate_ISO861_to_formatdate(item["fecha_creacion"])}
      </TableCell>
    </TableRow>
  );
};
