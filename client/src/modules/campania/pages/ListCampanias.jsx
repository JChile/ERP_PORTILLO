import React, { useContext, useEffect, useState } from "react";
import { getCampanias, deleteCampania } from "../helpers";
import { Link } from "react-router-dom";
import { RowItemCampania } from "../components";
import {
  CustomAlert,
  CustomCircularProgress,
  CustomDatePickerFilter,
} from "../../../components";
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
import { useAlertMUI, useCustomTablePagination } from "../../../hooks";
import { combinarErrores, formatDate_ISO861_to_date } from "../../../utils";
import { AuthContext } from "../../../auth";
import { SelectProyecto } from "../../../components/select";
import { SelectCategoriaCampania } from "../../../components/select/categoria-campania-filter/SelectCategoriaCampania";

export const ListCampanias = () => {
  const { authTokens } = useContext(AuthContext);
  // Informaciion de las campanias.
  const [campanias, setCampanias] = useState([]);
  const [auxCampanias, setauxCampanias] = useState([]);

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
  } = useCustomTablePagination(auxCampanias);

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

  // Control de bottones, campanias activas e inactivas.
  const [activeButton, setActiveButton] = useState(true);

  const handleButtonState = (buttonState) => {
    setActiveButton(buttonState);
  };

  // numero de items seleccionados
  const [filterData, setFilterData] = useState({
    nombre: "",
    codigo: "",
    proyecto: "",
    categoria: "",
    fecha_estimada: "",
  });

  const { nombre, codigo, proyecto, categoria, fecha_estimada } = filterData;

  const handledFilterData = () => {
    setVisibleProgress(true);
    const dataFilter = campanias.filter((element) => {
      const nombreElement = element["nombre"].toString().toLowerCase();
      const codigoElement = element["codigo"].toString().toLowerCase();
      const proyectoElement = element["proyecto"]["nombre"]
        .toString()
        .toLowerCase();
      const categoriaElement = element["categoria"]["nombre"]
        .toString()
        .toLowerCase();
      const fechaEstimadoElement = formatDate_ISO861_to_date(
        element["fecha_estimada"]
      );

      if (
        (filterData["nombre"] !== "" &&
          !nombreElement.includes(filterData["nombre"].toLowerCase())) ||
        (filterData["codigo"] !== "" &&
          !codigoElement.includes(filterData["codigo"].toLowerCase())) ||
        (filterData["proyecto"] !== "" &&
          !proyectoElement.includes(filterData["proyecto"].toLowerCase())) ||
        (filterData["categoria"] !== "" &&
          !categoriaElement.includes(filterData["categoria"].toLowerCase())) ||
        (filterData["fecha_estimada"] !== "" &&
          !fechaEstimadoElement.includes(filterData["fecha_estimada"]))
      ) {
        return false;
      }
      return true;
    });

    setauxCampanias(dataFilter);
    setFlagReset(true);
    setVisibleProgress(false);
  };

  const handledResetDataFilter = () => {
    setauxCampanias(campanias);
    // reset filtros
    setFilterData({
      nombre: "",
      codigo: "",
      proyecto: "",
      categoria: "",
      fecha_estimada: "",
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

  // manejador de filtros para date values
  const handledFilterDateValues = (newDate, filterName) => {
    setFilterData({
      ...filterData,
      [filterName]: newDate,
    });
    setFlagReset(false);
  };

  // OBTENEMOS LAS CAMPAÑAS
  const obtenerCampanias = async () => {
    setFlagReset(false);
    setVisibleProgress(true);
    setCountSelectedElements(0);
    try {
      const result = await getCampanias(
        `estado=${activeButton ? "A" : "I"}`,
        authTokens["access"]
      );
      console.log(result);
      setCampanias(result);
      setauxCampanias(result);
      // ocultar el progress
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
    }
  };

  const onEliminarCampania = async (item) => {
    setVisibleProgress(true);
    const { id, proyecto, categoria } = item;
    const body = {
      estado: "I",
      proyecto: proyecto.id,
      categoria: categoria.id,
    };
    try {
      const result = await deleteCampania(id, body, authTokens["access"]);
      // obtenemos las campañas
      obtenerCampanias();
      // cerramos el loader
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
    obtenerCampanias();
  }, [activeButton]);

  const filters = ["Nombre", "Proyecto"];

  return (
    <>
      <div className="flex flex-col gap-y-5">
        <div className="flex flex-row justify-between">
          <div className="flex gap-x-3">
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
          </div>
          <div className="flex">
            <Link to={"/campania/create/"}>
              <Button
                endIcon={<MdAdd />}
                color="inherit"
                variant="contained"
                sx={{ borderRadius: "0px", textTransform: "capitalize" }}
              >
                Crear Campaña
              </Button>
            </Link>
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
              count={auxCampanias.length}
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
                  <TableCell>Codigo</TableCell>
                  <TableCell>Proyecto</TableCell>
                  <TableCell>Categoria</TableCell>
                  <TableCell>Fecha inicio</TableCell>
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
                      placeholder="Nombre"
                      type="text"
                      name="codigo"
                      value={codigo}
                      onChange={handledFilterInputValues}
                    />
                  </TableCell>
                  <TableCell>
                    <SelectProyecto
                      size="small"
                      onNewInput={handledFilterSelectValues}
                      defaultValue={proyecto}
                    />
                  </TableCell>
                  <TableCell>
                    <SelectCategoriaCampania
                      size="small"
                      onNewInput={handledFilterSelectValues}
                      defaultValue={categoria}
                      name="categoria"
                    />
                  </TableCell>
                  <TableCell>
                    <CustomDatePickerFilter
                      onNewFecha={handledFilterDateValues}
                      filterName="fecha_estimada"
                      defaultValue={fecha_estimada}
                    />
                  </TableCell>
                </TableRow>
                {paginatedItems.map((item) => (
                  <RowItemCampania
                    key={item.id}
                    item={item}
                    onDeleteCampania={onEliminarCampania}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
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
