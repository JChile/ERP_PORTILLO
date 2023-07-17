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
        {"Use Google's location service?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {`¿Quiere eliminar a este usuario?: ${item.first_name} ${item.last_name}`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCloseDeleteDialog}>Cancelar</Button>
        <Button
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

  // return (
  //   <div
  //     className="modal"
  //     tabIndex="-1"
  //     role="dialog"
  //     style={{
  //       display: item !== null ? "block" : "none",
  //     }}
  //   >
  //     <div className="modal-dialog modal-lg" role="document">
  //       <div className="modal-content">
  //         <div className="modal-header">
  //           <h5 className="modal-title">Eliminar usuario</h5>
  //           <button
  //             type="button"
  //             className="close ms-2"
  //             data-dismiss="modal"
  //             aria-label="Close"
  //             onClick={onClose}
  //           >
  //             <span aria-hidden="true">&times;</span>
  //           </button>
  //         </div>
  //         <div className="modal-body">
  //           <p className="fw-bolder text-danger">
  //             ¿Quieres eliminar este detalle?
  //           </p>
  //           <p>
  //             <b className="me-2">Nombres y apellidos:</b>
  //             {`${item.first_name} ${item.last_name}`}
  //           </p>
  //           <p>
  //             <b className="me-2">Correo:</b>
  //             {item.email}
  //           </p>
  //         </div>
  //         <div className="modal-footer">
  //           <button
  //             type="button"
  //             className="btn btn-secondary"
  //             data-dismiss="modal"
  //             onClick={onClose}
  //           >
  //             Cancelar
  //           </button>

  //           <button
  //             type="button"
  //             className="btn btn-danger"
  //             data-dismiss="modal"
  //             onClick={() => {
  //               onDeleteItemSelected(item.id);
  //             }}
  //           >
  //             Aceptar
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
};
