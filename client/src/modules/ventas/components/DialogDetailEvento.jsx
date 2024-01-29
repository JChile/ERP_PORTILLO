import styled from "@emotion/styled";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { FiEdit, FiSave, FiX } from "react-icons/fi";
import { GrUpdate } from "react-icons/gr";
import { MdCancel, MdOutlineSave } from "react-icons/md";
import { CustomTextArea } from "../../../components";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { getEstadoEvento, getTipoEventos } from "../helpers/typeEventCases";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { FilterTipoEvento } from "../../../components/filters/tipoEvento/FilterTipoEvento";
import FilterEstadoEvento from "../../../components/filters/estado_evento/FilterEstadoEvento";

export const DialogDetailEvento = ({
  onClose,
  selectedEvent,
  isOpen,
  onUpdateEvent,
}) => {
  const [dataAuxEvento, setDataAuxEvento] = useState(selectedEvent);

  const {
    separado,
    title,
    lead,
    start,
    duracion,
    tipoEvento,
    observacion,
    estadoEvento,
  } = dataAuxEvento;

  console.log(dataAuxEvento)

  const [editData, setEditData] = useState(false);

  const handleChangeValue = ({ target }) => {
    const { value, name } = target;
    setDataAuxEvento({
      ...dataAuxEvento,
      [name]: value,
    });
  };

  const handleCheckbox = (evento) => {
    setDataAuxEvento({ ...dataAuxEvento, separado: evento.target.checked });
  };

  // guardar los datos
  const onSaveChanges = () => {
    onUpdateEvent(id, dataAuxEvento);
    setEditData(false);
  };

  // cancelar los datos
  const onCancelChanges = () => {
    setDataAuxEvento(selectedEvent);
    setEditData(false);
  };

  const handleChangeTipoEvento = (value) => {
    console.log(value);
  }

  const handleChangeEstadoEvento = (value) => {
    console.log(value);
  }


  useEffect(() => {
    dayjs.locale("es");
  }, []);


  return (
    <Dialog
      fullWidth={true}
      maxWidth="md"
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={isOpen}
    >
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        id="customized-dialog-title"
      >
        Detalle Evento
        {editData ? (
          <div>
            <IconButton color="success" onClick={onSaveChanges}>
              <FiSave />
            </IconButton>
            <IconButton color="error" onClick={onCancelChanges}>
              <FiX />
            </IconButton>
          </div>
        ) : (
          <IconButton
            onClick={() => {
              setEditData(!editData);
            }}
          >
            <FiEdit />
          </IconButton>
        )}
      </DialogTitle>
      <DialogContent dividers>
        {/* SEPARÓ? */}
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Titulo:
            </Typography>
            <TextField
              disabled={!editData}
              placeholder="empty"
              size="small"
              value={title}
              name="title"
              onChangeValue={handleChangeValue}
            />
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Lead:
            </Typography>
            <Typography>
              {`${lead.nombre} ${lead.apellido} - Celular: ${lead.celular}`}
            </Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Separó:
            </Typography>
            <Checkbox
              checked={separado}
              disabled={!editData}
              onChange={handleCheckbox}
              inputProps={{ "aria-label": "controlled" }}
            />
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Tipo de evento:
            </Typography>
            <FilterTipoEvento
              defaultValue={tipoEvento.id}
              size="small"
              onNewInput={(value) => {handleChangeTipoEvento(value)}}
              disabled={!editData}
            />
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Estado:
            </Typography>
            <FilterEstadoEvento
              defaultValue={estadoEvento}
              size="small"
              onNewInput={(value) => {handleChangeEstadoEvento(value)}}
              disabled={!editData}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Fecha evento:
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                disabled={!editData}
                disablePast
                value={dayjs(start)}
                slotProps={{ textField: { size: "small" } }}
                onChange={() => {}}
              />
            </LocalizationProvider>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Duración:
            </Typography>
            <TextField
              type="number"
              size="small"
              value={duracion}
              disabled={!editData}
              onChange={handleChangeValue}
              name="duracion"
            />
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Observación:
            </Typography>
            <TextField
              type="number"
              value={observacion}
              disabled={!editData}
              multiline
              rows={5}
              onChange={handleChangeValue}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions className="bg-dark-purple" sx={{}}>
        <Button
          variant="contained"
          onClick={onClose}
          sx={{
            textTransform: "capitalize",
            borderRadius: "0px",
          }}
        >
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
