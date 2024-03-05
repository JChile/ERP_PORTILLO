import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../auth";
import { useNavigate, useParams } from "react-router-dom";
import { useFilterGastos } from "../../../campania/hooks/useFilterGastos";
import {
  Button,
  FormControl,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  CustomAlert,
  CustomCircularProgress,
  CustomDatePickerMonth,
} from "../../../../components";
import { FiPlusCircle } from "react-icons/fi";
import { useAlertMUI } from "../../../../hooks";
import { getProyecto } from "../../helpers";
import { combinarErrores } from "../../../../utils";

export const PresupuestoProyecto = () => {
  const { authTokens } = useContext(AuthContext);
  const { idProyecto } = useParams();
  const [project, setProject] = useState({
    nombre: "",
    codigo: "",
    ubicacion: "",
    descripcion: "",
  });

  const { nombre, codigo, ubicacion, descripcion } = project;

  // hook
  const { getSemanasPorMes, filtrarGastosPorSemana, showDataParser } =
    useFilterGastos();
  // modificador de fecha
  const [date, setDate] = useState(new Date());
  // informacion de semana seleccionada
  const [selectedSemana, setSelectedSemana] = useState(-1);
  // informacion de data
  const [data, setData] = useState();

  // handle change semana
  const handleChangeSemana = ({ target }) => {
    const { value } = target;
    setSelectedSemana(value);
  };
  // handle change mes
  const handleChangeDate = (newDate) => {
    setDate(newDate);
    setSelectedSemana(-1);
  };

  // informacion de semanas por mes
  const semanasFecha = getSemanasPorMes(date);
  // formato de fechas
  const fechaFormat = showDataParser(selectedSemana, semanasFecha, date);
  // data

  const [visibleProgress, setVisibleProgress] = useState(false);

  const obtenerCampaniasProyecto = async () => {
    if (idProyecto) {
      setVisibleProgress(true);
      try {
        const result = await getProyecto(idProyecto, authTokens["access"]);
        setProject(result);
        setVisibleProgress(false);
        setFlagLoading(true);
      } catch (error) {
        setVisibleProgress(false);
      }
    } else {
      onNavigateBack();
    }
  };

  const navigate = useNavigate();
  const onNavigateBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    obtenerCampaniasProyecto();
  }, []);

  return (
    <>
      <h2 className="text-center font-bold text-2xl">
        Registro de presupuesto
      </h2>
      <section className="pb-4 p-2 mt-2 border-2">
        <p className="pb-2 font-semibold">Datos del proyecto</p>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex">
            <span className="font-medium mr-3">Nombre: </span>
            <span>{nombre}</span>
          </div>

          <div className="flex">
            <span className="font-medium mr-3">Código: </span>
            <span>{codigo}</span>
          </div>
        </div>
      </section>
      <section className="mt-2 p-2 border-2">
        <p className="mb-2 font-semibold">Acciones</p>
        <div className="flex flex-row justify-between mb-4">
          <div className="flex flex-row gap-x-2">
            {/* DATE PICKER */}
            <CustomDatePickerMonth value={date} onNewFecha={handleChangeDate} />
            {/* SELECT SEMANA */}
            <FormControl>
              <Select
                size="small"
                value={selectedSemana}
                onChange={handleChangeSemana}
              >
                <MenuItem key={-1} value={-1}>
                  Todos
                </MenuItem>
                {semanasFecha.map((element, index) => (
                  <MenuItem key={index} value={index}>{`Semana ${
                    index + 1
                  }`}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <Button
            startIcon={<FiPlusCircle />}
            color="primary"
            variant="contained"
          >
            Agregar
          </Button>
        </div>
        <p className="text-center mb-3">{`${fechaFormat["inicio"]} - ${fechaFormat["fin"]}`}</p>
        <div className="mb-4">
          <p className="pb-2 font-semibold">Información de gastos</p>
          <Paper sx={{ borderRadius: "0px" }}>
            <TableContainer
              sx={{ minWidth: 700 }}
              arial-aria-labelledby="customized table"
            >
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
                    {semanasFecha.map((element, index) => (
                      <TableCell
                        align="center"
                        key={index}
                        style={{
                          backgroundColor:
                            index === selectedSemana ? "#7de37f" : "#404040",
                          color: index === selectedSemana ? "black" : "#C8C8C8",
                        }}
                      >
                        {`Semana ${index + 1}`}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow></TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </div>
      </section>
      {/* CIRCULAR PROGRESS */}
      {visibleProgress && <CustomCircularProgress />}
    </>
  );
};
