import React, { useContext, useEffect, useState } from "react";
import { getLeads, getLeadsByQuery } from "../../helpers";
import {
  CustomAlert,
  CustomCircularProgress,
  CustomDatePicker,
  CustomDatePickerFilter,
} from "../../../../components";
import { SelectSeparacionLead } from "../../../../components/select/separacion-filter/SelectSeparacionLead";
import { AuthContext } from "../../../../auth";
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
import { MdClose, MdFilterAlt, MdSearch } from "react-icons/md";
import { SelectBoolean, SelectEstadoLead, SelectProyecto } from "../../../../components/select";
import { RowItemLeadsAsesor } from "./RowItemLeadsAsesor";
import { MassActionsViewLeadsAsesor } from "./acciones-masivas/MassActionsViewLeadsAsesor";
import { getCurrentTime } from "../../utils/getCurrentTime";

export const ListAsesorVentasLead = () => {
  const { authTokens } = useContext(AuthContext)
  const [auxLeads, setAuxLeads] = useState([])
  const [checked, setChecked] = useState(false)

  // flag reset
  const [flagReset, setFlagReset] = useState();
  const [countSelectedElements, setCountSelectedElements] = useState(0);
  const [paginationValue, setPaginationValue] = useState({ count: 0, next: '', previous: '' });

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

  // visible progress
  const [visibleProgress, setVisibleProgress] = useState(false);

  // numero de items seleccionados
  const [filterData, setFilterData] = useState({
    celular: '',
    nombre: '',
    proyecto: '',
    importante: '',
    estadoLead: '',
    estadoSeparacionLead: '',
    fecha_asignacion: '',
  });

  const {
    celular,
    nombre,
    proyecto,
    importante,
    estadoLead,
    estadoSeparacionLead,
    fecha_asignacion,
  } = filterData;

  // flag reload
  const [flagReload, setFlagReload] = useState(false);

  // filtros de fechas
  const [filterDate, setFilterDate] = useState({
    startDate: null,
    endDate: null,
  });
  const { startDate, endDate } = filterDate;

  // change flag
  const onSubmitFilter = (event) => {
    // cambiamos el flag de reload
    handleChangePage(null, 0)
    setFlagReload((prev) => !prev)
    //setFlagReset(true)
  };

  // funcion para cambiar fecha desde
  const onChangeDatePickerFechaDesde = (newDate) => {
    setFilterDate({
      ...filterDate,
      startDate: newDate,
    });
  };

  // funcion para cambiar fecha hasta
  const onChangeDatePickerFechaHasta = (newDate) => {
    setFilterDate({
      ...filterDate,
      endDate: newDate,
    });
  };

  const handledFilterData = () => {
    handleChangePage(null, 0)
    setFlagReload(prev => !prev)
    setFlagReset(true)
  };

  const handledResetDataFilter = () => {
    // reset filtros
    setFilterData({
      celular: '',
      nombre: '',
      proyecto: '',
      importante: '',
      estadoLead: '',
      estadoSeparacionLead: '',
      fecha_asignacion: '',
    });
    setFlagReset(false);
    setFlagReload(prev => !prev)
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
    //setFlagReset(false);
    setVisibleProgress(true);
    setCountSelectedElements(0);
    try {
      let query = `estado=A&page=${page + 1}&page_size=${rowsPerPage}&ordering=-horaRecepcion`
      /**
       * Logica: En caso de que el usuario seleccione una fecha de inicia y fin,
       * se inicia el filtro. Caso contrario, se automatiza para que se tenga un diferencia
       * de 30 dias.
       */
      if (startDate && endDate) {
        query += `&fecha_asignacion_range_after=${startDate}&fecha_asignacion_range_before=${endDate}`
      }
      else {
        const rangeDate = getCurrentTime()
        query += `&fecha_asignacion_range_after=${rangeDate.startDate}&fecha_asignacion_range_before=${rangeDate.endDate}`
      }

      if (filterData['celular']) query += `&celular=${filterData['celular']}`
      if (filterData['estadoLead']) query += `&estadoLead=${filterData['estadoLead']}`
      if (filterData['estadoSeparacionLead']) query += `&estadoSeparacionLead=${filterData['estadoSeparacionLead']}`
      if (filterData['fecha_asignacion']) query += `&fecha_asignacion=${filterData['fecha_asignacion']}`
      if (filterData['importante']) {
        let auxImportante = filterData['importante'] === 'Si' ? true : false
        query += `&importante=${auxImportante}`
      }
      if (filterData['nombre']) query += `&nombre=${filterData['nombre']}`
      if (filterData['proyecto']) query += `&proyecto=${filterData['proyecto']}`

      const rowData = await getLeadsByQuery(authTokens["access"], query);
      setPaginationValue({ count: rowData.count, next: rowData.next, previous: rowData.previous })
      const formatData = rowData.results.map((element) => {
        return {
          ...element,
          isSelected: false,
        };
      });
      setAuxLeads(formatData);
      setVisibleProgress(false);
    } catch (error) {
      const pilaError = combinarErrores(error);
      setFeedbackMessages({
        style_message: "error",
        feedback_description_error: pilaError,
      });
      handleClickFeedback();
      setVisibleProgress(false);
    }
  };

  const handleChangingPage = (event, newPage) => {
    handleChangePage(event, newPage)
    setFlagReload(prev => !prev)
  }

  const handleChangingRowsPerPage = (event) => {
    handleChangeRowsPerPage(event)
    setFlagReload(prev => !prev)
  }

  useEffect(() => {
    traerLeadByAsesor();
  }, [flagReload]);

  return (
    <>
      <div className="flex flex-col gap-y-5">
        <h1 className="text-2xl">Gestión de leads - asesor</h1>
        <div className="mt-2 flex justify-between">
          {/* Filtro de fechas */}
          <div className="flex gap-x-2">
            <CustomDatePicker
              defaultValue={startDate}
              onNewFecha={onChangeDatePickerFechaDesde}
              label="Fecha Desde"
            />
            <CustomDatePicker
              defaultValue={endDate}
              onNewFecha={onChangeDatePickerFechaHasta}
              label="Fecha Hasta"
            />
            <Button
              startIcon={<MdFilterAlt />}
              variant="contained"
              sx={{ textTransform: "capitalize" }}
              onClick={onSubmitFilter}
            >
              Filtrar
            </Button>
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
              arial-aria-labelledby="customized table"
            >
              <TablePagination
                sx={{ backgroundColor: "#F4F0F0" }}
                rowsPerPageOptions={[25, 50, 75, 100]}
                component="div"
                count={paginationValue.count}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangingPage}
                onRowsPerPageChange={handleChangingRowsPerPage}
              />
              <Table sx={{ minWidth: 700 }}>
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
                    <TableCell>Nombre</TableCell>
                    <TableCell align="center">Proyecto</TableCell>
                    <TableCell align="center">Producto</TableCell>
                    <TableCell>Registros</TableCell>
                    <TableCell align="center">Importante</TableCell>
                    <TableCell align="center">Estado</TableCell>
                    <TableCell align="center">Separación</TableCell>
                    <TableCell>Fecha asignacion</TableCell>
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
                        autoComplete="off"
                        type="number"
                        name="celular"
                        value={celular}
                        onChange={handledFilterInputValues}
                      />
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
                      <SelectProyecto
                        size="small"
                        onNewInput={handledFilterSelectValues}
                        defaultValue={proyecto}
                      />
                    </TableCell>
                    <TableCell>
                    </TableCell>
                    <TableCell>
                    </TableCell>
                    <TableCell align="center">
                      <SelectBoolean
                        filterName="importante"
                        onNewInput={handledFilterSelectValues}
                        defaultValue={importante}
                      />
                    </TableCell>
                    <TableCell>
                      <SelectEstadoLead
                        size="small"
                        onNewInput={handledFilterSelectValues}
                        defaultValue={estadoLead}
                      />
                    </TableCell>
                    <TableCell>
                      <SelectSeparacionLead
                        size="small"
                        onNewInput={handledFilterSelectValues}
                        defaultValue={estadoSeparacionLead}
                      />
                    </TableCell>
                    <TableCell>
                      <CustomDatePickerFilter
                        onNewFecha={handledFilterDateValues}
                        filterName="fecha_asignacion"
                        defaultValue={fecha_asignacion}
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
