import React from "react";
import { Checkbox, TableCell, TableRow } from "@mui/material";
import { Link } from "react-router-dom";

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
      <TableCell>
        <Link
          to={`/lead/detail/${item["id"]}`}
          style={{
            textDecoration: "none",
            color: "black",
            transition: "color 0.3s", // Add a smooth transition effect
          }}
          onMouseEnter={(e) => {
            e.target.style.color = "blue";
          }}
          onMouseLeave={(e) => {
            e.target.style.color = "black";
          }}
        >
          <div className="flex flex-col gap-y-2">
            <span>{item["celular"]}</span>
          </div>
        </Link>
      </TableCell>
      <TableCell>{item["nombre"]}</TableCell>
      <TableCell>{item["apellido"]}</TableCell>
      <TableCell>{proyecto["nombre"]}</TableCell>
      <TableCell>{item["estadoLead"]}</TableCell>
    </TableRow>
  );
};
