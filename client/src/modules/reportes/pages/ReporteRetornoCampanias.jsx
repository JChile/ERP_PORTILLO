import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { FilterProyectos } from "../../../components";
import { getProyectoCampania } from "../helpers";
import { DiagramRetornoLeadCampania } from "../components";
import { useAlertMUI } from "../../../hooks";
import { CustomAlert, CustomCircularProgress } from "../../../components";
import { CampaniasBarChart } from "../components/CAmpaniasBarChart";

export const ReporteRetornoCampania = () => {
  const [activeButton, setActiveButton] = useState(true);
  const [proyecto, setProyecto] = useState();
  const [data, setData] = useState();
  const [auxDataCosto, setAuxDataCosto] = useState();
  const [auxDataRetorno, setAuxDataRetorno] = useState();
  const [dataCampania, setDataCampania] = useState();
  const [visibleProgress, setVisibleProgress] = useState(false);

  const handleButtonState = (buttonState) => {
    setActiveButton(buttonState);
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
        const result = await getProyectoCampania(id + "?estadoCampania=A");
        setDataCampania(result);
        const campaniasDataList =
          result?.campanias.map((campania) => ({
            name: campania.nombre,
            costo_estimado: campania.coste_estimado,
            costo_real: campania.coste_real,
          })) || [];
        setAuxDataCosto(campaniasDataList);
  
        const campaniasRetornoList =
          result?.campanias.map((campania) => ({
            name: campania.nombre,
            costo_real: campania.coste_real,
            leads: campania.leads.length+20,
          })) || [];
        console.log(campaniasRetornoList);
        setAuxDataRetorno(campaniasRetornoList);
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
      <div className="flex justify-center gap-x-3 mb-4">
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
          Semanal
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
          Mensual
        </Button>
      </div>
      <div className="w-6/12 flex flex-col gap-y-5 mb-4">
        <label className="flex flex-col gap-y-1">
          <span className="block text-sm font-medium">Proyecto</span>
          <FilterProyectos onNewInput={onAddProyecto} defaultValue={proyecto} />
        </label>
        <Button
          variant="contained"
          onClick={() => getDataProyecto(proyecto)}
        >
          Generar Reporte
        </Button>
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
              <TableCell>Campaña</TableCell>
              <TableCell>Costo</TableCell>
              <TableCell>Número de Leads</TableCell>
              <TableCell>Precio por lead</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataCampania &&
              dataCampania.campanias.map((campania) => (
                <TableRow key={campania.id}>
                  <TableCell>{campania.nombre}</TableCell>
                  <TableCell>{campania.coste_real}</TableCell>
                  <TableCell>{10}</TableCell>
                  <TableCell>
                    {campania.coste_real && campania.coste_real / 10}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <div className="flex flex-row items-center justify-center mt-4">
          <CampaniasBarChart data={auxDataCosto} />
          <DiagramRetornoLeadCampania data={auxDataRetorno}/>
        </div>
      </div>
      <CustomAlert
        feedbackCreate={feedbackCreate}
        feedbackMessages={feedbackMessages}
        handleCloseFeedback={handleCloseFeedback}
      />
    </div>
  );
};
