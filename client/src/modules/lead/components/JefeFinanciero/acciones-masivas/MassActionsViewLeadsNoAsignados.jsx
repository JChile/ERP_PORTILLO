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
} from "@mui/material";
import { FiChevronsRight, FiMoreVertical } from "react-icons/fi";
import { FaFileExcel } from "react-icons/fa6";
import { getAsesorActivo } from "../../../../../components/filters/asesor/getAsesor";
import { AuthContext } from "../../../../../auth";
import { combinarErrores } from "../../../../../utils";
import { asignarAsesorToLeads } from "../../../helpers";
import { exportLeadsNoAsignados } from "./exportLeadsNoAsignados";

const ITEM_HEIGHT = 48;

export const MassActionsViewLeadsNoAsignados = ({
  data,
  setFeedbackMessages,
  handleClickFeedback,
  setVisibleProgress,
  onLoadData,
}) => {
  console.log("SE CONSTRUYE");
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
  const asignarAsesorLeadsSeleccionado = async (asesores) => {
    setVisibleProgress(true);
    const formatData = {
      asesor: asesores.map((element) => element.id),
      lead: data.map((element) => element.id),
    };
    console.log(formatData);
    try {
      const result = await asignarAsesorToLeads(
        formatData,
        authTokens["access"]
      );
      console.log(result);
      // volvemos a cargar la información
      onLoadData();
      // mostramos feedback de error
      setFeedbackMessages({
        style_message: "success",
        feedback_description_error: "Se asigno correctamente",
      });
      handleClickFeedback();
      // ocultar el progress
      setVisibleProgress(false);
    } catch (error) {
      const pilaError = combinarErrores(error);
      console.log(pilaError);
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
    exportLeadsNoAsignados(data);
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
        <DialogAsignacionAsesorMasiva
          handleConfirm={asignarAsesorLeadsSeleccionado}
          onCloseMenu={handleClose}
        />
        <MenuItem key={"exportar"} onClick={exportLeadsSeleccionados}>
          <FaFileExcel />
          <span className="ps-2">Exportar</span>
        </MenuItem>
      </Menu>
    </>
  );
};

const DialogAsignacionAsesorMasiva = ({ handleConfirm, onCloseMenu }) => {
  console.log("Se vuelve a hacer una peticion");
  const [open, setOpen] = React.useState(false);
  const [asesoresActivos, setAsesoresActivos] = useState([]);
  const { authTokens } = useContext(AuthContext);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const traerInformacionAsesoresActivos = async () => {
    try {
      const result = await getAsesorActivo(authTokens["access"]);
      const formatData = result.map((element) => {
        return {
          ...element,
          isSelected: false,
        };
      });
      setAsesoresActivos(formatData);
    } catch (error) {
      const pilaError = combinarErrores(error);
      // mostramos feedback de error
      alert(pilaError);
    }
  };

  // actualizar cambio de estado de elemento
  const handleChangeCheckboxElement = (e, idItem) => {
    const dataUpdateAsesores = asesoresActivos.map((element) => {
      if (element.id === idItem) {
        return {
          ...element,
          isSelected: e.target.checked,
        };
      } else {
        return element;
      }
    });
    // actualizar data
    setAsesoresActivos(dataUpdateAsesores);
  };

  // funcion para formatear la data
  const filterAsesoresSeleccionados = () => {
    const filterAsesoresChecked = asesoresActivos.filter((element) => {
      if (element["isSelected"]) {
        return true;
      } else {
        return false;
      }
    });

    if (filterAsesoresChecked.length === 0) {
      alert("Debes seleccionar al menos 1 asesor");
    } else {
      // llamamos a la funcion de confirmacion
      handleConfirm(filterAsesoresChecked);
      // cerramos el cuadro de dialogo
      handleClose();
      // cerramos el menu de opciones
      onCloseMenu();
    }
  };

  useEffect(() => {
    traerInformacionAsesoresActivos();
  }, []);

  return (
    <div>
      <MenuItem
        key={"asignacion"}
        onClick={() => {
          handleClickOpen();
        }}
      >
        <FiChevronsRight />
        <span className="ps-2">Asignar asesor</span>
      </MenuItem>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Asignar asesor</DialogTitle>
        <DialogContent>
          <p className="mb-4">Seleciona 1 o más asesores</p>
          <FormGroup>
            {asesoresActivos.map((element) => (
              <FormControlLabel
                key={element.id}
                control={
                  <Checkbox
                    checked={element.isSelected}
                    onChange={(e) => {
                      handleChangeCheckboxElement(e, element.id);
                    }}
                    name="gilad"
                  />
                }
                label={`${element["first_name"]} ${element["last_name"]} (${element["codigoAsesor"]})`}
              />
            ))}
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
            onClick={() => {
              // ejecutamos la eliminación
              filterAsesoresSeleccionados();
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
