import React, { useContext, useEffect, useState } from "react";
import { getAsesorLeads } from "../../helpers";
import {
  CustomAlert,
  CustomCircularProgress,
  CustomDatePicker,
  CustomDatePickerFilter,
} from "../../../../components";
import { AuthContext } from "../../../../auth";
import { useNavigate } from "react-router-dom";
import { useAlertMUI, useCustomTablePagination } from "../../../../hooks";
import { combinarErrores, formatDate_ISO861_to_date } from "../../../../utils";
import {
  Button,
  Checkbox,
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
import { MdClose, MdSearch } from "react-icons/md";
import { SelectBoolean, SelectProyecto } from "../../../../components/select";
import { RowItemLeadsAsesor } from "./RowItemLeadsAsesor";
import { MassActionsViewLeadsAsesor } from "./acciones-masivas/MassActionsViewLeadsAsesor";

export const ListAsesorVentasLead = () => {
  const { authTokens } = useContext(AuthContext);
  const [leads, setLeads] = useState([]);
  const [auxLeads, setAuxLeads] = useState([]);
  const [checked, setChecked] = useState(false);

  // flag reset
  const [flagReset, setFlagReset] = useState();
  const [countSelectedElements, setCountSelectedElements] = useState(0);

  // pagination
  const {
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    paginatedItems,
  } = useCustomTablePagination(auxLeads, 25);

  const {
    feedbackCreate,
    feedbackMessages,
    handleClickFeedback,
    handleCloseFeedback,
    setFeedbackMessages,
  } = useAlertMUI();

  // hook navegacion
  const navigate = useNavigate();
  // visible progress
  const [visibleProgress, setVisibleProgress] = useState(false);

  const [filteredLeads, setFilteredLeads] = useState([]);
  // filtros de fechas
  const [filterState, setFilterState] = useState({
    startDate: null,
    endDate: null,
  });

  // numero de items seleccionados
  const [filterData, setFilterData] = useState({
    celular: "",
    proyecto: "",
    asignado: "",
    horaRecepcion: "",
    fecha_creacion: "",
  });

  const { celular, asignado, proyecto, horaRecepcion, fecha_creacion } =
    filterData;

  // funcion para cambiar fecha desde
  const onChangeDatePickerFechaDesde = (newDate) => {
    console.log(newDate);
  };

  // funcion para cambiar fecha hasta
  const onChangeDatePickerFechaHasta = (newDate) => {
    console.log(newDate);
  };

  const handledFilterData = () => {
    setVisibleProgress(true);
    const dataFilter = leads.filter((element) => {
      const celularElement = element["celular"].toString().toLowerCase();
      const proyectoElement = element["campania"]["proyecto"]["nombre"]
        .toString()
        .toLowerCase();
      const asignadoElement = element["asignado"];
      const horaRecepcionElement = formatDate_ISO861_to_date(
        element["horaRecepcion"]
      );
      const fechaCreacionElement = formatDate_ISO861_to_date(
        element["fecha_creacion"]
      );

      if (
        (filterData["celular"] !== "" &&
          !celularElement.includes(filterData["celular"].toLowerCase())) ||
        (filterData["proyecto"] !== "" &&
          !proyectoElement.includes(filterData["proyecto"].toLowerCase())) ||
        (filterData["asignado"] !== "" &&
          !filterData["asignado"] === asignadoElement) ||
        (filterData["horaRecepcion"] !== "" &&
          !horaRecepcionElement.includes(filterData["horaRecepcion"])) ||
        (filterData["fecha_creacion"] !== "" &&
          !fechaCreacionElement.includes(filterData["fecha_creacion"]))
      ) {
        return false;
      }
      return true;
    });

    setAuxLeads(dataFilter);
    setFlagReset(true);
    setVisibleProgress(false);
  };

  const handledResetDataFilter = () => {
    const resetDate = leads.map((element) => {
      return { ...element, isSelected: false };
    });
    setAuxLeads(resetDate);
    // reset filtros
    setFilterData({
      celular: "",
      proyecto: "",
      asignado: "",
      horaRecepcion: "",
      fecha_creacion: "",
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

  // FUNCIONES PARA EL MANEJO DE LOS LEADS POR MARKETING
  const handleChangeCheckAll = (event) => {
    const state = event.target.checked;
    setChecked(state);
    const leadsChecked = auxLeads.map((element) => {
      return {
        ...element,
        isSelected: state,
      };
    });
    // actualizamos el numero de elmenentos seleccionados
    if (state) {
      setCountSelectedElements(leadsChecked.length);
    } else {
      setCountSelectedElements(0);
    }
    setAuxLeads(leadsChecked);
  };

  // seleccionar un elemento
  const handledCheckElement = (event, idItem) => {
    const dataItemChecked = auxLeads.map((element) =>
      element.id === idItem
        ? { ...element, isSelected: event.target.checked }
        : element
    );
    // actualizamos el valor del filtro
    setAuxLeads(dataItemChecked);
    // si hay algun cambio, el checkall pasa a false
    setChecked(false);
    // actualizamos el counter
    if (event.target.checked) {
      setCountSelectedElements((c) => c + 1);
    } else {
      setCountSelectedElements((c) => c - 1);
    }
  };

  const traerLeadByAsesor = async () => {
    setFlagReset(false);
    setVisibleProgress(true);
    setCountSelectedElements(0);
    try {
      const rowData = await getAsesorLeads(authTokens["access"]);
      const { leads } = rowData;
      const formatData = leads.map((element) => {
        return {
          ...element,
          isSelected: false,
        };
      });
      console.log(formatData);
      setLeads(formatData);
      setAuxLeads(formatData);
      setVisibleProgress(false);
    } catch (error) {
      console.log(error);
      const pilaError = combinarErrores(error);
      setFeedbackMessages({
        style_message: "error",
        feedback_description_error: pilaError,
      });
      handleClickFeedback();
      setVisibleProgress(false);
    }
  };

  useEffect(() => {
    traerLeadByAsesor();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-y-5">
        <h1 className="text-2xl">Gestión de leads - asesor</h1>
        <div className="mt-2 flex justify-between">
          {/* Filtro de fechas */}
          <div className="flex gap-x-2">
            <CustomDatePicker
              onNewFecha={onChangeDatePickerFechaDesde}
              label="Fecha Desde"
            />
            <CustomDatePicker
              onNewFecha={onChangeDatePickerFechaHasta}
              label="Fecha Hasta"
            />
          </div>
        </div>

        <React.Fragment>
          {/* SECCION DE ACCIONES MASIVAS */}
          <div className="flex items-center mb-2">
            <p className="mr-1">Acciones</p>
            <MassActionsViewLeadsAsesor
              data={auxLeads.filter((element) => element.isSelected)}
              handleClickFeedback={handleClickFeedback}
              setFeedbackMessages={setFeedbackMessages}
              setVisibleProgress={setVisibleProgress}
              onLoadData={traerLeadByAsesor}
            />
            <div className="flex items-center bg-green-100 rounded p-2">
              <p className="text-green-500 font-bold mr-2">
                Número de items seleccionados
              </p>
              <p className="text-green-500 font-bold">
                {countSelectedElements}
              </p>
            </div>
          </div>
          {/* SECCION DE DATA */}
          <Paper sx={{ borderRadius: "0px" }}>
            <TableContainer
              sx={{
                minHeight: 700,
              }}
              arial-aria-labelledby="customized table"
            >
              <TablePagination
                sx={{ backgroundColor: "#F4F0F0" }}
                rowsPerPageOptions={[25, 50, 75, 100]}
                component="div"
                count={auxLeads.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
              <Table stickyHeader>
                <TableHead sx={{ background: "black" }}>
                  <TableRow
                    sx={{
                      "& th": {
                        backgroundColor: "#404040",
                        color: "whitesmoke",
                      },
                    }}
                  >
                    <TableCell>
                      <Checkbox
                        checked={checked}
                        onChange={handleChangeCheckAll}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </TableCell>
                    <TableCell>Celular</TableCell>
                    <TableCell>Proyecto</TableCell>
                    <TableCell align="center">Asignado</TableCell>
                    <TableCell>Fecha recepción</TableCell>
                    <TableCell>Fecha creación</TableCell>
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
                        placeholder="Número"
                        type="number"
                        name="celular"
                        value={celular}
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
                    <TableCell align="center">
                      <SelectBoolean
                        filterName="asignado"
                        onNewInput={handledFilterSelectValues}
                        defaultValue={asignado}
                      />
                    </TableCell>
                    <TableCell>
                      <CustomDatePickerFilter
                        onNewFecha={handledFilterDateValues}
                        filterName="horaRecepcion"
                        defaultValue={horaRecepcion}
                      />
                    </TableCell>
                    <TableCell>
                      <CustomDatePickerFilter
                        onNewFecha={handledFilterDateValues}
                        filterName="fecha_creacion"
                        defaultValue={fecha_creacion}
                      />
                    </TableCell>
                  </TableRow>
                  {paginatedItems.map((item, index) => (
                    <RowItemLeadsAsesor
                      item={item}
                      key={index}
                      checkedElement={handledCheckElement}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </React.Fragment>
      </div>
      {visibleProgress && <CustomCircularProgress />}
      <CustomAlert
        feedbackCreate={feedbackCreate}
        feedbackMessages={feedbackMessages}
        handleCloseFeedback={handleCloseFeedback}
      />
    </>
  );
};
