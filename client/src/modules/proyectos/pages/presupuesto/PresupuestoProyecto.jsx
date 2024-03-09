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
import { obtenerTipoCambio } from "../../helpers/obtenerTipoCambio";
import { obtenerPresupuestosProyecto } from "../../helpers/obtenerPresupuestos";
import { EditarPresupuesto } from "./EditPresupuesto";

export const PresupuestoProyecto = () => {
  const { authTokens } = useContext(AuthContext);
  const { idProyecto } = useParams();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isFormEdit, setIsFormEdit] = useState(false);
  const [presupuestoToEdit, setPresupuestoToEdit] = useState(0);
  const [project, setProject] = useState({
    nombre: "",
    codigo: "",
    ubicacion: "",
    descripcion: "",
  });

  const { nombre, codigo } = project;

  const [visibleProgress, setVisibleProgress] = useState(false);
  const [tipoCambio, setTipoCambio] = useState(1);
  const [presupuestos, setPresupuestos] = useState([]);

  const obtenerPresupuestos = async () => {
    setVisibleProgress(true);
    try {
      const data = await obtenerPresupuestosProyecto(idProyecto);
      setPresupuestos(data);
      setVisibleProgress(false);
    } catch (error) {
      setVisibleProgress(false);
    }
  };

  const obtenerTipoCambioDolarActual = async () => {
    try {
      const result = await obtenerTipoCambio();
      setTipoCambio(result);
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

  const onEdit = async (id) => {
    setPresupuestoToEdit(id);
    setIsFormEdit(true);
  };

  const onSubmit = async () => {
    setIsFormOpen(false);
    obtenerPresupuestos();
  };

  const onSubmitEdit = async () => {
    setIsFormEdit(false);
    obtenerPresupuestos();
  };

  const navigate = useNavigate();
  const onNavigateBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    obtenerProyecto();
    obtenerPresupuestos();
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
                    <TableCell>Editar</TableCell>
                    <TableCell>Mes</TableCell>
                    <TableCell>Presupuesto Soles inicial</TableCell>
                    <TableCell>Presupuesto Dolares</TableCell>
                    <TableCell>
                      A tipo cambio hoy <span>({tipoCambio.compra})</span>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {presupuestos.map((presupuesto) => (
                    <TableRow key={presupuesto.id}>
                      <TableCell>
                        <IconButton
                          size="m"
                          color="primary"
                          onClick={() => onEdit(presupuesto.id)}
                        >
                          <FaRegEdit />
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        <span style={{ fontWeight: "bold" }}>
                          {new Date(presupuesto.fechaPresupuesto)
                            .toLocaleDateString("es-ES", {
                              month: "long",
                            })
                            .toUpperCase()}
                        </span>
                      </TableCell>
                      <TableCell>{presupuesto.presupuestoSoles}</TableCell>
                      <TableCell>{presupuesto.presupuestoDolares}</TableCell>
                      <TableCell>
                        {isNaN(presupuesto.presupuestoDolares) ||
                        isNaN(tipoCambio.compra)
                          ? "No se pudo obtener el tipo cambio de hoy"
                          : (
                              presupuesto.presupuestoDolares * tipoCambio.compra
                            ).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
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
          tipoCambio={tipoCambio.compra}
          submit={onSubmit}
        />
      )}
      {isFormEdit && (
        <EditarPresupuesto
          idPresupuesto={presupuestoToEdit}
          handleCloseForm={() => setIsFormEdit(false)}
          submit={onSubmitEdit}
        />
      )}
    </>
  );
};
