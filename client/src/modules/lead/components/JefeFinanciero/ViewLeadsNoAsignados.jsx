import React, { useContext, useEffect, useState } from "react";
import { getLeads } from "../../helpers";
import { AuthContext } from "../../../../auth";
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
import { RowItemLeadNoAsignado } from "./RowItemLeadNoAsignado";
import { MdClose, MdSearch } from "react-icons/md";
import {
  CustomAlert,
  CustomCircularProgress,
  CustomDatePickerFilter,
} from "../../../../components";
import { useAlertMUI, useCustomTablePagination } from "../../../../hooks";
import {
  SelectEstadoLead,
  SelectProyecto,
} from "../../../../components/select";
import { MassActionsViewLeadsNoAsignados } from "./acciones-masivas/MassActionsViewLeadsNoAsignados";
import { combinarErrores, formatDate_ISO861_to_date } from "../../../../utils";
import SelectAsesor from "../../../../components/select/asesor-filter/SelectAsesor";

export const ViewLeadsNoAsignados = ({ startDate, endDate, flagReload }) => {
  // auth token
  const { authTokens } = useContext(AuthContext);
  // leads traidos de la peticion
  const [leadsNoAsignados, setLeadsNoAsignados] = useState([]);
  // leads filtrados
  const [auxLeadsNoAsignados, setAuxLeadsNoAsignados] = useState([]);
  // option check all
  const [checked, setChecked] = React.useState(false);
  // filtros
  const [filterData, setFilterData] = useState({
    celular: "",
    nombre: "",
    proyecto: "",
    asesor: "",
    fecha_desasignacion: "",
  });
  const { celular, nombre, proyecto, asesor, fecha_desasignacion } = filterData;

  // flag reset
  const [flagReset, setFlagReset] = useState(false);
  // counter elementos seleccionados
  const [countSelectedElements, setCountSelectedElements] = useState(0);
  // visible progress
  const [visibleProgress, setVisibleProgress] = useState(true);
  // pagination
  const {
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    paginatedItems,
  } = useCustomTablePagination(auxLeadsNoAsignados, 25);
  // custom alert
  const {
    feedbackCreate,
    feedbackMessages,
    setFeedbackMessages,
    handleCloseFeedback,
    handleClickFeedback,
  } = useAlertMUI();

  // funcion para manejar los filtros
  const handledFilterData = () => {
    setVisibleProgress(true);
    const dataFilter = leadsNoAsignados.filter((element) => {
      const celularElement = element["celular"].toString().toLowerCase();
      const nombreElement = `${element["nombre"]
        .toString()
        .toLowerCase()} ${element["apellido"].toString().toLowerCase()}`;
      const proyectoElement = element["campania"]["proyecto"]["nombre"]
        .toString()
        .toLowerCase();
      // Componente nombre completo
      const asesorNombre = element["penultimo_asesor"]["first_name"]
        .toString()
        .toLowerCase();
      const asesorApellido = element["penultimo_asesor"]["last_name"]
        .toString()
        .toLowerCase();

      const asesorElement = `${asesorNombre} ${asesorApellido}`;
      const fechaDesasignacionElement = formatDate_ISO861_to_date(
        element["fecha_desasignacion"]
      );

      // Verifica si alguna propiedad de filterData está vacía y omite el filtro
      if (
        (filterData["celular"] !== "" &&
          !celularElement.includes(filterData["celular"].toLowerCase())) ||
        (filterData["nombre"] !== "" &&
          !nombreElement.includes(filterData["nombre"].toLowerCase())) ||
        (filterData["proyecto"] !== "" &&
          !proyectoElement.includes(filterData["proyecto"].toLowerCase())) ||
        (filterData["asesor"] !== "" &&
          !asesorElement.includes(filterData["asesor"].toLowerCase())) ||
        (filterData["fecha_desasignacion"] !== "" &&
          !fechaDesasignacionElement.includes(
            filterData["fecha_desasignacion"].toLowerCase()
          ))
      ) {
        return false;
      }

      return true;
    });
    setAuxLeadsNoAsignados(dataFilter);
    setFlagReset(true);
    setVisibleProgress(false);
  };

  // reseteamos la data
  const handledResetDataFilter = () => {
    // primero reseteamos los valores
    const resetData = leadsNoAsignados.map((element) => {
      return {
        ...element,
        isSelected: false,
      };
    });
    setAuxLeadsNoAsignados(resetData);
    //luego reseteamos los filtros
    setFilterData({
      celular: "",
      nombre: "",
      proyecto: "",
      asesor: "",
      fecha_desasignacion: "",
    });
    // cambiamos el flag de reset
    setFlagReset(false);
  };

  // manejar filtros para campos de valor
  const handledFilterInputValues = (e) => {
    const { target } = e;
    const { value, name } = target;
    setFilterData({
      ...filterData,
      [name]: value,
    });
    // cuando se detecte un cambio, cambiamos el valor del flag de reset
    setFlagReset(false);
  };

  // manejar filtros para campos de filtros autocomplete
  const handledFilterSelectValues = (value, name) => {
    setFilterData({
      ...filterData,
      [name]: value,
    });
    // cuando se detecte un cambio, cambiamos el valor del flag de reset
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

  // seleccionar todos los datos filtrados
  const handleChangeCheckAll = (event) => {
    const state = event.target.checked;
    setChecked(state);
    const leadsChecked = auxLeadsNoAsignados.map((element) => {
      return {
        ...element,
        isSelected: state,
      };
    });
    // actualizamos el numero de elementos seleccionados
    if (state) {
      setCountSelectedElements(leadsChecked.length);
    } else {
      setCountSelectedElements(0);
    }
    // actualizamos el valor del filtro
    setAuxLeadsNoAsignados(leadsChecked);
  };

  // seleccionar un elemento
  const handledCheckElement = (event, idItem) => {
    const dataItemChecked = auxLeadsNoAsignados.map((element) =>
      element.id === idItem
        ? { ...element, isSelected: event.target.checked }
        : element
    );
    // actualizamos el valor del filtro
    setAuxLeadsNoAsignados(dataItemChecked);
    // si hay algun cambio, el checkall pasa a false
    setChecked(false);
    // actualizamos el counter
    if (event.target.checked) {
      setCountSelectedElements((c) => c + 1);
    } else {
      setCountSelectedElements((c) => c - 1);
    }
  };

  // traer informacion de leads no asociados
  const traerInformacionLeadNoAsociados = async () => {
    // mostrar el progress
    setVisibleProgress(true);
    setCountSelectedElements(0);
    try {
      let query = "asignado=False&estado=A&recienCreado=False";
      if (startDate && endDate) {
        query += `&desde=${startDate}T00:00:00&hasta=${endDate}T23:59:59`;
      }
      // se debe traer en un rango de 30 dias
      const result = await getLeads(authTokens["access"], query);
      console.log(result);
      const formatData = result.map((element) => {
        return {
          ...element,
          isSelected: false,
        };
      });
      setLeadsNoAsignados(formatData);
      setAuxLeadsNoAsignados(formatData);
      // ocultar el progress
      setVisibleProgress(false);
    } catch (error) {
      const pilaError = combinarErrores(error);
      // mostramos feedback de error
      setFeedbackMessages({
        style_message: "error",
        feedback_description_error: pilaError,
      });
      handleClickFeedback();
      // ocultar el progress
      setVisibleProgress(false);
    }
  };

  // eventos que se ejecutan antes de renderizar el componente
  useEffect(() => {
    traerInformacionLeadNoAsociados();
  }, [flagReload]);

  return (
    <>
      <div className="flex items-center mb-4">
        <p className="mr-1">Acciones</p>
        <MassActionsViewLeadsNoAsignados
          data={auxLeadsNoAsignados.filter((element) => element.isSelected)}
          handleClickFeedback={handleClickFeedback}
          setFeedbackMessages={setFeedbackMessages}
          setVisibleProgress={setVisibleProgress}
          onLoadData={traerInformacionLeadNoAsociados}
        />
        <div className="flex items-center bg-green-100 rounded p-2">
          <p className="text-green-500 font-bold mr-2">
            Numero de items seleccionados:
          </p>
          <p className="text-green-500 font-bold">{countSelectedElements}</p>
        </div>
      </div>
      <Paper sx={{ borderRadius: "0px" }}>
        <TableContainer
          sx={{ minWidth: 700 }}
          arial-aria-labelledby="customized table"
        >
          {/* PAGINACION DE LA TABLA */}
          <TablePagination
            sx={{ backgroundColor: "#F4F0F0" }}
            rowsPerPageOptions={[25, 50, 75, 100]}
            component="div"
            count={auxLeadsNoAsignados.length}
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
                    color: "rgba(200,200,200)",
                    backgroundColor: "#404040",
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
                <TableCell>Proyecto</TableCell>
                <TableCell>Último asesor</TableCell>
                <TableCell>Fecha desasignacion</TableCell>
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
                  <TextField
                    variant="outlined"
                    placeholder="Nombre"
                    size="small"
                    type="text"
                    name="nombre"
                    value={nombre}
                    onChange={handledFilterInputValues}
                  />
                </TableCell>
                <TableCell>
                  <SelectProyecto
                    onNewInput={handledFilterSelectValues}
                    size="small"
                    defaultValue={proyecto}
                  />
                </TableCell>
                <TableCell>
                  <SelectAsesor
                    size="small"
                    onNewInput={handledFilterSelectValues}
                    defaultValue={asesor}
                  />
                </TableCell>
                <TableCell>
                  <CustomDatePickerFilter
                    onNewFecha={handledFilterDateValues}
                    filterName="fecha_desasignacion"
                    defaultValue={fecha_desasignacion}
                  />
                </TableCell>
              </TableRow>
              {paginatedItems.map((item, index) => (
                <RowItemLeadNoAsignado
                  key={index}
                  item={item}
                  checkedElement={handledCheckElement}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      {visibleProgress && <CustomCircularProgress />}
      <CustomAlert
        feedbackCreate={feedbackCreate}
        feedbackMessages={feedbackMessages}
        handleCloseFeedback={handleCloseFeedback}
      />
    </>
  );
};
