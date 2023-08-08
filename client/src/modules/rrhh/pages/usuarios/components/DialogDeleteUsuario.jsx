import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
export const DialogDeleteUsuario = ({
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
        {"Alerta de eliminación de usuario"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {`¿Quiere eliminar a este usuario?: ${item.first_name} ${item.last_name}`}
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
            onDeleteItemSelected(item.id);
          }}
          autoFocus
        >
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
