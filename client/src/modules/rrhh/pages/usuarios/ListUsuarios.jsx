import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getUsuarios } from "./helpers/getUsuarios";
import { RowItemUsuario } from "./components/RowItemUsuario";
import { CustomTablePagination } from "../../../../components/CustomTablePagination";
import { DialogDeleteUsuario } from "./components/DialogDeleteUsuario";
import { RiUserAddLine } from "react-icons/ri";
import { Link } from "react-router-dom";

export const ListUsuarios = () => {
  const [usuarios, setusuarios] = useState([]);

  // ESTADOS PARA EL DIALOG DELETE
  const [mostrarDialog, setMostrarDialog] = useState(false);
  const [itemSeleccionado, setItemSeleccionado] = useState(null);

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
  const onDeleteItemSelected = async (idItem) => {
    console.log("delete item: " + idItem);
    onCloseDeleteDialog();
  };

  const obtenerUsuarios = async () => {
    const result = await getUsuarios();
    // console.log(result);
    setusuarios(result);
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  return (
    <>
      <div className="flex items-center justify-end bg-gray-100 p-4">
        {/* Botón de "Agregar usuario" en el extremo derecho */}
        <Link
          to={"/rrhh/usuario/create"}
          className="bg-transparent hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded flex items-center"
        >
          <RiUserAddLine className="mr-2" /> Añadir usuario
        </Link>
      </div>
      <Paper>
        {/* PAGINACION DE LA TABLA */}
        <CustomTablePagination count={usuarios.length} />
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
                <TableCell align="left" width={200}>
                  <b>Nombre</b>
                </TableCell>
                <TableCell align="left" width={120}>
                  <b>Rol</b>
                </TableCell>
                <TableCell align="left" width={100}>
                  <b>Usuario</b>
                </TableCell>
                <TableCell align="left" width={120}>
                  <b>Correo</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usuarios.map((item) => (
                <RowItemUsuario
                  key={item.id}
                  item={item}
                  onShowDeleteDialog={onShowDeleteDialog}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {mostrarDialog && (
        <DialogDeleteUsuario
          item={itemSeleccionado}
          showDialog={mostrarDialog}
          onDeleteItemSelected={onDeleteItemSelected}
          onCloseDeleteDialog={onCloseDeleteDialog}
        />
      )}
    </>
  );
};
