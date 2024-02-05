import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CustomCircularProgress, FilterProyectos } from "../../../components";
import { DesasignacionAsesorChart } from "../components/DesasignacionAsesorChart";
import { DesasignacionObjecionChart } from "../components/DesasignacionObjecionChart";
import { DesasignacionEstadoChart } from "../components/DesasignacionEstadoChart";
import {
  getDesasignadosAsesor,
  getDesasignadosEstadoLead,
  getDesasignadosObjecion,
} from "../helpers/getDesasignacionCases";

export const ReporteDesasignacion = () => {
  const [activeButton, setActiveButton] = useState(true);
  const [proyecto, setProyecto] = useState(null);

  const [desasignacionAsesor, setDesasignacionAsesor] = useState([]);
  const [desasignacionEstado, setDesasignacionEstado] = useState([]);
  const [desasignacionObjecion, setDesasignacionObjecion] = useState([]);

  const [loadingFlag, setLoadingFlag] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const handleButtonState = (buttonState) => {
    setActiveButton(buttonState);
  };
  const onAddProyecto = (item) => {
    setProyecto(item.id);
  };

  const fetchData = async () => {
    try {
      const responseAsesor = await getDesasignadosAsesor(1);
      const responseEstado = await getDesasignadosEstadoLead(1);
      const responseObjecion = await getDesasignadosObjecion(1);
      setDesasignacionAsesor(responseAsesor);
      setDesasignacionEstado(responseEstado);
      setDesasignacionObjecion(responseObjecion);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (proyecto) {
      setIsLoading(true)
      fetchData();
    } 
    else {
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
          <FilterProyectos onNewInput={onAddProyecto} defaultValue={proyecto} />
        </label>
        <Button
          variant="contained"
          onClick={() => setLoadingFlag((prev) => !prev)}
        >
          Generar Reporte
        </Button>
      </div>
      {proyecto ? (
        <React.Fragment>
          <div className="grid grid-cols-2 items-center">
            <DesasignacionAsesorChart data={desasignacionAsesor} />
            <DesasignacionObjecionChart data={desasignacionObjecion} />
            <DesasignacionEstadoChart data={desasignacionEstado} />
          </div>
        </React.Fragment>
      ) : (
        <p>Seleccione un proyecto</p>
      )}

      {isLoading && <CustomCircularProgress />}
    </React.Fragment>
  );
};
