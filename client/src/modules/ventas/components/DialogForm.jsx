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
import { useContext, useState } from "react";
import { AuthContext } from "../../../auth/context/AuthContext";
import { FilterProyectos } from "../../../components";
import { FilterTipoEvento } from "../../../components/filters/tipoEvento/FilterTipoEvento";
import { FilterLeads } from "../../../components/filters/lead/FilterLead";

export const DialogForm = ({ isOpen, onClose }) => {
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
    lead: null,
  });
  const [formErrors, setFormErrors] = useState({});

  const {
    titulo,
    ubicacion,
    proyecto,
    tipo,
    descripcion,
    fecha,
    horaInicio,
    duracion,
    lead,
  } = form;

  const handleSave = async () => {
    const errors = checkInputForm();
    if (Object.keys(errors).length === 0) {
      // No hay errores, procede a guardar el evento
      const dateToSave = new Date(`${fecha}T${horaInicio}`);
      const eventSave = {
        titulo: titulo,
        duracion: duracion,
        fecha_visita: dateToSave.toISOString(),
        ubicacion: ubicacion,
        descripcion: descripcion,
        idUsuario: currentUser.user.id,
      
        tipo: tipo,
        proyecto: proyecto,
        estado: "A",
        lead: lead,
      };
      const result = await createEvent(eventSave);
      console.log(result);
      onClose();
    } else {
      // Hay errores en el formulario, actualiza el estado con los errores
      setFormErrors(errors);
    }
  };

  const checkInputForm = () => {
    const errors = {};
    if (!titulo) {
      errors.titulo = "El título es obligatorio";
    }
    if (!descripcion) {
      errors.descripcion = "La descripción es obligatoria";
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

  const onAddLead = (item) => {
    handleChangeForm({
      target: {
        name: "lead",
        value: item.id,
      },
    });
  };

  //BackdropProps={{ style: { backgroundColor: "rgba(0, 0, 0, 0.7)" } }}
  return (
    <Backdrop open={isOpen}>
      <Dialog open={isOpen} onClose={onClose}>
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

                <FilterLeads defaultValue={null} onNewInput={onAddLead} label="Lead"/>
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
              borderRadius: 0
            }}
          >
            Cerrar
          </Button>
          <Button
            variant="contained"
            color="info"
            sx={{
              textTransform: "capitalize",
              borderRadius: 0
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
