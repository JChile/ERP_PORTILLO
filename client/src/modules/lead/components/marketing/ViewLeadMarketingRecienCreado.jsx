import React, { useContext, useEffect, useState } from "react";
import { useAlertMUI, useCustomTablePagination } from "../../../../hooks";
import { useNavigate } from "react-router-dom";
import {
  CustomAlert,
  CustomCircularProgress,
  CustomDatePickerFilter,
} from "../../../../components";
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
import { MdClose, MdSearch } from "react-icons/md";
import { SelectBoolean, SelectProyecto } from "../../../../components/select";
import { RowItemLeadMarketing } from "./RowItemLeadMarketing";
import { MassActionsViewLeadsMarketing } from "./acciones-masivas/MassActionsViewLeadsMarketing";
import { combinarErrores, formatDate_ISO861_to_date } from "../../../../utils";
import { deleteLead, getLeads } from "../../helpers";

export const ViewLeadMarketingRecienCreado = ({
  startDate,
  endDate,
  flagReload,
}) => {
  const { authTokens } = useContext(AuthContext);

  const [leads, setLeads] = useState([]);
  const [auxLeads, setAuxLeads] = useState([]);
  const [checked, setChecked] = useState(false);

  // visible progress
  const [visibleProgress, setVisibleProgress] = useState(false);

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

  // flag reset
  const [flagReset, setFlagReset] = useState();
  const [countSelectedElements, setCountSelectedElements] = useState(0);

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

  const handledFilterData = () => {
    setVisibleProgress(true);
    const dataFilter = leads.filter((element) => {
      const celularElement = element["celular"].toString().toLowerCase();
      const proyectoElement = element["campania"]["proyecto"]["nombre"]
        .toString()
        .toLowerCase();
      const asignadoElement = element["asignado"] ? "si" : "no";
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
          !asignadoElement.includes(filterData["asignado"].toLowerCase())) ||
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

  // eliminar un lead
  const onEliminarLead = async (item) => {
    setVisibleProgress(true);
    const { id } = item;
    const body = {
      estado: "I",
      celular: item["celular"],
      campania: item["campania"]["id"],
    };
    try {
      const result = await deleteLead(id, body, authTokens["access"]);
      // obtenemos las campañas
      traerLeads();
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

  // traer leads
  const traerLeads = async () => {
    setFlagReset(false);
    setVisibleProgress(true);
    setCountSelectedElements(0);
    try {
      let query = "recienCreado=True&estado=A";
      if (startDate && endDate) {
        query += `&desde=${startDate}T00:00:00&hasta=${endDate}T23:59:59`;
      }
      const rowData = await getLeads(authTokens["access"], query);
      const formatData = rowData.map((element) => {
        return {
          ...element,
          isSelected: false,
        };
      });
      setLeads(formatData);
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

  useEffect(() => {
    traerLeads();
  }, [flagReload]);

  return (
    <>
      <div className="flex items-center mb-2">
        <p className="mr-1">Acciones</p>
        <MassActionsViewLeadsMarketing
          data={auxLeads.filter((element) => element.isSelected)}
          handleClickFeedback={handleClickFeedback}
          setFeedbackMessages={setFeedbackMessages}
          setVisibleProgress={setVisibleProgress}
          onLoadData={traerLeads}
        />
        <div className="flex items-center bg-green-100 rounded p-2">
          <p className="text-green-500 font-bold mr-2">
            Número de items seleccionados
          </p>
          <p className="text-green-500 font-bold">{countSelectedElements}</p>
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
                <RowItemLeadMarketing
                  item={item}
                  key={index}
                  checkedElement={handledCheckElement}
                  onChangeLead={onEliminarLead}
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
