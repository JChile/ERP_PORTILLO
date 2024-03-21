import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { CustomDatePicker, FilterProyectos } from "../../../components";
import { getProyectoCampania } from "../helpers";
import { useAlertMUI } from "../../../hooks";
import { CustomAlert, CustomCircularProgress } from "../../../components";
import { getEstadoLead } from "../../../components/filters/estado_leads/getEstadoLead";
import { getObjecion } from "../../../components/filters/objecion/getObjecion";
import { AuthContext } from "../../../auth";
import { EstadoLeadDiagram } from "../components/EstadoLeadDiagrams";
import { ObjecionLeadDiagram } from "../components/ObjecionesLeadDiagram";
import LoadingObjecionIcon from "../../../assets/loading_objecion.svg";
import { FilterAsesor } from "../../../components/filters/asesor/FilterAsesor";
import { combinarErrores } from "../../../utils";

export const ReporteLeadStatus = () => {
  const [proyecto, setProyecto] = useState();
  const [data, setData] = useState();
  const [auxDataObjeciones, setAuxDataObjeciones] = useState();
  const [auxDataEstados, setAuxDataEstados] = useState();
  const [dataEstadosLead, setDataEstadosLead] = useState();
  const [dataObjecionesLead, setDataObjecionesLead] = useState();
  const [visibleProgress, setVisibleProgress] = useState(false);
  const { authTokens } = useContext(AuthContext);
  const [reportGenerated, setReportGenerated] = useState(false);
  const [asesor, setAsesor] = useState();

  const [desdeValue, setDesdeValue] = useState(null);
  const [hastaValue, setHastaValue] = useState(null);

  const onChangeDatePickerFechaDesde = (newDate) => {
    setDesdeValue(newDate);
  };

  const onChangeDatePickerFechaHasta = (newDate) => {
    setHastaValue(newDate);
  };

  const onAddAsesor = (newAsesor) => {
    setAsesor(newAsesor.id);
  };

  const {
    feedbackCreate,
    feedbackMessages,
    setFeedbackMessages,
    handleCloseFeedback,
    handleClickFeedback,
  } = useAlertMUI();

  const validateProject = (proyecto) => {
    const errors = [];
    if (!proyecto) {
      errors.push("- No seleccionó un proyecto.");
    }
    return errors.join("\n");
  };

  const onAddProyecto = (item) => {
    setProyecto(item.id);
  };

  const getDataProyecto = async (id) => {
    const validationMessage = validateProject(id);
    if (validationMessage) {
      setFeedbackMessages({
        style_message: "warning",
        feedback_description_error: validationMessage,
      });
      handleClickFeedback();
    } else {
      setVisibleProgress(true);
      try {
        let query = "?";
        if (asesor) {
          query += `asesor=${asesor}`;
        }
        if (desdeValue && hastaValue) {
          query += `&desde=${desdeValue}T00:00:00&hasta=${hastaValue}T23:59:59`;
        }
        const result = await getProyectoCampania(id + query + "&estadoCampania=A");

        setData(result);
        const conteoObjeciones = {};
        const conteoEstados = {};

        let size = 0;
        result.campanias.forEach((campania) => size += campania.leads.length)

        result.campanias.forEach((campania) => {
          campania.leads.forEach((lead) => {
            const objecionId = lead.objecion;
            if (conteoObjeciones[objecionId]) {
              conteoObjeciones[objecionId]++;
            } else {
              conteoObjeciones[objecionId] = 1;
            }
            const estado = lead.estadoLead;
            if (conteoEstados[estado]) {
              conteoEstados[estado]++;
            } else {
              conteoEstados[estado] = 1;
            }
          });
        });

        const objecionesConConteo = dataObjecionesLead.map((objecion) => ({
          id: objecion.id,
          nombre: objecion.nombre,
          conteo: conteoObjeciones[objecion.id] || 0, // Si no hay conteo, poner 0
          porcentaje: conteoObjeciones[objecion.id] / size || 0
        }));
        
        const estadosConConteo = dataEstadosLead.map((estado) => ({
          nombre: estado.nombre,
          descripcion: estado.descripcion,
          conteo: conteoEstados[estado.nombre] || 0, // Si no hay conteo, poner 0
          porcentaje: conteoEstados[estado.nombre] / size || 0
        }));

        setAuxDataObjeciones(objecionesConConteo);
        setAuxDataEstados(estadosConConteo);
        setReportGenerated(true);
      } catch (error) {
        setVisibleProgress(false);
        const pilaError = combinarErrores(error);
        setFeedbackMessages({
          style_message: "error",
          feedback_description_error: pilaError,
        });
        handleClickFeedback();
      }
    }
    setVisibleProgress(false);
  };

  const obtenerEtiquetasTabla = async () => {
    try {
      const estados = await getEstadoLead(authTokens["access"]);
      setDataEstadosLead(estados);
      const objeciones = await getObjecion(authTokens["access"]);
      setDataObjecionesLead(objeciones);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    obtenerEtiquetasTabla();
  }, []);

  return (
    <div className="flex flex-col items-center justify-start h-screen">
      <div className="text-2xl font-bold mb-4">Reporte Status de Lead</div>
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
      <div className="w-6/12 flex flex-col gap-y-5 mb-4">
        <label className="flex flex-col gap-y-1">
          <span className="block text-sm font-medium">Proyecto</span>
          <FilterProyectos onNewInput={onAddProyecto} defaultValue={proyecto} />
          <span>Asesor</span>
          <FilterAsesor onNewInput={onAddAsesor} defaultValue={asesor} />
        </label>
        <Button variant="contained" onClick={() => getDataProyecto(proyecto)}>
          Generar Reporte
        </Button>
        {reportGenerated && (
          <Button variant="outlined" onClick={() => print()}>
            Imprimir Reporte
          </Button>
        )}
      </div>
      {reportGenerated && (
        <div className="border p-4 w-full">
          <div className="flex flex-row items-center justify-center mt-4">
            <div className="border p-4 w-full">
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
                    <TableCell>Objeciones</TableCell>
                    <TableCell align="center">Número de Leads</TableCell>
                    <TableCell align="center">%</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {auxDataObjeciones &&
                    auxDataObjeciones.map((value) => (
                      <TableRow key={value.id}>
                        <TableCell>{value.nombre}</TableCell>
                        <TableCell align="center">{value.conteo}</TableCell>
                        <TableCell align="center">{value.porcentaje.toFixed(2)}%</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              <div className="flex flex-row items-center justify-center mt-4">
                <ObjecionLeadDiagram data={auxDataObjeciones} />
              </div>
            </div>

            <div className="border p-4 w-full">
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
                    <TableCell>Estados</TableCell>
                    <TableCell align="center">Número de Leads</TableCell>
                    <TableCell align="center">%</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {auxDataEstados &&
                    auxDataEstados.map((value) => {
                      return <TableRow key={value.nombre}>
                        <TableCell>{value.descripcion}</TableCell>
                        <TableCell align="center">{value.conteo}</TableCell>
                        <TableCell align="center">{value.porcentaje.toFixed(2)}%</TableCell>
                      </TableRow>
                    })}
                </TableBody>
              </Table>
              <div className="flex flex-row items-center justify-center mt-4">
                <EstadoLeadDiagram data={auxDataEstados} />
              </div>
            </div>
          </div>
        </div>
      )}
      {!reportGenerated && (
        <div className="grid place-content-center gap-y-12" role="alert">
          <span className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            Seleccione un proyecto
          </span>
          <img src={LoadingObjecionIcon} alt="loading" className="w-72" />
        </div>
      )}

      <CustomAlert
        feedbackCreate={feedbackCreate}
        feedbackMessages={feedbackMessages}
        handleCloseFeedback={handleCloseFeedback}
      />
      {visibleProgress && <CustomCircularProgress />}
    </div>
  );
};
