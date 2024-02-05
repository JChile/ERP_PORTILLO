import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FilterProyectos } from "../../../components";
import { DesasignacionAsesorChart } from "../components/DesasignacionAsesorChart";
import { DesasignacionObjecionChart } from "../components/DesasignacionObjecionChart";
import { DesasignacionEstadoChart } from "../components/DesasignacionEstadoChart";


export const ReporteDesasignacion = () => {
  const [activeButton, setActiveButton] = useState(true);
  const [proyecto, setProyecto] = useState();
  const [data, setData] = useState();
  const [loadingFlag, setLoadingFlag] = useState(true);

  const handleButtonState = (buttonState) => {
    setActiveButton(buttonState);
  };
  const onAddProyecto = (item) => {
    setProyecto(item);
  };

  const getDataProyecto = async (id) => {
    try {
      console.log(id);
      const result = await getProyectoCampania(id + "?estadoCampania=A");
      setDataCampania(result);
      console.log(result);
    } catch (error) {}
  };

  const obtenerData = async () => {
    /* setVisibleProgress(true); */
    try {
      const result = await getProyectosCampania(
        "estadoProyecto=A&estadoCampania=A"
      );
      setData(result);
      setAuxData(result);
      /* setVisibleProgress(false); */
    } catch (error) {
      /* setVisibleProgress(false); */
      /* const pilaError = combinarErrores(error); */
      // mostramos feedback de error
      /* setFeedbackMessages({
        style_message: "error",
        feedback_description_error: pilaError,
      });
      handleClickFeedback(); */
    }
  };

  useEffect(() => {
    obtenerData();
  }, [activeButton]);

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
        <Button
          variant="contained"
          sx={{
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
            textTransform: "capitalize",
            backgroundColor: !activeButton ? "#1976d2" : "#d1d5db",
            color: !activeButton ? "white" : "black",
          }}
          onClick={() => handleButtonState(false)}
        >
          Mensual
        </Button>
      </div>
      <div className="w-6/12 flex flex-col gap-y-5 my-4 mx-auto">
        <label className="flex flex-col gap-y-1">
          <span className="block text-sm font-medium">Proyecto</span>
          <FilterProyectos onNewInput={onAddProyecto} value={proyecto} />
        </label>
        <Button
          variant="contained"
          onClick={() => getDataProyecto(proyecto.id)}
        >
          Generar Reporte
        </Button>
      </div>
      <div className="grid grid-cols-2 items-center">
        <DesasignacionAsesorChart />
        <DesasignacionObjecionChart />
        <DesasignacionEstadoChart />
      </div>
    </React.Fragment>
  );
};
