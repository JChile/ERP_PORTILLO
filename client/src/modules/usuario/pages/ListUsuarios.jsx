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
import { Button, TablePagination, TextField } from "@mui/material";
import { MdClose, MdSearch } from "react-icons/md";
import { SelectRol } from "../../../components/select";

export const ListUsuarios = () => {
  const { authTokens, currentUser, logoutUser } = useContext(AuthContext);
  const [usuarios, setUsuarios] = useState([]);
  const [auxUsuarios, setauxUsuarios] = useState([]);

  // flag reset
  const [flagReset, setFlagReset] = useState();
  const [countSelectedElements, setCountSelectedElements] = useState(0);

  // definimos el hook de pagination
  const {
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    paginatedItems,
  } = useCustomTablePagination(auxUsuarios);

  // hook alert
  const {
    feedbackCreate,
    feedbackMessages,
    setFeedbackMessages,
    handleCloseFeedback,
    handleClickFeedback,
  } = useAlertMUI();

  // Retroalimentacion, estado de progreso.
  const [visibleProgress, setVisibleProgress] = useState(true);

  // CONTROL DE ACTIVOS Y DESACTIVOS
  const [activeButton, setActiveButton] = useState(true);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  // numero de items seleccionados
  const [filterData, setFilterData] = useState({
    nombre: "",
    group: "",
    username: "",
    correo: "",
  });

  const { nombre, group, username, correo } = filterData;

  const handledFilterData = () => {
    setVisibleProgress(true);
    const dataFilter = usuarios.filter((element) => {
      const nombreElement = `${element["first_name"]
        .toString()
        .toLowerCase()} ${element["last_name"].toString().toLowerCase()}`;
      const rolElement =
        element["groups"].length === 0
          ? "sin rol"
          : element["groups"][0]["name"].toString().toLowerCase();
      const usernameElement = element["username"].toString().toLowerCase();
      const correoElement = element["email"].toString().toLowerCase();

      if (
        (filterData["nombre"] !== "" &&
          !nombreElement.includes(filterData["nombre"].toLowerCase())) ||
        (filterData["group"] !== "" &&
          !rolElement.includes(filterData["group"].toLowerCase())) ||
        (filterData["username"] !== "" &&
          !usernameElement.includes(filterData["username"].toLowerCase())) ||
        (filterData["correo"] !== "" &&
          !correoElement.includes(filterData["correo"].toLowerCase()))
      ) {
        return false;
      }
      return true;
    });

    setauxUsuarios(dataFilter);
    setFlagReset(true);
    setVisibleProgress(false);
  };

  const handledResetDataFilter = () => {
    setauxUsuarios(usuarios);
    // reset filtros
    setFilterData({
      nombre: "",
      group: "",
      username: "",
      correo: "",
    });
    setFlagReset(false);
  };

  // manejador de filtros para select values
  const handledFilterSelectValues = (value, name) => {
    setFilterData({
      ...filterData,
      [name]: value,
    });
    setFlagReset(false);
  };

  // manejador de filtros para input values
  const handledFilterInputValues = (event) => {
    const { target } = event;
    const { value, name } = target;
    setFilterData({
      ...filterData,
      [name]: value,
    });
    setFlagReset(false);
  };

  // ELIMINAR DETALLE DE FORMULA
  const onEliminarUsuario = async (idItem) => {
    const idUsuarioItem = idItem["id"];
    // formamos el body de la peticion
    const body = {
      is_active: false,
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

  const obtenerUsuarios = async () => {
    setVisibleProgress(true);
    try {
      const result = await getUsuarios(
        `is_active=${activeButton ? "True" : "False"}`,
        authTokens["access"]
      );
      setUsuarios(result);
      setauxUsuarios(result);
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
  }, [activeButton]);

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
              <TableRow>
                <TableCell>
                  {flagReset ? (
                    <Button
                      startIcon={<MdClose />}
                      sx={{
                        textTransform: "capitalize",
                        borderRadius: "0px",
                      }}
                      color="error"
                      variant="contained"
                      onClick={handledResetDataFilter}
                    >
                      Limpiar
                    </Button>
                  ) : (
                    <Button
                      startIcon={<MdSearch />}
                      sx={{
                        textTransform: "capitalize",
                        borderRadius: "0px",
                      }}
                      color="success"
                      variant="contained"
                      onClick={handledFilterData}
                    >
                      Buscar
                    </Button>
                  )}
                </TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    variant="outlined"
                    placeholder="Nombre"
                    type="text"
                    name="nombre"
                    value={nombre}
                    onChange={handledFilterInputValues}
                  />
                </TableCell>
                <TableCell>
                  <SelectRol
                    onNewInput={handledFilterSelectValues}
                    defaultValue={group}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    variant="outlined"
                    placeholder="Usuario"
                    type="text"
                    name="username"
                    value={username}
                    onChange={handledFilterInputValues}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    variant="outlined"
                    placeholder="Correo"
                    type="text"
                    name="correo"
                    value={correo}
                    onChange={handledFilterInputValues}
                  />
                </TableCell>
              </TableRow>
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
          count={auxUsuarios.length}
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
