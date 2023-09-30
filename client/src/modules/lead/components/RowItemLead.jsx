import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TableCell, TableRow } from "@mui/material";
import { HiPhoneIncoming } from "react-icons/hi";
import { HiPhoneMissedCall } from "react-icons/hi";
import { CustomMoreVerticalActions } from "../../../components";
import { deleteLead } from "../helpers";
import { formatDate_ISO861_to_formatdate } from "../../../utils/formatDate";

export const RowItemLead = ({ item, onShowDeleteDialog }) => {
  const {
    id,
    nombre,
    apellido,
    celular,
    comentario,
    horaEntrega,
    llamar,
    estadoLead,
    objeciones,
    asesor,
    campania,
  } = item;
  const [showDialog, setShowDialog] = useState(false);
  const [itemSeleccionado, setItemSeleccionado] = useState(null);

  const navigate = useNavigate();

  const onCloseDeleteDialog = () => {
    // ocultamos el modal
    setShowDialog(false);
    // dejamos el null la data del detalle
    setItemSeleccionado(null);
  };

  const onDeleteItemSelected = async () => {
    console.log("------------" + id);
    const body = {
      estado: "I",
    };
    const result = await deleteLead(id, body);
    onCloseDeleteDialog();
    onShowDeleteDialog();
  };

  const onEditItemSelected = () => {
    navigate(`/lead/update/${id}`);
  };

  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell>
        <CustomMoreVerticalActions
          onDelete={onDeleteItemSelected}
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
          <a href={"https://wa.me/" + celular}>{celular}</a>
        </div>
      </TableCell>
      <TableCell>{estadoLead}</TableCell>
      <TableCell>{campania.nombre}</TableCell>
      <TableCell>{formatDate_ISO861_to_formatdate(horaEntrega)}</TableCell>
    </TableRow>
  );
};
