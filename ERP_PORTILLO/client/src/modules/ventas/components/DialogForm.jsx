import {
  Backdrop,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "../hooks";
import { createEvent } from "../helpers/eventCases";
import { useState } from "react";
import { FilterProyectos } from "../../../components";
import { FilterTipoEvento } from "../../../components/filters/tipoEvento/FilterTipoEvento";

export const DialogForm = ({ isOpen, onClose, lead, token, user }) => {
  const { form, handleChangeForm, handleSubmit } = useForm({
    titulo: "",
    duracion: 1,
    fecha: "",
    descripcion: "",
    tipo: null,
    proyecto: null,
    horaInicio: "",
    ubicacion: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const {
    titulo,
    proyecto,
    tipo,
    descripcion,
    fecha,
    horaInicio,
    duracion,
    ubicacion,
  } = form;

  const handleSave = async () => {
    const errors = checkInputForm();
    if (Object.keys(errors).length === 0) {
      const dateToSave = new Date(`${fecha}T${horaInicio}`);
      const eventSave = {
        duracion: duracion,
        fecha_visita: dateToSave.toISOString(),
        descripcion: descripcion,
        lead: lead,
        titulo: titulo,
        tipo: tipo,
        ubicacion: ubicacion,
        proyecto: proyecto,
        usuarioCreador: user,
        usuarioActualizador: user,
      };
      console.log({ eventSave });
      const result = await createEvent(eventSave, token);
      console.log(result);
      onClose();
    } else {
      setFormErrors(errors);
    }
  };

  const checkInputForm = () => {
    const errors = {};
    if (!titulo) {
      errors.titulo = "El título es obligatorio";
    }
    if (!fecha) {
      errors.fecha = "La fecha es obligatoria";
    }
    if (duracion <= 0) {
      errors.duracion = "La duración debe ser mayor a 0";
    }
    if (!tipo) {
      errors.tipo = "El tipo es obligatorio";
    }
    if (!proyecto) {
      errors.proyecto = "El proyecto es obligatorio";
    }
    return errors;
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

  return (
    <Backdrop open={isOpen}>
      <Dialog
        open={isOpen}
        onClose={onClose}
        PaperProps={{ sx: { borderRadius: "0px" } }}
      >
        <DialogTitle className="text-white font-bold text-center bg-[#282828]">
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
                <FilterProyectos
                  label="Proyectos"
                  onNewInput={onAddProyecto}
                  defaultValue={null}
                  token={token}
                />
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
              </div>
            </div>
          </FormControl>
          {/* Mostrar mensajes de error debajo de los campos del formulario */}
          {Object.keys(formErrors).map((fieldName) => (
            <Typography key={fieldName} variant="subtitle2" color="error">
              {formErrors[fieldName]}
            </Typography>
          ))}
        </DialogContent>
        <DialogActions className="bg-dark-purple">
          <Button
            variant="contained"
            color="inherit"
            onClick={onClose}
            sx={{
              textTransform: "capitalize",
              borderRadius: 0,
            }}
          >
            Cerrar
          </Button>
          <Button
            variant="contained"
            color="info"
            sx={{
              textTransform: "capitalize",
              borderRadius: 0,
            }}
            onClick={() => handleSubmit(handleSave)}
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Backdrop>
  );
};
