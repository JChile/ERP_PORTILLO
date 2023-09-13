import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { TableCell, TableRow } from "@mui/material";
import { HiPhoneIncoming } from "react-icons/hi";
import { HiPhoneMissedCall } from "react-icons/hi";
import { CustomMoreVerticalActions } from "../../../components";

export const RowItemLead = ({ item }) => {
  const {
    id,
    nombre,
    apellido,
    celular,
    comentario,
    horaEntrega,
    mensajeMarketing,
    llamar,
    estado,
    objeciones,
    asesor,
    campania,
  } = item;

  const navigate = useNavigate();

  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell>
        <CustomMoreVerticalActions />
      </TableCell>
      <TableCell>
        <Link
          to={`#`}
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
            <span>
              {nombre}
              <br />
              {apellido}
            </span>
          </div>
        </Link>
      </TableCell>
      <TableCell>
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            flexDirection: "row",
          }}
        >
          {llamar ? (
            <HiPhoneIncoming
              style={{
                marginRight: "12px",
                color: "green",
              }}
            />
          ) : (
            <HiPhoneMissedCall
              style={{
                marginRight: "12px",
                color: "red",
              }}
            />
          )}
          {celular}
        </div>
      </TableCell>
      <TableCell>{estado.nombre}</TableCell>
      <TableCell>{objeciones.nombre}</TableCell>
      <TableCell>{campania.nombre}</TableCell>
      <TableCell>{comentario}</TableCell>
      <TableCell>{horaEntrega}</TableCell>
    </TableRow>
  );
};
