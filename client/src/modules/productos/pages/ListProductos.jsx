import React, { useEffect, useState, useContext } from "react";
import { deleteProducto, getProductos } from "../helpers";
import { Link } from "react-router-dom";
import { DialogDeleteProducto, RowItemProducto } from "../components";
import {
  CustomAlert,
  CustomCircularProgress,
  FilterTipoProducto,
} from "../../../components";
import { AuthContext } from "../../../auth";
import { CustomInputBase } from "../../../components/CustomInputBase";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";
import { MdAdd, MdClose, MdSearch } from "react-icons/md";
import { CustomTableProducto } from "../../../components/CustomTableProducto";
import { combinarErrores } from "../../../utils";
import { useAlertMUI, useCustomTablePagination } from "../../../hooks";
import { SelectTipoProducto } from "../../../components/select/producto-filter/SelectTipoProducto";
import { SelectProyecto } from "../../../components/select";

export const ListProductos = () => {
  const { authTokens } = useContext(AuthContext);
  const [productos, setProductos] = useState([]);
  const [productosTemporal, setProductosTemporal] = useState([]);

  // flag reset
  const [flagReset, setFlagReset] = useState();
  const [countSelectedElements, setCountSelectedElements] = useState(0);

  // Retroalimentacion, estado de progreso.
  const [visibleProgress, setVisibleProgress] = useState(true);

  // Control de bottones, productos activas e inactivas.
  const [activeButton, setActiveButton] = useState(true);

  // Manejar los estados de los filtros
  const handleButtonState = (buttonState) => {
    setActiveButton(buttonState);
  };

  const [filterData, setFilterData] = useState({
    nombre: "",
    codigo: "",
    numero: "",
    area: "",
    tipo: "",
    proyecto: "",
  });
  const { nombre, codigo, numero, area, tipo, proyecto } = filterData;

  // definimos el hook de pagination
  const {
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    paginatedItems,
  } = useCustomTablePagination(productosTemporal);

  const {
    feedbackCreate,
    feedbackMessages,
    setFeedbackMessages,
    handleCloseFeedback,
    handleClickFeedback,
  } = useAlertMUI();

  const handledResetDataFilter = () => {
    setProductosTemporal(productos);
    // reset filtros
    setFilterData({
      nombre: "",
      codigo: "",
      numero: "",
      area: "",
      tipo: "",
      proyecto: "",
    });
    setFlagReset(false);
  };

  const handledFilterData = () => {
    setVisibleProgress(true);
    const dataFilter = productos.filter((element) => {
      const nombreElement = element["nombre"].toString().toLowerCase();
      const codigoElement = element["codigo"].toString().toLowerCase();
      const numeroElement = element["numero"].toString().toLowerCase();
      const areaElement = element["area"].toString().toLowerCase();
      const tipoElement = element["tipo"]["nombre"].toString().toLowerCase();
      const proyectoElement = element["proyecto"]["nombre"]
        .toString()
        .toLowerCase();

      if (
        (filterData["nombre"] !== "" &&
          !nombreElement.includes(filterData["nombre"].toLowerCase())) ||
        (filterData["codigo"] !== "" &&
          !codigoElement.includes(filterData["codigo"].toLowerCase())) ||
        (filterData["numero"] !== "" &&
          !numeroElement.includes(filterData["numero"].toLowerCase())) ||
        (filterData["area"] !== "" &&
          !areaElement.includes(filterData["area"].toLowerCase())) ||
        (filterData["tipo"] !== "" &&
          !tipoElement.includes(filterData["tipo"].toLowerCase())) ||
        (filterData["proyecto"] !== "" &&
          !proyectoElement.includes(filterData["proyecto"].toLowerCase()))
      ) {
        return false;
      }
      return true;
    });

    setProductosTemporal(dataFilter);
    setFlagReset(true);
    setVisibleProgress(false);
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
  // manejador de filtros para select values
  const handledFilterSelectValues = (value, name) => {
    setFilterData({
      ...filterData,
      [name]: value,
    });
    setFlagReset(false);
  };

  const obtenerProductos = async () => {
    setVisibleProgress(true);
    try {
      const result = await getProductos(
        `estado=${activeButton ? "A" : "I"}`,
        authTokens["access"]
      );
      setProductos(result);
      setProductosTemporal(result);
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

  const onDeleteItemSelected = async (item) => {
    setVisibleProgress(true);
    const { id, proyecto, tipo } = item;
    const body = {
      estado: "I",
      proyecto: proyecto.id,
      tipo: tipo.id,
    };
    try {
      const result = await deleteProducto(id, body, authTokens["access"]);
      obtenerProductos();
      //onCloseDeleteDialog();
      setVisibleProgress(false);
    } catch (error) {
      // ocultar el progress
      setVisibleProgress(false);
      const pilaError = combinarErrores(error);
      // mostramos feedback de error
      setFeedbackMessages({
        style_message: "error",
        feedback_description_error: pilaError,
      });
      handleClickFeedback();
      // cerramos el loader
      setVisibleProgress(false);
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, [activeButton]);

  const filters = ["Nombre", "Proyecto"];

  return (
    <>
      <div className="flex items-center justify-between gap-x-4 mb-9">
        <div className="flex flex-col gap-y-1 align-middle">
          <div className="flex justify-center gap-x-3">
            <Button
              variant="contained"
              sx={{
                borderRadius: "0px",
                textTransform: "capitalize",
                backgroundColor: activeButton ? "#1976d2" : "#d1d5db",
                color: activeButton ? "white" : "black",
              }}
              onClick={() => handleButtonState(true)}
            >
              Activas
            </Button>
            <Button
              variant="contained"
              sx={{
                borderRadius: "0px",
                textTransform: "capitalize",
                backgroundColor: !activeButton ? "#1976d2" : "#d1d5db",
                color: !activeButton ? "white" : "black",
              }}
              onClick={() => handleButtonState(false)}
            >
              Inactivas
            </Button>
            <Link to={"/producto/create/"}>
              <Button
                endIcon={<MdAdd />}
                color="inherit"
                variant="contained"
                sx={{ borderRadius: "0px", textTransform: "capitalize" }}
              >
                Crear
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Paper sx={{ borderRadius: "0px" }}>
        <TableContainer
          sx={{ minWidth: 700 }}
          arial-aria-labelledby="customized table"
        >
          <TablePagination
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
              component="div"
              count={productosTemporal.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  "& th": {
                    color: "rgba(200,200,200)",
                    backgroundColor: "#404040",
                  },
                }}
              >
                <TableCell>Acciones</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Código</TableCell>
                <TableCell>Número</TableCell>
                <TableCell>Area</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Proyecto</TableCell>
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
                  <TextField
                    size="small"
                    variant="outlined"
                    placeholder="codigo"
                    type="text"
                    name="codigo"
                    value={codigo}
                    onChange={handledFilterInputValues}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    variant="outlined"
                    placeholder="numero"
                    type="text"
                    name="numero"
                    value={numero}
                    onChange={handledFilterInputValues}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    variant="outlined"
                    placeholder="area"
                    type="text"
                    name="area"
                    value={area}
                    onChange={handledFilterInputValues}
                  />
                </TableCell>
                <TableCell>
                  <SelectTipoProducto
                    size="small"
                    onNewInput={handledFilterSelectValues}
                    defaultValue={tipo}
                    name="tipo"
                  />
                </TableCell>
                <TableCell>
                  <SelectProyecto
                    size="small"
                    onNewInput={handledFilterSelectValues}
                    defaultValue={proyecto}
                  />
                </TableCell>
              </TableRow>
              {paginatedItems.map((item) => (
                <RowItemProducto
                  key={item.id}
                  item={item}
                  onDeleteItemSelected={onDeleteItemSelected}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

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
