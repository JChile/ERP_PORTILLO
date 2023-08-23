import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { RowItemPermission } from "./components/RowItemPermission";
import { useNavigate } from "react-router-dom";

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

export const CreateRol = () => {
  const [rol, setRol] = useState({
    nombre: "",
  });
  const { nombre } = rol;

  const [permissions, setPermissions] = useState([
    {
      id: 1,
      nombre: "Gestión de campañas",
      canView: true,
      canEdit: true,
      canDelete: true,
      canCreate: true,
    },
    {
      id: 2,
      nombre: "Gestión de leads",
      canView: true,
      canEdit: true,
      canDelete: true,
      canCreate: true,
    },
    {
      id: 3,
      nombre: "Gestión de usuarios",
      canView: true,
      canEdit: true,
      canDelete: true,
      canCreate: true,
    },
    {
      id: 4,
      nombre: "Gestión de roles",
      canView: true,
      canEdit: true,
      canDelete: true,
      canCreate: true,
    },
  ]);

  // ESTADOS PARA LA NAVEGACION
  const navigate = useNavigate();
  const onNavigateBack = () => {
    navigate(-1);
  };

  // HANDLED FORM
  const handledForm = ({ target }) => {
    const { name, value } = target;
    setRol({
      ...rol,
      [name]: value,
    });
  };

  const modifyAllPermissions = (id, checked) => {
    const auxPermissions = permissions.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          canView: checked,
          canEdit: checked,
          canDelete: checked,
          canCreate: checked,
        };
      } else {
        return item;
      }
    });
    console.log(auxPermissions);
    setPermissions(auxPermissions);
  };

  const modifyPermission = (id, name, checked) => {
    const auxPermissions = permissions.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          [name]: checked,
        };
      } else {
        return item;
      }
    });
    console.log(auxPermissions);
    setPermissions(auxPermissions);
  };

  const crearRol = () => {
    console.log(permissions);
  };

  return (
    <>
      <div className="relative border-2 rounded-md border-inherit p-5 flex justify-between items-center">
        <h1 className="text-2xl my-1">Crear rol</h1>
        <div className="flex justify-center mt-4">
          <button
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mr-2"
            onClick={crearRol}
          >
            Guardar
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
            onClick={onNavigateBack}
          >
            Cancelar
          </button>
        </div>
      </div>
      <hr className="my-4"></hr>
      <form method="post" className="min-w-[242px] flex gap-y-6 gap-x-8">
        <div className="w-6/12 flex flex-col gap-y-5">
          <label className="block flex flex-col gap-y-1 ">
            <span className="after:content-['*'] after:ml-0.5 after:text-yellow-500 block text-sm font-medium">
              Nombre Rol
            </span>
            <input
              type="text"
              name="nombre"
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
              value={nombre}
              onChange={handledForm}
            />
          </label>
        </div>
      </form>

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
              {permissions.map((row) => (
                <RowItemPermission
                  key={row.id}
                  item={row}
                  modifyPermission={modifyPermission}
                  modifyAllPermissions={modifyAllPermissions}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};
