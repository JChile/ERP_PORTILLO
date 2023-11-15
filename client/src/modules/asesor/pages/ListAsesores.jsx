import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { deleteAsesor, getAsesores } from "../helpers";
import { RiUserAddLine } from "react-icons/ri";
import {
  CustomAlert,
  CustomCircularProgress,
  CustomTablePagination,
} from "../../../components";
import { DialogDeleteAsesor, RowItemAsesor } from "../components";
import { combinarErrores } from "../../../utils";
import { useAlertMUI } from "../../../hooks";

export const ListAsesores = () => {
  const [asesores, setAsesores] = useState([]);

  // estado de progress
  const [visibleProgress, setVisibleProgress] = useState(false);

  // ESTADOS PARA EL DIALOG DELETE
  const [mostrarDialog, setMostrarDialog] = useState(false);
  const [itemSeleccionado, setItemSeleccionado] = useState(null);

  const {
    feedbackCreate,
    feedbackMessages,
    setFeedbackMessages,
    handleCloseFeedback,
    handleClickFeedback,
  } = useAlertMUI();

  // PARA ELIMINAR UN ITEM SELECCIONADO
  const onCloseDeleteDialog = () => {
    // ocultamos el modal
    setMostrarDialog(false);
    // dejamos el null la data del detalle
    setItemSeleccionado(null);
  };

  // MOSTRAR Y OCULTAR DETALLE DE USUARIO
  const onShowDeleteDialog = (item) => {
    setItemSeleccionado(item);
    setMostrarDialog(true);
  };

  // ELIMINAR DETALLE DE FORMULA
  const onDeleteItemSelected = async (item) => {
    try {
      const body = {
        codigo: item.codigo,
        user: item.user.id,
        estado: "I",
      };
      const result = await deleteAsesor(item.id, body);
      obtenerAsesores();
    } catch (error) {
      const pilaError = combinarErrores(error);
      setFeedbackMessages({
        style_message: "error",
        feedback_description_error: pilaError,
      });
      handleClickFeedback();
    }
    onCloseDeleteDialog();
  };

  const obtenerAsesores = async () => {
    setVisibleProgress(true);
    const result = await getAsesores();
    setAsesores(result);
    setVisibleProgress(false);
  };

  useEffect(() => {
    obtenerAsesores();
  }, []);

  return (
    <>
      <div className="flex items-center justify-end bg-gray-100 p-4">
        {/* Botón de "Agregar usuario" en el extremo derecho */}
        <Link
          to={"/asesor/create"}
          className="bg-transparent hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded flex items-center"
        >
          <RiUserAddLine className="mr-2" /> Añadir asesor
        </Link>
      </div>
      <Paper>
        <TableContainer>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow
                sx={{
                  "& th": {
                    color: "rgba(96, 96, 96)",
                    backgroundColor: "#f5f5f5",
                  },
                }}
              >
                <TableCell align="left" width={20}>
                  <b>Acciones</b>
                </TableCell>
                <TableCell align="left" width={100}>
                  <b>Codigo</b>
                </TableCell>
                <TableCell align="left" width={200}>
                  <b>Nombre</b>
                </TableCell>
                <TableCell align="left" width={80}>
                  <b>Máximo leads</b>
                </TableCell>
                <TableCell align="left" width={100}>
                  <b>Estado</b>
                </TableCell>
                <TableCell align="left" width={100}>
                  <b>Fecha actualizado</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {asesores.map((item) => (
                <RowItemAsesor
                  key={item.id}
                  item={item}
                  onShowDeleteDialog={onShowDeleteDialog}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* PAGINACION DE LA TABLA */}
        <CustomTablePagination count={asesores.length} />
      </Paper>

      {mostrarDialog && (
        <DialogDeleteAsesor
          item={itemSeleccionado}
          showDialog={mostrarDialog}
          onDeleteItemSelected={onDeleteItemSelected}
          onCloseDeleteDialog={onCloseDeleteDialog}
        />
      )}

      {/* CUSTOM ALERT */}
      <CustomAlert
        feedbackCreate={feedbackCreate}
        feedbackMessages={feedbackMessages}
        handleCloseFeedback={handleCloseFeedback}
      />

      {/* CIRCULAR PROGRESS */}
      {visibleProgress && <CustomCircularProgress />}
    </>
  );
};
