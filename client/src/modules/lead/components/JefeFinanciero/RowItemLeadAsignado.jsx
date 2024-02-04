import React from "react";
import { Checkbox, TableCell, TableRow } from "@mui/material";
import { CustomMoreVerticalActions } from "../../../../components";
import { useNavigate, Link } from "react-router-dom";

const RowItemLeadAsignado = ({ item, checkedElement }) => {
  const { id } = item;

  const navigate = useNavigate();

  const onEditItemSelected = () => {
    navigate(`/lead/update/${id}`);
  };

  return (
    <TableRow>
      <TableCell>
        <Checkbox
          checked={item["isSelected"]}
          onChange={(e) => checkedElement(e, item.id)}
          inputProps={{ "aria-label": "controlled" }}
        />
        <CustomMoreVerticalActions
          activeOnDelete={false}
          onEdit={onEditItemSelected}
        />
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
