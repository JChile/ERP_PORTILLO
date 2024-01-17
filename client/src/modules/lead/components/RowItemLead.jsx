import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TableCell, TableRow } from "@mui/material";
import { HiPhoneIncoming } from "react-icons/hi";
import { HiPhoneMissedCall } from "react-icons/hi";
import { CustomMoreVerticalActions } from "../../../components";
import { deleteLead } from "../helpers";
import { formatDate_ISO861_to_formatdate } from "../../../utils/formatDate";

export const RowItemLead = ({ item, onDeleteItemSelected }) => {
  const {
    id,
    nombre,
    apellido,
    celular,
    horaEntrega,
    llamar,
    estadoLead,
    campania,
  } = item;

  const navigate = useNavigate();

  const onEditItemSelected = () => {
    navigate(`/lead/update/${id}`);
  };

  const getMessageWhatsapp = () => {
    let text = `Saludos coordiales señor ${nombre} ${apellido}, ...`;
    return text;
  };

  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell>
        <CustomMoreVerticalActions
          onDelete={() => onDeleteItemSelected(item)}
          onEdit={onEditItemSelected}
        />
      </TableCell>
      <TableCell>
        <Link
          to={`/lead/detail/${id}`}
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
          <a
            href={`whatsapp://send?phone=${celular.replace(
              /\s+/g,
              ""
            )}&text=${getMessageWhatsapp()}`}
          >
            {celular}
          </a>
        </div>
      </TableCell>
      <TableCell>{estadoLead}</TableCell>
      <TableCell>{campania.nombre}</TableCell>
      <TableCell>{formatDate_ISO861_to_formatdate(horaEntrega)}</TableCell>
    </TableRow>
  );
};
