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
import React, { useEffect, useState } from "react";
import { FiEdit, FiSave, FiX } from "react-icons/fi";
import {
  DesktopDateTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { FilterTipoEvento } from "../../../components/filters/tipoEvento/FilterTipoEvento";
import FilterEstadoEvento from "../../../components/filters/estado_evento/FilterEstadoEvento";
import { FilterObjecion } from "../../../components";

export const DialogDetailEvento = ({
  onClose,
  selectedEvent,
  isOpen,
  onUpdateEvent,
  showLead = true,
}) => {
  const [originalData, setOriginalData] = useState(selectedEvent);
  const [dataAuxEvento, setDataAuxEvento] = useState(originalData);

  const {
    id,
    separado,
    title,
    lead,
    start,
    duracion,
    tipo,
    observacion,
    estadoEvento,
  } = dataAuxEvento;

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
    const formatData = dayjs(dataAuxEvento.start);
    onUpdateEvent(id, {
      ...dataAuxEvento,
      lead: lead.id,
      titulo: title,
      fecha_visita: formatData.toDate().toISOString(),
    });
    setOriginalData(dataAuxEvento);
    setEditData(false);
  };

  // cancelar los datos
  const onCancelChanges = () => {
    setDataAuxEvento(originalData);
    setEditData(false);
  };

  const handleChangeTipoEvento = (value) => {
    setDataAuxEvento((prev) => ({
      ...prev,
      tipo: value.id,
    }));
  };

  const handleChangeEstadoEvento = (value) => {
    setDataAuxEvento((prev) => ({
      ...prev,
      estadoEvento: value.id,
    }));
  };

  const handleChangeDate = (value) => {
    setDataAuxEvento((prev) => ({
      ...prev,
      start: value,
    }));
  };

  const handleChangeObjecion = (value) => {
    setDataAuxEvento((prev) => ({
      ...prev,
      objecion: value,
    }));
  };

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

        <Grid container spacing={4}>
          <Grid item xs={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Título:
            </Typography>
            <TextField
              disabled={!editData}
              placeholder="empty"
              size="small"
              fullWidth
              value={title}
              name="title"
              sx={{
                "&.Mui-disabled": {
                  opacity: 1, // Establecer opacidad completa cuando está deshabilitado
                },
              }}
              onChange={handleChangeValue}
            />
            {showLead && (
              <React.Fragment>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  Lead:
                </Typography>

                <Typography>
                  {`${lead.nombre} ${lead.apellido} - ${lead.celular}`}
                </Typography>
              </React.Fragment>
            )}

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
              defaultValue={tipo}
              size="small"
              onNewInput={(value) => {
                handleChangeTipoEvento(value);
              }}
              disabled={!editData}
            />
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Estado:
            </Typography>
            <FilterEstadoEvento
              defaultValue={estadoEvento}
              size="small"
              onNewInput={(value) => {
                handleChangeEstadoEvento(value);
              }}
              disabled={!editData}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Fecha evento:
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDateTimePicker
                disabled={!editData}
                disablePast
                name="start"
                value={dayjs(start)}
                slotProps={{ textField: { size: "small", fullWidth: true } }}
                onChange={(value) => handleChangeDate(value)}
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
              fullWidth
              onChange={handleChangeValue}
              name="duracion"
            />
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Comentario:
            </Typography>
            <TextField
              type="number"
              value={observacion}
              disabled={!editData}
              fullWidth
              onChange={handleChangeValue}
              size="small"
            />
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Objección
            </Typography>
            <FilterObjecion
              active={!editData}
              size="small"
              defaultValue={null}
              onNewInput={(value) => handleChangeObjecion(value)}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions className="bg-dark-purple">
        <Button
          variant="contained"
          onClick={onClose}
          sx={{
            textTransform: "capitalize",
          }}
        >
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
