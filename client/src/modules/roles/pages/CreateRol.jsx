import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { RowItemPermission } from "../components";
import { createRoles, getModulos } from "../helpers";
import { CustomAlert, CustomCircularProgress } from "../../../components";
import { useAlertMUI } from "../../../hooks";
import { combinarErrores } from "../../../utils";

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
    nameRol: "",
  });

  const { nameRol } = rol;

  const [modules, setModules] = useState([]);

  // hook alert
  const {
    feedbackCreate,
    feedbackMessages,
    setFeedbackMessages,
    handleCloseFeedback,
    handleClickFeedback,
  } = useAlertMUI();

  // estado de progress
  const [visibleProgress, setVisibleProgress] = useState(false);

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
    const auxPermissions = modules.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          can_view: [checked, item["can_view"][1]],
          can_change: [checked, item["can_change"][1]],
          can_delete: [checked, item["can_delete"][1]],
          can_add: [checked, item["can_add"][1]],
        };
      } else {
        return item;
      }
    });
    setModules(auxPermissions);
  };

  const modifyPermission = (id, name, checked) => {
    const auxPermissions = modules.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          [name]: [checked, item[name][1]],
        };
      } else {
        return item;
      }
    });
    setModules(auxPermissions);
  };

  const crearRol = async () => {
    const auxPermissions = [];

    modules.forEach((data) => {
      for (const key in data) {
        if (Array.isArray(data[key]) && data[key][0] === true) {
          auxPermissions.push(data[key][1]);
        }
      }
    });

    if (auxPermissions.length === 0 || nameRol.trim().length === 0) {
      if (auxPermissions.length === 0) {
        setFeedbackMessages({
          style_message: "warning",
          feedback_description_error: "No asignaste ningun permiso",
        });
        handleClickFeedback();
      }
      if (name.trim().length === 0) {
        setFeedbackMessages({
          style_message: "warning",
          feedback_description_error: "No asignaste un nombre de rol",
        });
        handleClickFeedback();
      }
    } else {
      const newRole = {
        name: nameRol,
        permissions: auxPermissions,
      };

      setVisibleProgress(true);
      try {
        // realizamos la llamada API
        const result = await createRoles(newRole);
        setVisibleProgress(false);
        // navegamos a la anterior vista
        onNavigateBack();
      } catch (error) {
        setVisibleProgress(false);
        const pilaError = combinarErrores(error);
        setFeedbackMessages({
          style_message: "error",
          feedback_description_error: pilaError,
        });
        handleClickFeedback();
      }
    }
  };

  const traerDatosModulos = async () => {
    const result = await getModulos();

    const resultParser = result.map((item) => {
      return {
        ...item,
        can_view: [true, item["can_view"]],
        can_change: [true, item["can_change"]],
        can_delete: [true, item["can_delete"]],
        can_add: [true, item["can_add"]],
      };
    });
    setModules(resultParser);
  };

  useEffect(() => {
    // llamada a API donde me traiga todos los modulos del sistema
    traerDatosModulos();
  }, []);

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
              name="nameRol"
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
              value={nameRol}
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
              {modules.map((row) => (
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
      {/* COMPONENTE ALERTA */}
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
