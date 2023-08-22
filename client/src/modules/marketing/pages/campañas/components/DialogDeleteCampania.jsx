import { 
    Dialog,
    DialogContent, 
    DialogTitle,
    DialogContentText,
    DialogActions,
    Button
} from "@mui/material";
import React from "react";

export const DialogDeleteCampania = ({
  item,
  showDialog,
  onDeleteItemSelected,
  onCloseDeleteDialog,
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
          {`¿Quiere eliminar a este usuario?: ${item.nombre} (${item.proyecto.nombre}) `}
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
