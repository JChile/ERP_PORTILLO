import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import { FiChevronsRight, FiMoreVertical } from "react-icons/fi";
import { FaFileExcel } from "react-icons/fa6";
import { getAsesorActivo } from "../../../../../components/filters/asesor/getAsesor";
import { AuthContext } from "../../../../../auth";
import { combinarErrores } from "../../../../../utils";
import { asignarAsesorToLeads } from "../../../helpers";
import { exportLeadsAsesor } from "./exportLeadsAsesor";
import { FaWhatsapp } from "react-icons/fa";
import { sendMassiveMessage } from "../../../helpers/whatsapp/sendMassiveMessages";
import { CustomTextArea } from "../../../../../components";

const ITEM_HEIGHT = 48;

export const MassActionsViewLeadsAsesor = ({
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

  // funcion para asignar asesor a leads seleccionados
  const enviarMensajesMasivos = async (textMessage) => {
    setVisibleProgress(true);
    const leadData = data.map((item) => item.id);
    try {
      // aqui se enviara la query para crear mensajes masivos. <-----------.
      const response = await sendMassiveMessage(
        leadData,
        textMessage,
        authTokens["access"]
      );
      // volvemos a cargar la información
      onLoadData();
      // mostramos feedback de error
      setFeedbackMessages({
        style_message: "success",
        feedback_description_error: "Se envio correctamente",
      });
      handleClickFeedback();
      // ocultar el progress
      setVisibleProgress(false);
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

  // funcion para exportar asesores seleccionados
  const exportLeadsSeleccionados = () => {
    setVisibleProgress(true);
    exportLeadsAsesor(data);
    // cerramos el menu
    handleClose();
    setVisibleProgress(false);
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
        <MassiveMessages
          handleConfirm={enviarMensajesMasivos}
          onCloseMenu={handleClose}
          disabled={data.length === 0}
          leadsQuantiy={data.length}
        />
        <MenuItem
          key={"exportar"}
          onClick={exportLeadsSeleccionados}
          disabled={data.length === 0}
        >
          <FaFileExcel />
          <span className="ps-2">Exportar</span>
        </MenuItem>
      </Menu>
    </>
  );
};

const MassiveMessages = ({
  handleConfirm,
  onCloseMenu,
  disabled,
  leadsQuantiy,
}) => {
  const [open, setOpen] = useState(false);
  const [textMessage, setTextMessage] = useState();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // funcion para formatear la data
  const enviarMensajes = () => {
    if (!textMessage) {
      alert("Ingresa como mínimo un caracter");
    } else {
      // llamamos a la funcion de confirmacion
      handleConfirm(textMessage);
      // cerramos el cuadro de dialogo
      handleClose();
      // cerramos el menu de opciones
      onCloseMenu();
    }
  };

  return (
    <div>
      <MenuItem
        key={"asignacion"}
        onClick={() => {
          handleClickOpen();
        }}
        disabled={disabled}
      >
        <FaWhatsapp />
        <span className="ps-2">Enviar mensaje</span>
      </MenuItem>
      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth={true}>
        <DialogTitle>Enviar mensaje</DialogTitle>
        <DialogContent>
          <p className="mb-4">{leadsQuantiy} lead(s) seleccionados</p>
          <FormGroup>
            <TextareaAutosize
              label="Mensaje masivo"
              value={textMessage}
              onChange={(event) => setTextMessage(event.target.value)}
              rowsMin={5} // Ajuste del número mínimo de filas
              style={{
                width: "100%", // Ancho fijo
                height: "150px", // Altura fija
                border: "1px solid #ccc",
                padding: "8px",
                borderRadius: "4px",
              }} // Ajuste del estilo
              placeholder="Escribe tu mensaje aquí..." // Agregado de placeholder
            />
          </FormGroup>
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
            onClick={() => enviarMensajes()}
            variant="contained"
            color="success"
            autoFocus
          >
            Enviar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
