import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../auth";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { CustomCircularProgress } from "../../../../components";
import { FiPlusCircle } from "react-icons/fi";
import { getProyecto } from "../../helpers";
import { FaRegEdit } from "react-icons/fa";
import { CreatePresupuesto } from "./CreatePresupuesto";

export const PresupuestoProyecto = () => {
  const { authTokens } = useContext(AuthContext);
  const { idProyecto } = useParams();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [project, setProject] = useState({
    nombre: "",
    codigo: "",
    ubicacion: "",
    descripcion: "",
  });

  const { nombre, codigo, ubicacion, descripcion } = project;

  const [visibleProgress, setVisibleProgress] = useState(false);
  const [tipoCambio, setTipoCambio] = useState(1);

  const obtenerTipoCambioDolarActual = async () => {
    try {
      setTipoCambio(3.66);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerProyecto = async () => {
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
    obtenerProyecto();
    obtenerTipoCambioDolarActual();
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
        <div className="flex flex-row justify-end mb-4">
          <Button
            startIcon={<FiPlusCircle />}
            color="primary"
            variant="contained"
            onClick={() => {
              setIsFormOpen(true);
            }}
          >
            Agregar
          </Button>
        </div>
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
                        color: "#c8c8c8",
                        backgroundColor: "#404040",
                      },
                    }}
                  >
                    <TableCell>
                      <IconButton
                        size="m"
                        color="primary"
                        onClick={() => onEditItemSelected(project.id)}
                      >
                        <FaRegEdit />
                      </IconButton>
                    </TableCell>
                    <TableCell>Mes</TableCell>
                    <TableCell>Presupuesto Soles inicial</TableCell>
                    <TableCell>Presupuesto Dolares</TableCell>
                    <TableCell>
                      A tipo cambio hoy <span>({tipoCambio})</span>
                    </TableCell>
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
      {isFormOpen && (
        <CreatePresupuesto
          idProyecto={project.id}
          handleCloseForm={() => setIsFormOpen(false)}
          tipoCambio={tipoCambio}
        />
      )}
    </>
  );
};
