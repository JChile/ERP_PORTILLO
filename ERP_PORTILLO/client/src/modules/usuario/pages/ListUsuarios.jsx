import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getUsuarios, deactiveUsuario } from "../helpers";
import { RiUserAddLine } from "react-icons/ri";
import { RowItemUsuario } from "../components";
import { CustomCircularProgress, CustomAlert } from "../../../components";
import { AuthContext } from "../../../auth";
import { combinarErrores } from "../../../utils";
import { useAlertMUI, useCustomTablePagination } from "../../../hooks";
import { TablePagination } from "@mui/material";

export const ListUsuarios = () => {
  const { authTokens, currentUser, logoutUser } = useContext(AuthContext);
  const [usuarios, setusuarios] = useState([]);
  const [usuariosTemporal, setUsuariosTemporal] = useState([]);

  // CONTROL DE ACTIVOS Y DESACTIVOS
  const [activeButton, setActiveButton] = useState(true);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  // hook alert
  const {
    feedbackCreate,
    feedbackMessages,
    setFeedbackMessages,
    handleCloseFeedback,
    handleClickFeedback,
  } = useAlertMUI();

  // definimos el hook de pagination
  const {
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    paginatedItems,
  } = useCustomTablePagination(usuariosTemporal);

  // estado de progress
  const [visibleProgress, setVisibleProgress] = useState(false);

  // ELIMINAR DETALLE DE FORMULA
  const onEliminarUsuario = async (idItem) => {
    const idUsuarioItem = idItem["id"];
    // formamos el body de la peticion
    const body = {
      is_active: false,
      desasociar: idItem["groups"][0]["id"] === 1 ? true : false,
    };
    try {
      const result = await deactiveUsuario(
        idUsuarioItem,
        body,
        authTokens["access"]
      );

      // si se hizo modificaciones sobre el usuario logeado
      if (currentUser["user_id"] === idUsuarioItem) {
        logoutUser();
      } else {
        // traemos de nuevo la data
        obtenerUsuarios();
      }
    } catch (error) {
      setVisibleProgress(false);
      const pilaError = combinarErrores(error);
      // mostramos feedback de error
      setFeedbackMessages({
        style_message: "error",
        feedback_description_error: pilaError,
      });
      handleClickFeedback();
    }
  };

  // FILTROS
  const filtrar = (nameFilter, valor) => {
    let resultFilter = [];
    switch (nameFilter) {
      case "filterActivateUsuario":
        resultFilter = usuarios.filter((element) => {
          if (element.is_active === valor) {
            return true;
          } else {
            return false;
          }
        });
        setUsuariosTemporal(resultFilter);
        break;
      default:
        break;
    }
  };

  const obtenerUsuarios = async () => {
    setVisibleProgress(true);
    try {
      const result = await getUsuarios({ authToken: authTokens["access"] });
      setusuarios(result);
      // mostramos en primer lugar los activos
      setUsuariosTemporal(
        result.filter((element) => {
          if (element.is_active === true) {
            return true;
          } else {
            return false;
          }
        })
      );
      setVisibleProgress(false);
    } catch (error) {
      setVisibleProgress(false);
      const pilaError = combinarErrores(error);
      // mostramos feedback de error
      setFeedbackMessages({
        style_message: "error",
        feedback_description_error: pilaError,
      });
      handleClickFeedback();
    }
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  return (
    <div className="px-4">
      <div className="flex items-center justify-end bg-gray-100 p-4">
        {/* Botón de "Agregar usuario" en el extremo derecho */}
        <Link
          to={"/usuario/create"}
          className="bg-transparent hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded flex items-center"
        >
          <RiUserAddLine className="mr-2" /> Añadir usuario
        </Link>
      </div>

      <div className="flex justify-center mt-4 mb-4">
        <button
          onClick={() => {
            handleButtonClick(true);
            filtrar("filterActivateUsuario", true);
          }}
          className={`px-4 py-2 mr-2 rounded ${
            activeButton === true ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
        >
          Usuarios Activos
        </button>
        <button
          onClick={() => {
            handleButtonClick(false);
            filtrar("filterActivateUsuario", false);
          }}
          className={`px-4 py-2 rounded ${
            activeButton === false ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
        >
          Usuarios Inactivos
        </button>
      </div>

      <Paper>
        <TableContainer>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow
                sx={{
                  "& th": {
                    color: "rgba(200,200,200)",
                    backgroundColor: "#404040",
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
              {paginatedItems.map((item) => (
                <RowItemUsuario
                  key={item.id}
                  item={item}
                  onDeleteUsuario={onEliminarUsuario}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* PAGINACION DE LA TABLA */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          component="div"
          count={usuariosTemporal.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* COMPONENTE ALERTA */}
      <CustomAlert
        feedbackCreate={feedbackCreate}
        feedbackMessages={feedbackMessages}
        handleCloseFeedback={handleCloseFeedback}
      />

      {/* CIRCULAR PROGRESS */}
      {visibleProgress && <CustomCircularProgress />}
    </div>
  );
};
