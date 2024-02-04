import React from "react";
import { formatDate_ISO861_to_formatdate } from "../../../../utils";
import { Checkbox, TableCell, TableRow } from "@mui/material";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { CustomMoreVerticalActions } from "../../../../components";

export const RowItemLeadsAsesor = ({ item, checkedElement }) => {
  const { campania, id } = item;
  const { proyecto } = campania;

  const navigate = useNavigate();

  const onEditItemSelected = () => {
    navigate(`/lead/update/${id}`);
  };

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
        <CustomMoreVerticalActions
          activeOnDelete={false}
          onEdit={onEditItemSelected}
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
