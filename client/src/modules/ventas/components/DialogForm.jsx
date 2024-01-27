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

import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useForm } from "../hooks";
import { createEvent } from "../helpers/eventCases";
import { useEffect, useState } from "react";
import { FilterTipoEvento } from "../../../components/filters/tipoEvento/FilterTipoEvento";
import { getEstadoEvento } from "../helpers/typeEventCases";
import dayjs from "dayjs";
import "dayjs/locale/es";

export const DialogForm = ({ isOpen, onClose, lead, token, user }) => {
  const { form, handleChangeForm, handleSubmit } = useForm({
    titulo: "",
    duracion: 10,
    fecha: dayjs(),
    observacion: "",
    tipo: null,
    horaInicio: dayjs(),
    estadoEvento: null,
  });
  const [formErrors, setFormErrors] = useState({});

  const { titulo, tipo, observacion, fecha, horaInicio, duracion } = form;

  const handleSave = async () => {
    const errors = checkInputForm();
    if (Object.keys(errors).length === 0) {
      const dateToSave = combinedDataAndTime(fecha, horaInicio);
      const eventSave = {
        duracion: duracion,
        fecha_visita: dateToSave.toISOString(),
        observacion: observacion,
        lead: lead,
        titulo: titulo,
        tipo: tipo,
        usuarioCreador: user,
        usuarioActualizador: user,
        estadoEvento: 1,
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

  useEffect(() => {
    const fetchData = async () => {
      const data = await getEstadoEvento(token);
      console.log(data);
    };
    dayjs.locale("es");
    fetchData();
  }, []);

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
                  <DatePicker
                    type="date"
                    label="Fecha"
                    value={fecha}
                    onChange={(value) => {
                      const target = { name: "fecha", value: value };
                      handleChangeForm({ target });
                    }}
                    name="fecha"
                  />
                  <TimePicker
                    label="Hora de inicio"
                    value={horaInicio}
                    onChange={(value) => {
                      const target = { name: "horaInicio", value: value };
                      handleChangeForm({ target });
                    }}
                    name="horaInicio"
                  />

                  <TextField
                    type="number"
                    label="Duración (min)"
                    placeholder="Duración"
                    value={duracion}
                    onChange={handleChangeForm}
                    name="duracion"
                  />
                </div>
                <TextField type="text" multiline label="Observaciones" />
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

/**
 *
 * @param {Date} date
 * @param {Time} time
 * @returns
 */
function combinedDataAndTime(date, time) {
  console.log(date, time);
  const year = date.year();
  const month = date.month(); // Note: month is 0-indexed or not?
  const day = date.date();
  const hours = time.hour();
  const minutes = time.minute();
  const seconds = time.second();
  return new Date(year, month, day, hours, minutes, seconds);
}
