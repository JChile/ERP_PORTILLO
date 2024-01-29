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
  Typography,
} from "@mui/material";
import { useState } from "react";
import { FiEdit, FiSave, FiX } from "react-icons/fi";
import { GrUpdate } from "react-icons/gr";
import { MdCancel, MdOutlineSave } from "react-icons/md";

export const DialogDetailEvento = ({
  onClose,
  selectedEvent,
  isOpen,
  onUpdateEvent,
}) => {
  const [dataAuxEvento, setDataAuxEvento] = useState(selectedEvent);

  const { tipo, descripcion, start, title, duracion, separado } = dataAuxEvento;

  const [editData, setEditData] = useState(false);

  console.log(dataAuxEvento)

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

  return (
    <Dialog
      maxWidth={"xs"}
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
        <Grid item xs={10}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            Separó:
          </Typography>
          <Checkbox
            checked={separado}
            disabled={editData}
            onChange={handleCheckbox}
            inputProps={{ "aria-label": "controlled" }}
          />
        </Grid>
        <Grid item xs={10}>

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
