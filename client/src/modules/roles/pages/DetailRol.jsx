import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { RowItemDetailPermission } from "../components";
import { getRolById } from "../helpers";
import { CustomCircularProgress } from "../../../components";

// definimos el estilo del head
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const DetailRol = () => {
  const { idRol } = useParams();
  const numericId = parseInt(idRol);
  const [rolData, setRolData] = useState({
    name: "",
    modulos: [],
  });
  // estado de progress
  const [visibleProgress, setVisibleProgress] = useState(false);

  const { name, modulos } = rolData;

  // ESTADOS PARA LA NAVEGACION
  const navigate = useNavigate();
  const onNavigateBack = () => {
    navigate(-1);
  };

  const traerDataDetalleRol = async () => {
    // verificamos si el id pasado por parametro es numerico
    if (!isNaN(numericId) && Number.isInteger(numericId)) {
      setVisibleProgress(true);
      try {
        const resultDetalleRol = await getRolById(idRol);
        setRolData(resultDetalleRol);
      } catch (error) {
        console.error("Ocurrio un error:", error.message);
      }
      setVisibleProgress(false);
    } else {
      console.log("INVALIDO ID ROL");
    }
  };

  useEffect(() => {
    traerDataDetalleRol();
  }, []);

  return (
    <>
      <div className="relative border-2 rounded-md border-inherit p-5 flex justify-between items-center">
        <h1 className="text-2xl my-1">Detalle rol</h1>
        <div className="flex justify-center mt-4">
          <Link
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mr-2"
            to={`/group/update/${idRol}`}
          >
            Editar
          </Link>
          <button
            className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
            onClick={onNavigateBack}
          >
            Volver
          </button>
        </div>
      </div>
      <hr className="my-4"></hr>

      <div className="flex flex-col md:flex-row min-w-[242px] gap-x-2 gap-y-3">
        <div className="w-full flex flex-col gap-y-3">
          <label className="block flex gap-y-1 min-w-full">
            <span className="block text-sm font-medium min-w-[10rem] text-zinc-500">
              Nombre rol
            </span>
            <span className="block text-sm">{name}</span>
          </label>
        </div>
      </div>

      {/* Permisos */}
      <div className="mt-5">
        <div className="w-6/12 flex flex-col gap-y-5 mb-2">
          <label className="block flex flex-col gap-y-1 ">
            <span className="after:content-['*'] after:ml-0.5 after:text-yellow-500 block text-sm font-medium">
              Permisos
            </span>
          </label>
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Módulos</StyledTableCell>
                <StyledTableCell align="center">Ver</StyledTableCell>
                <StyledTableCell align="center">Crear</StyledTableCell>
                <StyledTableCell align="center">Editar</StyledTableCell>
                <StyledTableCell align="center">Borrar</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {modulos.map((row) => (
                <RowItemDetailPermission key={row.id} item={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {/* CIRCULAR PROGRESS */}
      {visibleProgress && <CustomCircularProgress />}
    </>
  );
};
