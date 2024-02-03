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

import {
  DatePicker,
  DateTimePicker,
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
    //horaInicio: dayjs(),
    estadoEvento: 1,
  });
  const [formErrors, setFormErrors] = useState({});

  const {
    titulo,
    tipo,
    observacion,
    fecha,
    //horaInicio,
    duracion,
    estadoEvento,
  } = form;

  const handleSave = async () => {
    const errors = checkInputForm();
    if (Object.keys(errors).length === 0) {
      const dateToSave = fecha.toDate().toISOString();
      const eventSave = {
        duracion: duracion,
        fecha_visita: dateToSave,
        observacion: observacion,
        lead: lead,
        titulo: titulo,
        tipo: tipo,
        usuarioCreador: user,
        usuarioActualizador: user,
        estadoEvento: estadoEvento,
      };

      console.log(duracion);
      const result = await createEvent(eventSave, token);
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
      <Dialog open={isOpen} onClose={onClose}>
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
                </div>
                <TextField
                  type="text"
                  multiline
                  label="Observaciones"
                  name="observacion"
                  value={observacion}
                  onChange={handleChangeForm}
                />
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
