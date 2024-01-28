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
import {
  FiChevronRight,
  FiChevronsRight,
  FiMoreVertical,
} from "react-icons/fi";
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
      console.log({ lead: formatData });
      const result = await quitarLeads(authTokens["access"], {
        lead: formatData,
      });
      console.log(result);
      // volcemos a cargar los datos
      onLoadData();
      setFeedbackMessages({
        style_message: "success",
        feedback_description_error: "Se desasigno correctamente",
      });
      handleClickFeedback();
      setVisibleProgress(false);
      handleClose();
    } catch (error) {
      const pilaError = combinarErrores(error);
      // mostramos feedback de error
      setFeedbackMessages({
        style_message: "error",
        feedback_description_error: pilaError,
      });
      handleClickFeedback();
      // ocultar el progress
      setVisibleProgress(false);
    }
  };

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
        <DialogQuitarAsignacion
          onCloseMenu={handleClose}
          handleConfirm={desasignarLeads}
        />
      </Menu>
    </React.Fragment>
  );
};

const DialogQuitarAsignacion = ({ handleConfirm, onCloseMenu }) => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <React.Fragment>
      <MenuItem key={"eliminar"} onClick={handleClickOpen}>
        <FiChevronsRight />
        <span className="ps-2">Desasignar</span>
      </MenuItem>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Desasignar Leads</DialogTitle>
        <DialogContent>
          Mediante esta acción usted desasinara los leads seleccionados de los
          asesores asigandos
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
              onCloseMenu();
            }}
            variant="contained"
            color="inherit"
          >
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
    </React.Fragment>
  );
};

export default MassActionsViewLeadsAsignados;
