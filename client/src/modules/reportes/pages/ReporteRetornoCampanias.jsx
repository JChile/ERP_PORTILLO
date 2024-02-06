import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { CustomDatePicker, FilterProyectos } from "../../../components";
import { getProyectoCampania } from "../helpers";
import { useAlertMUI } from "../../../hooks";
import { CustomAlert, CustomCircularProgress } from "../../../components";
import { CampaniasRadarChart } from "../components/CampaniasRadarChart";
import { CampaniasCostoBarChart } from "../components/CampaniasCostoBarChart";
import { DiagramRetornoRadar } from "../components/DiagramaRetornoRadar";
import { DiagramRetornoLeadCampania } from "../components/DiagramRetornoLeadCampania";
import LoadingObjecionIcon from "../../../assets/loading_objecion.svg";

export const ReporteRetornoCampania = () => {
  const [proyecto, setProyecto] = useState();
  const [auxDataCosto, setAuxDataCosto] = useState();
  const [auxDataRetorno, setAuxDataRetorno] = useState();
  const [dataCampania, setDataCampania] = useState();
  const [visibleProgress, setVisibleProgress] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);

  const [desdeValue, setDesdeValue] = useState(null);
  const [hastaValue, setHastaValue] = useState(null);

  const onChangeDatePickerFechaDesde = (newDate) => {
    setDesdeValue(newDate);
  };

  const onChangeDatePickerFechaHasta = (newDate) => {
    setHastaValue(newDate);
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
        let query = "";
        if (desdeValue && hastaValue) {
          query = `&desde=${desdeValue}T00:00:00&hasta=${hastaValue}T23:59:59`;
        }
        const result = await getProyectoCampania(
          id + "?estadoCampania=A" + query
        );
        setDataCampania(result);
        const campaniasDataCosto =
          result?.campanias.map((campania) => ({
            name: campania.nombre,
            costo_estimado: campania.coste_estimado,
            costo_real: campania.coste_real,
          })) || [];
        setAuxDataCosto(campaniasDataCosto);

        const campaniasRetornoList =
          result?.campanias.map((campania) => ({
            name: campania.nombre,
            costo_real: campania.coste_real,
            leads: campania.leads.length,
          })) || [];
        setAuxDataRetorno(campaniasRetornoList);
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

  return (
    <div className="flex flex-col items-center justify-start h-screen">
      <div className="text-2xl font-bold mb-4">Reporte Retorno Campaña</div>
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
                <TableCell className="text-center">Campaña</TableCell>
                <TableCell>Costo Estimado</TableCell>
                <TableCell>Costo Real</TableCell>
                <TableCell>Número de Leads</TableCell>
                <TableCell>Precio por lead</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataCampania &&
                dataCampania.campanias.map((campania) => (
                  <TableRow key={campania.id}>
                    <TableCell>{campania.nombre}</TableCell>
                    <TableCell>{campania.coste_estimado}</TableCell>
                    <TableCell>{campania.coste_real}</TableCell>
                    <TableCell className="text-center">
                      {campania.leads.length}
                    </TableCell>
                    <TableCell>
                      {campania.leads.length > 0
                        ? campania.coste_real / campania.leads.length
                        : "No hay leads en el rango de fecha"}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <div className="flex flex-row items-center justify-center mt-4">
            <div className="p-4 w-full mt-4">
              <h2>Gráfico de barras de los costos estimados frente a los costos reales</h2>
              <CampaniasCostoBarChart data={auxDataCosto} />
            </div>

            <div className="p-4 w-full mt-4">
              <h2>Gráfico de barras de los costos por lead obtenido</h2>
              <DiagramRetornoLeadCampania data={auxDataRetorno} />
            </div>
          </div>
          <div className="flex flex-row items-center justify-center mt-4">
            <div className="p-4 w-full mt-4">
              <h2>Gráfico de radar de los costos estimados frente a los costos reales</h2>
              <CampaniasRadarChart data={auxDataCosto} />
            </div>

            <div className="p-4 w-full mt-4">
              <h2>Gráfico de radar de los costos por lead obtenido</h2>
              <DiagramRetornoRadar data={auxDataRetorno} />
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
