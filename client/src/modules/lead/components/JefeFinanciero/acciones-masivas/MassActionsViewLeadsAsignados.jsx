import React, { useContext, useState } from "react";
import { AuthContext } from "../../../../../auth";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { FiChevronsRight, FiMoreVertical } from "react-icons/fi";
import { quitarLeads } from "../../../helpers/desasignarLeads";
import { combinarErrores } from "../../../../../utils";

const ITEM_HEIGHT = 48;

const MassActionsViewLeadsAsignados = ({
  data,
  setFeedbackMessages,
  handleClickFeedback,
  setVisibleProgress,
  onLoadData,
}) => {
  const { authTokens } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const desasignarLeads = async () => {
    setVisibleProgress(true);
    try {
      const formatData = data.map((lead) => lead.id);
      const result = await quitarLeads(authTokens["access"], {
        lead: formatData,
      });
      handleClose();
      onLoadData();
      setFeedbackMessages({
        style_message: "success",
        feedback_description_error: "Se desasigno correctamente",
      });
      handleClickFeedback();
      //setVisibleProgress(false);
    } catch (error) {
      const pilaError = combinarErrores(error);
      setFeedbackMessages({
        style_message: "error",
        feedback_description_error: pilaError,
      });
      handleClickFeedback();
      setVisibleProgress(false);
    }
  };

  const handleClickOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  return (
    <React.Fragment>
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
        <MenuItem key="eliminar" onClick={handleClickOpenDialog}>
          <FiChevronsRight />
          <span className="ps-2">Desasignar</span>
        </MenuItem>
        <DialogQuitarAsignacion
          open={openDialog}
          onClose={handleCloseDialog} // pasar una función que cierre el menú
          handleConfirm={desasignarLeads}
        />
      </Menu>
    </React.Fragment>
  );
};

const DialogQuitarAsignacion = ({ open, handleConfirm, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Desasignar Leads</DialogTitle>
      <DialogContent>
        Mediante esta acción usted desasignara los leads seleccionados
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="inherit">
          Cancelar
        </Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          color="error"
          autoFocus
        >
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MassActionsViewLeadsAsignados;
