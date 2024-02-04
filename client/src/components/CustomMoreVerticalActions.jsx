import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FiCheckCircle } from "react-icons/fi";
import { FiMoreVertical, FiEdit2, FiDelete } from "react-icons/fi";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

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
    <>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <FiMoreVertical />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {activeOnEdit && (
          <MenuItem key={"Editar"} onClick={onEdit}>
            <FiEdit2 />
            <span className="ps-2">Editar</span>
          </MenuItem>
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
          <MenuItem key={"Activar"} onClick={onActive}>
            <FiCheckCircle />
            <span className="ps-2">Activar</span>
          </MenuItem>
        )}
      </Menu>
    </>
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
    <div>
      <MenuItem key={"Eliminar"} onClick={handleClickOpen}>
        <FiDelete />
        <span className="ps-2">Eliminar</span>
      </MenuItem>
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
    </div>
  );
};
