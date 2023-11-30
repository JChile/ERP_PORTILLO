import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useForm } from "../hooks";
import { createEvent } from "../helpers/eventCases";
import { useContext } from "react";
import { AuthContext } from "../../../auth/context/AuthContext";
import { FilterProyectos } from "../../../components";
import { FilterTipoEvento } from "../../../components/filters/tipoEvento/FilterTipoEvento";

export const DialogForm = ({ isOpen, typeEvents, onClose }) => {
  const { currentUser } = useContext(AuthContext);

  const { form, handleChangeForm, handleSubmit } = useForm({
    titulo: "",
    duracion: 1,
    fecha: "",
    ubicacion: "",
    descripcion: "",
    tipo: null,
    proyecto: null,
    horaInicio: "",
  });

  const {
    titulo,
    ubicacion,
    proyecto,
    tipo,
    descripcion,
    fecha,
    horaInicio,
    duracion,
  } = form;

  const handleSave = async () => {
    const dateToSave = new Date(`${fecha}T${horaInicio}`);
    const eventSave = {
      titulo: titulo,
      duracion: duracion,
      fecha_visita: dateToSave.toISOString(),
      ubicacion: ubicacion,
      descripcion: descripcion,
      asesor: currentUser.user.id,
      tipo: tipo,
      proyecto: proyecto,
      estado: "A",
    };
    checkInputForm();
    const result = await createEvent(eventSave);
    onClose();
  };

  const onAddProyecto = (item) => {
    handleChangeForm({
      target: {
        name: "proyecto",
        value: item.id,
      },
    });
  };

  const onAddTipoEvento = (item) => {
    handleChangeForm({
      target: {
        name: "tipo",
        value: item.id,
      },
    });
  };

  const checkInputForm = () => {
    if (!titulo) return;
    if (!descripcion) return;
    if (!fecha) return;
    if (duracion <= 0) return;
    if (!tipo) return;
    if (!proyecto) return;
    return {
      ...form,
    };
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle className="text-black font-bold text-center">
        Registrar Evento
      </DialogTitle>
      <DialogContent className="flex flex-col gap-y-2">
        <FormControl>
          <div className="flex gap-x-4 mt-4">
            <div className="flex flex-col gap-y-4">
              <TextField
                size="small"
                label="Título"
                placeholder="Titulo del evento"
                value={titulo}
                onChange={handleChangeForm}
                name="titulo"
              />
              <TextField
                size="small"
                label="Descripción"
                placeholder="Descripción"
                value={descripcion}
                onChange={handleChangeForm}
                name="descripcion"
                rows={2}
                minRows={2}
              />
              <FilterTipoEvento
                defaultValue={null}
                onNewInput={onAddTipoEvento}
              />
              <FilterProyectos onNewInput={onAddProyecto} defaultValue={null} />
            </div>

            <div className="flex flex-col gap-y-4">
              <TextField
                size="small"
                type="date"
                label="Fecha"
                value={fecha}
                onChange={handleChangeForm}
                name="fecha"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                type="time"
                label="Hora de inicio"
                value={horaInicio}
                onChange={handleChangeForm}
                name="horaInicio"
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
                className="flex-2"
              />

              <TextField
                type="number"
                label="Duración (min)"
                placeholder="Duración"
                value={duracion}
                onChange={handleChangeForm}
                name="duracion"
                size="small"
              />

              <TextField
                type="text"
                label="Ubicación"
                placeholder="Ubicación"
                value={ubicacion}
                onChange={handleChangeForm}
                name="ubicacion"
                size="small"
              />

              <div className="flex flex-row gap-x-2 justify-between">
                <Button variant="outlined" color="error" onClick={onClose}>
                  Cerrar
                </Button>
                <Button
                  variant="outlined"
                  color="success"
                  onClick={() => handleSubmit(handleSave)}
                >
                  Guardar
                </Button>
              </div>
            </div>
          </div>
        </FormControl>
      </DialogContent>
    </Dialog>
  );
};
