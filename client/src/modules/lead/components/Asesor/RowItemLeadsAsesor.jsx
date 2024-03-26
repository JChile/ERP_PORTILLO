import React from "react";
import { formatDate_ISO861_to_formatdate } from "../../../../utils";
import { Checkbox, TableCell, TableRow } from "@mui/material";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaWhatsapp } from "react-icons/fa";
import { IoIosCall } from "react-icons/io";
import { FaCalendarAlt } from "react-icons/fa";


export const RowItemLeadsAsesor = ({ item, checkedElement }) => {
  const { campania, id, estadoLead, proyecto } = item;

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
        <FaEdit className="inline-block mx-1 cursor-pointer shadow-lg hover:shadow-blue-900" size={16} color="blue" onClick={onEditItemSelected} />
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
      <TableCell>{`${item["nombre"]} ${item["apellido"]}`}</TableCell>
      <TableCell>{proyecto["nombre"]}</TableCell>
      <TableCell>{item.producto ? item.producto["nombre"] : "No asignado"}</TableCell>
      <TableCell>
        <div className="flex gap-x-2 gap-y-1 justify-center">
          <FaWhatsapp />
          <span>{item["numWhatsapps"]}</span>
        </div>
        <div className="flex gap-x-2 gap-y-1 justify-center">
          <IoIosCall />
          <span>{item["numLlamadas"]}</span>
        </div>
        <div className="flex gap-x-2 gap-y-1 justify-center">
          <FaCalendarAlt />
          <span>{item["numEventos"]}</span>
        </div>
      </TableCell>
      <TableCell align="center">
        {item["importante"] === true ? (
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
      <TableCell align="center">
        <span style={{ backgroundColor: estadoLead["color"] }} className={`inline-block px-2 py-1 text-sm font-semibold leading-none rounded-full text-white`}>
          {estadoLead["nombre"]}
        </span>
      </TableCell>
      <TableCell align="center">
        {item["estadoSeparacionLead"] ? item["estadoSeparacionLead"]["nombre"] : "No"}
      </TableCell>
      <TableCell>
        {formatDate_ISO861_to_formatdate(item["fecha_asignacion"])}
      </TableCell>
    </TableRow>
  );
};
