import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  CustomCircularProgress,
  CustomDatePicker,
  FilterProyectos,
} from "../../../components";
import { DesasignacionAsesorChart } from "../components/DesasignacionAsesorChart";
import { DesasignacionObjecionChart } from "../components/DesasignacionObjecionChart";
import { DesasignacionEstadoChart } from "../components/DesasignacionEstadoChart";
import {
  getDesasignadosAsesor,
  getDesasignadosEstadoLead,
  getDesasignadosObjecion,
} from "../helpers/getDesasignacionCases";
import LoadingObjecionIcon from "../../../assets/loading_objecion.svg";

export const ReporteDesasignacion = () => {
  const [proyecto, setProyecto] = useState(null);

  const [desasignacionAsesor, setDesasignacionAsesor] = useState([]);
  const [desasignacionEstado, setDesasignacionEstado] = useState([]);
  const [desasignacionObjecion, setDesasignacionObjecion] = useState([]);

  const [loadingFlag, setLoadingFlag] = useState(true);
  const [isLoading, setIsLoading] = useState(false); // Cambiado a false inicialmente

  const [desdeValue, setDesdeValue] = useState(null);
  const [hastaValue, setHastaValue] = useState(null);

  const onChangeDatePickerFechaDesde = (newDate) => {
    setDesdeValue(newDate);
  };

  const onChangeDatePickerFechaHasta = (newDate) => {
    setHastaValue(newDate);
  };

  const onAddProyecto = (item) => {
    setProyecto(item.id);
  };

  const fetchData = async () => {
    try {
      const query = `desde=${desdeValue}T00:00:00&hasta=${hastaValue}T23:59:59`;
      const responseAsesor = await getDesasignadosAsesor(proyecto, query);
      const responseEstado = await getDesasignadosEstadoLead(proyecto, query);
      const responseObjecion = await getDesasignadosObjecion(proyecto, query);
      setDesasignacionAsesor(responseAsesor);
      setDesasignacionEstado(responseEstado);
      setDesasignacionObjecion(responseObjecion);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const leadObjecion = convertToRowDataLeadDesasignadosObjecion(
    desasignacionObjecion
  );
  const leadEstado =
    convertToRowDataLeadDesasignadosEstado(desasignacionEstado);
  const leadAsesor =
    convertToRowDataLeadDesasignadosAsesor(desasignacionAsesor);

  useEffect(() => {
    if (proyecto && desdeValue && hastaValue) {
      setIsLoading(true);
      fetchData();
    } else {
      setIsLoading(false);
    }
  }, [loadingFlag]);

  return (
    <React.Fragment>
      <Typography
        variant="h5"
        fontWeight={"bold"}
        textAlign={"center"}
        maxWidth={"fullWidth"}
      >
        Reporte Desasignaciones
      </Typography>
      <div className="flex justify-center gap-x-3 my-4">
        <CustomDatePicker
          label="Filtrar desde"
          onNewFecha={onChangeDatePickerFechaDesde}
          defaultValue={desdeValue}
        />
        <CustomDatePicker
          label="Filtrar hasta"
          onNewFecha={onChangeDatePickerFechaHasta}
          defaultValue={hastaValue}
        />
      </div>
      <div className="w-6/12 flex flex-col gap-y-5 my-4 mx-auto">
        <label className="flex flex-col gap-y-1">
          <span className="block text-sm font-medium">Proyecto</span>
          <FilterProyectos onNewInput={onAddProyecto} defaultValue={proyecto} />
        </label>
        <Button
          variant="contained"
          onClick={() => setLoadingFlag((prev) => !prev)}
        >
          Generar Reporte
        </Button>
      </div>
      {proyecto && isLoading && <CustomCircularProgress />}

      {proyecto && !isLoading && (
        <React.Fragment>
          <div className="flex justify-center mt-10 mb-7">
            <Typography variant="h5" fontWeight={"bold"}>
              Reporte Tabular de Leads Desasignados
            </Typography>
          </div>{" "}
          <div className="lg:grid lg:grid-cols-2  gap-x-4 gap-y-4 flex flex-col">
            <Paper sx={{ maxHeight: "400px", overflowY: "auto" }}>
              <Typography variant="subtitle2">
                Tabla N° 1: Leads desasignados por asesor
              </Typography>
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
                    <TableCell>Asesor</TableCell>
                    <TableCell>N° leads asignados</TableCell>
                    <TableCell>N° leads desasignados</TableCell>
                    <TableCell>Leads atendidos</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {leadAsesor.map((element, index) => (
                    <TableRow key={index}>
                      <TableCell>{element.asesor}</TableCell>
                      <TableCell>{element.leadsAsignados}</TableCell>
                      <TableCell>{element.leadsDesasignados}</TableCell>
                      <TableCell>
                        {element.leadsAsignados - element.leadsDesasignados}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
            <Paper sx={{ maxHeight: "400px", overflowY: "auto" }}>
              <Typography variant="subtitle2">
                Tabla N° 1: Leads desasignados por objeción
              </Typography>
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
                    <TableCell>Objeción</TableCell>
                    <TableCell>N° leads desasignados</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {leadObjecion.map((element, index) => (
                    <TableRow key={index}>
                      <TableCell>{element.objecion}</TableCell>
                      <TableCell>{element.leads}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
            <Paper sx={{ maxHeight: "400px", overflowY: "auto" }}>
              <Typography variant="subtitle2">
                Tabla N° 1: Leads desasignados por estado
              </Typography>
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
                    <TableCell>Estado</TableCell>
                    <TableCell>Leads</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {leadEstado.map((element, index) => (
                    <TableRow key={index}>
                      <TableCell>{element.estado}</TableCell>
                      <TableCell>{element.leads}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </div>
          <div className="flex justify-center mt-16">
            <Typography variant="h5" fontWeight={"bold"}>
              Ventana Visual de Leads Desvinculados
            </Typography>
          </div>
          <div className="lg:grid lg:grid-cols-2 items-center flex flex-col gap-y-5">
            <DesasignacionAsesorChart data={leadAsesor} />
            <DesasignacionObjecionChart data={leadObjecion} />
            <DesasignacionEstadoChart data={leadEstado} />
          </div>
        </React.Fragment>
      )}

      {!proyecto && !isLoading && (
        <div
          className="grid place-content-center gap-y-12"
          role="alert"
        >
          <span className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">Seleccione un proyecto</span>
          <img src={LoadingObjecionIcon} alt="loading" className="w-72" />
        </div>
      )}
    </React.Fragment>
  );
};

const convertToRowDataLeadDesasignadosAsesor = (data) => {
  const formatData = data.map((element) => ({
    asesor: `${element.first_name} ${element.last_name}`,
    leadsAsignados: element.asignaciones,
    leadsDesasignados: element.desasignaciones,
  }));
  return formatData;
};

const convertToRowDataLeadDesasignadosObjecion = (data) => {
  const formatData = data.map((element) => ({
    objecion: element.nombre,
    leads: element.desasignaciones,
  }));
  return formatData;
};

const convertToRowDataLeadDesasignadosEstado = (data) => {
  const formatData = data.map((element) => ({
    estado: element.descripcion,
    leads: element.desasignaciones,
  }));
  return formatData;
};
