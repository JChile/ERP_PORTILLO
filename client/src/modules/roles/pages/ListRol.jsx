import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { RiUserAddLine } from "react-icons/ri";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { RowItemRol } from "../components";
import { deleteRolById, getRoles } from "../helpers";
import { CustomAlert, CustomCircularProgress } from "../../../components";
import { useAlertMUI, useCustomTablePagination } from "../../../hooks";
import { combinarErrores } from "../../../utils";
import { Button, TablePagination, TextField } from "@mui/material";
import { AuthContext } from "../../../auth";
import { MdClose, MdSearch } from "react-icons/md";

export const ListRol = () => {
  const { authTokens } = useContext(AuthContext);
  const [roles, setRoles] = useState([]);
  const [auxRoles, setAuxRoles] = useState([]);

  // flag reset
  const [flagReset, setFlagReset] = useState();
  const [countSelectedElements, setCountSelectedElements] = useState(0);

  // hook alert
  const {
    feedbackCreate,
    feedbackMessages,
    setFeedbackMessages,
    handleCloseFeedback,
    handleClickFeedback,
  } = useAlertMUI();

  const {
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    paginatedItems,
  } = useCustomTablePagination(auxRoles);

  // estado de progress
  const [visibleProgress, setVisibleProgress] = useState(false);

  // numero de items seleccionados
  const [filterData, setFilterData] = useState({
    nombre: "",
    permisos: "",
  });

  const { nombre, permisos } = filterData;

  const handledFilterData = () => {
    setVisibleProgress(true);
    const dataFilter = roles.filter((element) => {
      const nombreElement = element["name"].toString().toLowerCase();
      const descriptionPermissions = element["permissions"]
        .map((element) => element["name"])
        .join(", ");
      const regex = /Can view (\w+)/g;
      const matches = [...descriptionPermissions.matchAll(regex)];
      const tercerTermino = matches.map((match) => match[1]);
      const permisosElement = [...new Set(tercerTermino)].join(", ");

      if (
        (filterData["nombre"] !== "" &&
          !nombreElement.includes(filterData["nombre"].toLowerCase())) ||
        (filterData["permisos"] !== "" &&
          !permisosElement.includes(filterData["permisos"].toLowerCase()))
      ) {
        return false;
      }
      return true;
    });

    setAuxRoles(dataFilter);
    setFlagReset(true);
    setVisibleProgress(false);
  };

  // reset filters
  const handledResetDataFilter = () => {
    setAuxRoles(roles);
    // reset filtros
    setFilterData({
      nombre: "",
      permisos: "",
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

  // eliminar roles
  const eliminarRoles = async (itemId) => {
    setVisibleProgress(true);
    try {
      const result = await deleteRolById(itemId, authTokens["access"]);
      // buscamos el rol eliminado y lo eliminamos de la data
      const filterData = roles.filter((element) => element.id !== itemId);
      setRoles(filterData);
      setAuxRoles(filterData);
      // desactivamos el progress
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

  // obtener roles
  const obtenerRoles = async () => {
    setVisibleProgress(true);
    try {
      const result = await getRoles(authTokens["access"]);
      console.log(result);
      setRoles(result);
      setAuxRoles(result);
      // quitar progress visible circular
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
    obtenerRoles();
  }, []);

  return (
    <React.Fragment>
      <div className="flex items-center justify-end bg-gray-100 p-4">
        <Link
          to={"/rol/create"}
          className="bg-transparent hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded flex items-center"
        >
          <RiUserAddLine className="mr-2" /> Añadir Rol
        </Link>
      </div>
      <Paper sx={{ marginTop: "1rem", borderRadius: "0px" }}>
        <TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
            component="div"
            count={roles.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
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
                <TableCell align="center" width={50}>
                  <b>Acciones</b>
                </TableCell>
                <TableCell align="left" width={100}>
                  <b>Nombre</b>
                </TableCell>
                <TableCell align="left" width={150}>
                  <b>Permisos</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center">
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
                  <TextField
                    size="small"
                    variant="outlined"
                    placeholder="Permisos"
                    type="text"
                    name="permisos"
                    value={permisos}
                    onChange={handledFilterInputValues}
                  />
                </TableCell>
              </TableRow>
              {paginatedItems.map((item) => (
                <RowItemRol
                  key={item.id}
                  item={item}
                  eliminarRol={eliminarRoles}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      {/* COMPONENTE ALERTA */}
      <CustomAlert
        feedbackCreate={feedbackCreate}
        feedbackMessages={feedbackMessages}
        handleCloseFeedback={handleCloseFeedback}
      />
      {/* CIRCULAR PROGRESS */}
      {visibleProgress && <CustomCircularProgress />}
    </React.Fragment>
  );
};
