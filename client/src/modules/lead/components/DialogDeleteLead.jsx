import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogContentText,
    DialogActions,
    Button
} from "@mui/material";
import React from "react";

export const DialogDeleteLead = ({
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
                {"Alerta de eliminación de lead"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {`¿Quiere eliminar este lead?: ${item.nombre} `}
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
