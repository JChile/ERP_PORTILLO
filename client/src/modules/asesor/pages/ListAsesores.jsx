import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getAsesores } from "../helpers";
import { RiUserAddLine } from "react-icons/ri";
import {
  CustomCircularProgress,
  CustomTablePagination,
} from "../../../components";
import { RowItemAsesor } from "../components";

export const ListAsesores = () => {
  const [asesores, setAsesores] = useState([]);

  // estado de progress
  const [visibleProgress, setVisibleProgress] = useState(false);

  const obtenerAsesores = async () => {
    const result = await getAsesores();
    setAsesores(result);
  };

  useEffect(() => {
    setVisibleProgress(true);
    obtenerAsesores();
    setVisibleProgress(false);
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
                <TableCell align="left" width={120}>
                  <b>Numero leads</b>
                </TableCell>
                <TableCell align="left" width={100}>
                  <b>Fecha actualizado</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {asesores.map((item) => (
                <RowItemAsesor key={item.id} item={item} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* PAGINACION DE LA TABLA */}
        <CustomTablePagination count={asesores.length} />
      </Paper>

      {/* CIRCULAR PROGRESS */}
      {visibleProgress && <CustomCircularProgress />}
    </>
  );
};
