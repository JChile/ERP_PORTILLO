import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FiCheckCircle, FiTrash } from "react-icons/fi";
import { FiMoreVertical, FiEdit2, FiDelete } from "react-icons/fi";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { FaCheckCircle, FaEdit, FaRegEdit, FaTrash } from "react-icons/fa";

const ITEM_HEIGHT = 48;

export const CustomMoreVerticalActions = ({
  onDelete = () => console.log("delete"),
  onEdit = () => console.log("edit"),
  onActive = () => console.log("active"),
  activeOnDelete = true,
  activeOnEdit = true,
  activeOnActive = true,
  titleDialog = "Dialogo de confirmación",
  descriptionDialog = "¿Estas seguro de eliminar este registro?",
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      {activeOnEdit && (
        <FaRegEdit size={20} key={"Editar"} onClick={onEdit} className="inline-block mx-1 cursor-pointer shadow-lg hover:shadow-blue-900" color="blue" />
      )}
      {activeOnDelete && (
        <DialogConfirmDeleteItem
          title={titleDialog}
          description={descriptionDialog}
          handleConfirm={onDelete}
          onCloseMenu={handleClose}
        />
      )}
      {!activeOnDelete && activeOnActive && (
        <FiCheckCircle size={20} key={"Activar"} onClick={onActive} className="inline-block mx-1 cursor-pointer shadow-lg hover:shadow-green-900" color="green" />
      )}
    </React.Fragment>
  );
};

const DialogConfirmDeleteItem = ({
  title,
  description,
  item,
  handleConfirm,
  onCloseMenu,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <FaTrash size={16} key={"Eliminar"} onClick={handleClickOpen} color="red" className="inline-block mx-1 cursor-pointer shadow-lg hover:shadow-red-900" />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {description}
            {item && (
              <>
                <p>Información de registro:</p>
                {Object.entries(item).map(([key, value]) => (
                  <p key={key}>{`${key}: ${value}`}</p>
                ))}
              </>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              // cerramos el cuadro de dialogo
              handleClose();
              // cerramos el menu de opciones
              onCloseMenu();
            }}
            variant="contained"
            color="inherit"
          >
            Cancelar
          </Button>
          <Button
            onClick={() => {
              // ejecutamos la eliminación
              handleConfirm();
              // cerramos el cuadro de dialogo
              handleClose();
              // cerramos el menu de opciones
              onCloseMenu();
            }}
            variant="contained"
            color="error"
            autoFocus
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
