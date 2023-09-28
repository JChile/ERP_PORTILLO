import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
export const DialogDeleteAsesor = ({
  item,
  showDialog,
  onCloseDeleteDialog,
  onDeleteItemSelected,
}) => {
  return (
    <Dialog
      open={showDialog}
      onClose={onCloseDeleteDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Alerta de eliminación de asesor"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {`¿Quieres inactivar a este asesor?: ${item.user.first_name} ${item.user.last_name} - ${item.user.username}`}
        </DialogContentText>
        <DialogContentText id="alert-dialog-description" color={"red"}>
          <br />
          {`Recuerda que todos sus leads en estado "En proceso" seran actualizados a un estado "No asignados"`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="inherit"
          onClick={onCloseDeleteDialog}
        >
          Cancelar
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            onDeleteItemSelected(item);
          }}
          autoFocus
        >
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
