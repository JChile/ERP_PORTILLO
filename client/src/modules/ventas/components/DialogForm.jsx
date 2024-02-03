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
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useForm } from "../hooks";
import { createEvent } from "../helpers/eventCases";
import { useEffect, useState } from "react";
import { FilterTipoEvento } from "../../../components/filters/tipoEvento/FilterTipoEvento";
import { getEstadoEvento } from "../helpers/typeEventCases";
import dayjs from "dayjs";
import "dayjs/locale/es";

export const DialogForm = ({ isOpen, onClose, onCreateRegistroEvento }) => {
  const { form, handleChangeForm } = useForm({
    titulo: "",
    duracion: 10,
    fecha: dayjs(),
    observacion: "",
    tipo: null,
    estadoEvento: 1,
  });
  const [formErrors, setFormErrors] = useState({});

  const { titulo, tipo, observacion, fecha, duracion, estadoEvento } = form;

  const handleSave = () => {
    const errors = checkInputForm();
    if (Object.keys(errors).length === 0) {
      const dateToSave = fecha.toDate().toISOString();
      const eventSave = {
        duracion: duracion,
        fecha_visita: dateToSave,
        observacion: observacion,
        titulo: titulo,
        tipo: tipo,
        estadoEvento: estadoEvento,
      };
      onCreateRegistroEvento(eventSave)
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

    return errors;
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
      <Dialog open={isOpen} onClose={onClose} fullWidth={true}>
        <DialogTitle>Registrar Evento</DialogTitle>
        <DialogContent className="flex flex-col gap-y-2" dividers>
          <FormControl>
            <div className="flex flex-col gap-y-4">
              <TextField
                label="Título"
                placeholder="Titulo del evento"
                value={titulo}
                onChange={handleChangeForm}
                name="titulo"
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className="grid grid-cols-2 gap-y-4 gap-x-4">
                  <FilterTipoEvento
                    defaultValue={null}
                    onNewInput={onAddTipoEvento}
                  />
                  <DateTimePicker
                    disablePast
                    type="date"
                    label="Fecha"
                    onChange={(value) => {
                      const target = { name: "fecha", value: value };
                      handleChangeForm({ target });
                    }}
                    name="fecha"
                  />
                  <TextField
                    type="number"
                    label="Duración (min)"
                    placeholder="Duración"
                    value={duracion}
                    onChange={handleChangeForm}
                    name="duracion"
                  />
                  <TextField
                    type="text"
                    multiline
                    label="Observaciones"
                    name="observacion"
                    value={observacion}
                    onChange={handleChangeForm}
                  />
                </div>
              </LocalizationProvider>
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
            }}
          >
            Cerrar
          </Button>
          <Button
            variant="contained"
            color="success"
            sx={{
              textTransform: "capitalize",
            }}
            onClick={handleSave}
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Backdrop>
  );
};
