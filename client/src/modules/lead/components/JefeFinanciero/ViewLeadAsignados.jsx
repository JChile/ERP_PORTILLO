import {
  Box,
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
import { getLeads } from "../../helpers";
import RowItemLeadAsignado from "./RowItemLeadAsignado";
import { MdClose, MdSearch } from "react-icons/md";
import { quitarLeads } from "../../helpers/desasignarLeads";
import {
  SelectEstadoLead,
  SelectProyecto,
} from "../../../../components/select";
import { MassActionsViewLeadsNoAsignados } from "./acciones-masivas/MassActionsViewLeadsNoAsignados";
import SelectAsesor from "../../../../components/select/asesor-filter/SelectAsesor";
import { useAlertMUI, useCustomTablePagination } from "../../../../hooks";
import {
  combinarErrores,
  formatDate_ISO861_to_formatdate,
} from "../../../../utils";
import { ViewLeadsNoAsignados } from "./ViewLeadsNoAsignados";
import MassActionsViewLeadsAsignados from "./acciones-masivas/MassActionsViewLeadsAsignados";
import { CustomAlert, CustomCircularProgress } from "../../../../components";

const ViewLeadAsignados = () => {
  const { authTokens } = useContext(AuthContext);
  const [leadAsignados, setLeadsAsignados] = useState([]);
  const [auxLeadsAsignados, setAuxLeadsAsignados] = useState([]);
  const [checked, setChecked] = useState(false);
  // numero de items seleccionados
  const [filterData, setFilterData] = useState({
    celular: "",
    nombre: "",
    apellido: "",
    proyecto: "",
    estadoLead: "",
    asesor: "",
  });

  const { celular, nombre, apellido, proyecto, estadoLead, asesor } =
    filterData;

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
    setVisibleProgress(true);
    const dataFilter = leadAsignados.filter((element) => {
      const celularElement = element["celular"].toString().toLowerCase();
      const nombreElement = element["nombre"].toString().toLowerCase();
      const apellidoElement = element["apellido"].toString().toLowerCase();
      const proyectoElement = element["campania"]["proyecto"]["nombre"]
        .toString()
        .toLowerCase();
      const estadoLeadElement = element["estadoLead"].toString().toLowerCase();
      // Componente nombre completo
      const asesorNombre = element["asesor"]["first_name"]
        .toString()
        .toLowerCase();
      const asesorApellido = element["asesor"]["last_name"]
        .toString()
        .toLowerCase();
      //
      const asesorElement = `${asesorNombre} ${asesorApellido}`;

      if (
        (filterData["celular"] !== "" &&
          !celularElement.includes(filterData["celular"].toLowerCase())) ||
        (filterData["nombre"] !== "" &&
          !nombreElement.includes(filterData["nombre"].toLowerCase())) ||
        (filterData["apellido"] !== "" &&
          !apellidoElement.includes(filterData["apellido"].toLowerCase())) ||
        (filterData["proyecto"] !== "" &&
          !proyectoElement.includes(filterData["proyecto"].toLowerCase())) ||
        (filterData["estadoLead"] !== "" &&
          !estadoLeadElement.includes(
            filterData["estadoLead"].toLowerCase()
          )) ||
        (filterData["asesor"] !== "" &&
          !asesorElement.includes(filterData["asesor"].toLowerCase()))
      ) {
        return false;
      }
      return true;
    });

    setAuxLeadsAsignados(dataFilter);
    setFlagReset(true);
    setVisibleProgress(false);
  };

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
    try {
      const rowData = await getLeads(authTokens["access"], "asignado=True");
      const formatData = rowData.map((element) => {
        return {
          ...element,
          isSelected: false,
        };
      });
      setLeadsAsignados(formatData);
      setAuxLeadsAsignados(formatData);
      setVisibleProgress(false);
    } catch (e) {
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
    traerLeadAsiganados();
  }, []);

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
            count={auxLeadsAsignados.length}
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
                <TableCell>Número</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Proyecto</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Asesor</TableCell>
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
                  />
                </TableCell>
                <TableCell>
                  <SelectEstadoLead
                    size="small"
                    onNewInput={handledFilterSelectValues}
                  />
                </TableCell>
                <TableCell>
                  <SelectAsesor
                    size="small"
                    onNewInput={handledFilterSelectValues}
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
