import {
  Backdrop,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { useForm } from "../hooks";
import { createEvent } from "../helpers/eventCases";
import { useState } from "react";
import { CustomTextArea, FilterProyectos } from "../../../components";
import { FilterTipoEvento } from "../../../components/filters/tipoEvento/FilterTipoEvento";

export const DialogForm = ({ isOpen, onClose, lead, token, user }) => {
  const { form, handleChangeForm, handleSubmit } = useForm({
    titulo: "",
    duracion: 1,
    fecha: "",
    observacion: "",
    tipo: null,
    horaInicio: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const { titulo, tipo, observacion, fecha, horaInicio, duracion } = form;

  const handleSave = async () => {
    const errors = checkInputForm();
    if (Object.keys(errors).length === 0) {
      const dateToSave = new Date(`${fecha}T${horaInicio}`);
      const eventSave = {
        duracion: duracion,
        fecha_visita: dateToSave.toISOString(),
        observacion: observacion,
        lead: lead,
        titulo: titulo,
        tipo: tipo,
        usuarioCreador: user,
        usuarioActualizador: user,
        estadoEvento: "estado_event" 
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
        <DialogTitle>Registrar Evento</DialogTitle>

        <DialogContent className="flex flex-col gap-y-2" dividers>
          <FormControl>
            <div className="flex flex-col gap-y-4">
              <TextField
                size="small"
                label="Título"
                placeholder="Titulo del evento"
                value={titulo}
                onChange={handleChangeForm}
                name="titulo"
              />
              <div className="grid grid-cols-2 gap-y-4 gap-x-4">
                <FilterTipoEvento
                  defaultValue={null}
                  onNewInput={onAddTipoEvento}
                />
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
              </div>
              <TextField type="text" multiline label="Observaciones" />
            </div>
          </FormControl>
          {/* Mostrar mensajes de error debajo de los campos del formulario */}
          {Object.keys(formErrors).map((fieldName) => (
            <Typography key={fieldName} variant="subtitle2" color="error">
              {formErrors[fieldName]}
            </Typography>
          ))}
        </DialogContent>
        <DialogActions>
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
            color="success"
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
