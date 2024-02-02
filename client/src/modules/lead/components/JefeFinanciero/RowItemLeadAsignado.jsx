import React from "react";
import { Checkbox, TableCell, TableRow } from "@mui/material";
import { CustomMoreVerticalActions } from "../../../../components";
<<<<<<< HEAD
import { useNavigate, Link } from "react-router-dom";
=======
import { Link } from "react-router-dom";
>>>>>>> 8d6bdfe82e23cc540fbb4e6f6d944e3cac02990f

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
      <TableCell>
        <Link
          style={{
            textDecoration: "none",
            color: "black",
            transition: "color 0.3s",
          }}
          onMouseEnter={(e) => {
            e.target.style.color = "blue";
            e.target.style.fontWeight = "bold";
          }}
          onMouseLeave={(e) => {
            e.target.style.color = "black";
            e.target.style.fontWeight = "normal";
          }}
          to={`/lead/detail/${item.id}`}
        >
          {item.celular}
        </Link>
      </TableCell>
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
