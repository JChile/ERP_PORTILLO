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
import { getProyectoCampania, getProyectosCampania } from "../helpers";
import { CampaniasBarChart } from "../components/CampaniasBarChart";

export const ReporteRetornoCampania = () => {
  const [activeButton, setActiveButton] = useState(true);
  const [proyecto, setProyecto] = useState();
  const [data, setData] = useState();
  const [auxData, setAuxData] = useState();
  const [dataCampania, setDataCampania] = useState();

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
          <FilterProyectos onNewInput={onAddProyecto} value={proyecto} />
        </label>
        <Button
          variant="contained"
          onClick={() => getDataProyecto(proyecto.id)}
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
                  <TableCell>
                    {10}
                  </TableCell>
                  <TableCell>
                    {campania.coste_real && campania.coste_real / 10}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <div className="flex flex-col items-center justify-start h-screen mt-4">
            <CampaniasBarChart />
        </div>
      </div>
    </div>
  );
};
