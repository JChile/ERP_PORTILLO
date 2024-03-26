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
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../auth";
import { getLeads, getLeadsByQuery } from "../../helpers";
import RowItemLeadAsignado from "./RowItemLeadAsignado";
import { MdClose, MdSearch } from "react-icons/md";
import {
  SelectEstadoLead,
  SelectProyecto,
} from "../../../../components/select";
import SelectAsesor from "../../../../components/select/asesor-filter/SelectAsesor";
import { useAlertMUI, useCustomTablePagination } from "../../../../hooks";
import { combinarErrores, formatDate_ISO861_to_date } from "../../../../utils";
import MassActionsViewLeadsAsignados from "./acciones-masivas/MassActionsViewLeadsAsignados";
import {
  CustomAlert,
  CustomCircularProgress,
  CustomDatePickerFilter,
} from "../../../../components";
import { SelectSeparacionLead } from "../../../../components/select/separacion-filter/SelectSeparacionLead";
import { getCurrentTime } from "../../utils/getCurrentTime";

const ViewLeadAsignados = ({ startDate, endDate, flagReload, setFlagReload }) => {
  const { authTokens } = useContext(AuthContext);
  const [leadAsignados, setLeadsAsignados] = useState([]);
  const [auxLeadsAsignados, setAuxLeadsAsignados] = useState([]);
  const [checked, setChecked] = useState(false);
  const [paginationValue, setPaginationValue] = useState({ count: 0, next: '', previous: '' });

  // numero de items seleccionados
  const [filterData, setFilterData] = useState({
    celular: "",
    nombre: "",
    estadoLead: "",
    proyecto: "",
    asesor: "",
    fecha_asignacion: "",
    estadoSeparacionLead: "",
  });

  const {
    celular,
    nombre,
    proyecto,
    asesor,
    estadoLead,
    fecha_asignacion,
    estadoSeparacionLead,
  } = filterData;

  // flag reset
  const [flagReset, setFlagReset] = useState();
  const [countSelectedElements, setCountSelectedElements] = useState(0);
  const [visibleProgress, setVisibleProgress] = useState(true);

  // pagination
  const {
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    paginatedItems,
  } = useCustomTablePagination(auxLeadsAsignados, 25);

  const {
    feedbackCreate,
    feedbackMessages,
    handleClickFeedback,
    handleCloseFeedback,
    setFeedbackMessages,
  } = useAlertMUI();

  const handledFilterData = () => {
    handleChangePage(null, 0)
    setFlagReload(prev => !prev)
    setFlagReset(true)
  }

  const handledResetDataFilter = () => {
    const resetDate = leadAsignados.map((element) => {
      return { ...element, isSelected: false };
    });
    setAuxLeadsAsignados(resetDate);
    // reset filtros
    setFilterData({
      celular: "",
      nombre: "",
      apellido: "",
      proyecto: "",
      estadoLead: "",
      asesor: "",
      fecha_asignacion: "",
      estadoSeparacionLead: "",
    });
    setFlagReset(false);
  };

  const handledFilterSelectValues = (value, name) => {
    setFilterData({
      ...filterData,
      [name]: value,
    });
    setFlagReset(false);
  };

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

  const handleChangeCheckAll = (event) => {
    const state = event.target.checked;
    setChecked(state);
    const leadsChecked = auxLeadsAsignados.map((element) => {
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
    setAuxLeadsAsignados(leadsChecked);
  };

  const handledCheckElement = (event, idItem) => {
    const isChecked = event.target.checked;
    const leadsChecked = auxLeadsAsignados.map((element) => {
      if (element.id === idItem) {
        return {
          ...element,
          isSelected: isChecked,
        };
      }
      return element;
    });

    setAuxLeadsAsignados(leadsChecked);

    // Calcula el nuevo contador
    const newCount = leadsChecked.reduce(
      (count, element) => count + (element.isSelected ? 1 : 0),
      0
    );

    setCountSelectedElements(newCount);
    setChecked(false);
  };

  const traerLeadAsiganados = async () => {
    setVisibleProgress(true);
    setCountSelectedElements(0);
    try {
      let query = `asignado=true&estado=A&page=${page+1}&page_size=${rowsPerPage}&ordering=-fecha_asignacion`;
      //horaRecepcion_range_after
      //horaRecepcion_range_before
      if (startDate && endDate) query += `&horaRecepcion_range_after=${startDate}&horaRecepcion_range_before=${endDate}`
      else {
        const rangeDate = getCurrentTime()
        query += `&horaRecepcion_range_after=${rangeDate.startDate}&horaRecepcion_range_before=${rangeDate.endDate}`
      }
      if (filterData['celular']) query += `&celular=${filterData['celular']}`
      if (filterData['nombre']) query += `&nombre=${filterData['nombre']}`
      if (filterData['proyecto']) query += `&proyecto=${filterData['proyecto']}`
      if (filterData['estadoLead']) {
        let estadoLead = filterData['estadoLead']
        query += `&estadoLead=${estadoLead}`
      }
      if (filterData['asesor']) query += `&asesor=${filterData['asesor']}`
      if (filterData['fecha_asignacion']) query += `&fecha_asignacion=${filterData['fecha_asignacion']}`
      if (filterData['estadoSeparacionLead']) query += `&estadoSeparacionLead=${filterData['estadoSeparacionLead']}`

      const rowData = await getLeadsByQuery(authTokens["access"], query);
      setPaginationValue({ count: rowData.count, next: rowData.next, previous: rowData.previous })
      const formatData = rowData.results.map((element) => {
        return {
          ...element,
          isSelected: false,
        };
      });
      setLeadsAsignados(formatData);
      setAuxLeadsAsignados(formatData);
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

   // handle change page
   const handleChangingPage = (event, newPage) => {
    handleChangePage(event, newPage)
    setFlagReload(prev => !prev)
  }

  // handle change page rows
  const handleChangingRowsPerPage = (event) => {
    handleChangeRowsPerPage(event)
    setFlagReload(prev => !prev)
  }

  useEffect(() => {
    traerLeadAsiganados();
  }, [flagReload]);

  return (
    <React.Fragment>
      <div className="flex items-center mb-4">
        <p className="mr-1">Acciones</p>
        <MassActionsViewLeadsAsignados
          data={auxLeadsAsignados.filter((element) => element.isSelected)}
          handleClickFeedback={handleClickFeedback}
          setFeedbackMessages={setFeedbackMessages}
          setVisibleProgress={setVisibleProgress}
          onLoadData={traerLeadAsiganados}
        />
        <div className="flex items-center bg-green-100 rounded p-2">
          <p className="text-green-500 font-bold mr-2">
            Número de items seleccionados
          </p>
          <p className="text-green-500 font-bold">{countSelectedElements}</p>
        </div>
      </div>
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
            count={paginationValue.count}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangingPage}
            onRowsPerPageChange={handleChangingRowsPerPage}
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
                <TableCell>Número</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Proyecto</TableCell>
                <TableCell>Campaña</TableCell>
                <TableCell align="center">Estado</TableCell>
                <TableCell>Separación</TableCell>
                <TableCell>Actual asesor</TableCell>
                <TableCell>Registros</TableCell>
                <TableCell>Fecha asignacion</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  {flagReset ? (
                    <Button
                      startIcon={<MdClose />}
                      sx={{ textTransform: "capitalize", borderRadius: "0px" }}
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
                    size="small"
                    onNewInput={handledFilterSelectValues}
                    defaultValue={proyecto}
                  />
                </TableCell>
                <TableCell>Sin filtros</TableCell>
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
                  <SelectAsesor
                    size="small"
                    onNewInput={handledFilterSelectValues}
                    defaultValue={asesor}
                  />
                </TableCell>
                <TableCell></TableCell>
                <TableCell>
                  <CustomDatePickerFilter
                    onNewFecha={handledFilterDateValues}
                    filterName="fecha_asignacion"
                    defaultValue={fecha_asignacion}
                  />
                </TableCell>
              </TableRow>
              {paginatedItems.map((item, index) => (
                <RowItemLeadAsignado
                  item={item}
                  key={index}
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
    </React.Fragment>
  );
};

export default ViewLeadAsignados;
