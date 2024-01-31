import React, { useEffect, useState } from "react";
import { getProyectosCampanias } from "./getProyectosCampanias";
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { FiSearch } from "react-icons/fi";

const defaultOptionProyecto = {
  id: null,
  label: "Seleccione un proyecto",
  value: null,
};

const defaultOptionCampania = {
  id: null,
  label: "Seleccione una campania",
  value: null,
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export const FilterProyectoCampania = ({ onAddCampania }) => {
  // data de proyectos
  const [proyecto, setProyecto] = useState([]);
  // proyecto seleccionado
  const [valueProyecto, setValueProyecto] = useState(defaultOptionProyecto);
  // data de campañas
  const [campania, setCampania] = useState([]);
  // campaña seleccionada
  const [valueCampania, setValueCampania] = useState(defaultOptionCampania);

  // manejadores de dialog
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // traer data de proyectos
  const traerDataProyectosCampanias = async () => {
    const result = await getProyectosCampanias();
    const auxProyectos = result.map((element) => ({
      id: element.id,
      label: element.nombre,
      value: element.id,
      campanias: element.campania,
    }));

    setProyecto([defaultOptionProyecto, ...auxProyectos]);
  };

  const handleChangeProyecto = (event, value) => {
    setValueProyecto(value);
    if (value.id !== null) {
      const formatCampanias = value.campanias.map((element) => {
        return {
          id: element.id,
          label: element.nombre,
          value: element.id,
        };
      });
      setCampania([defaultOptionCampania, ...formatCampanias]);
      setValueCampania(defaultOptionCampania);
    } else {
      setCampania([]);
      setValueCampania(defaultOptionCampania);
    }
  };

  const handleChangeCampania = (event, value) => {
    setValueCampania(value);
  };

  const handledAceptarSeleccion = () => {
    // pasamos el valor de la campaña seleccionada
    const auxValue = valueCampania;
    if (auxValue["value"]) {
      onAddCampania(auxValue);
    } else {
      alert("Debes selecionar una campaña");
    }
    // cerramos el cuadro de dialogo emergente
    handleClose();
  };

  const handleCancelarSeleccion = () => {
    // pasamos el valor de la campaña default
    onAddCampania(defaultOptionCampania);
    // seteamos la informacion
    setValueProyecto(defaultOptionProyecto);
    setValueCampania(defaultOptionCampania);
    // cerramos el cuadro de dialogo emergente
    handleClose();
  };

  useEffect(() => {
    traerDataProyectosCampanias();
  }, []);

  return (
    <>
      <IconButton onClick={handleClickOpen} color="primary">
        <FiSearch />
      </IconButton>
      <BootstrapDialog
        maxWidth={"md"}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Busqueda de campaña
        </DialogTitle>
        <DialogContent dividers>
          <div className="flex flex-col gap-y-4">
            {/* PROYECTO */}
            <div>
              <label
                htmlFor="proyecto"
                className="block text-sm font-medium text-gray-700"
              >
                Proyecto
              </label>
              <Autocomplete
                options={proyecto}
                value={valueProyecto}
                getOptionLabel={(option) => option.label}
                disableClearable
                onChange={handleChangeProyecto}
                isOptionEqualToValue={(option, value) => option.id == value.id}
                renderInput={(params) => <TextField {...params} size="small" />}
              />
            </div>
            {/* CAMPAÑA */}
            {valueProyecto.value && (
              <div>
                <label
                  htmlFor="campania"
                  className="block text-sm font-medium text-gray-700"
                >
                  Campaña
                </label>
                <Autocomplete
                  options={campania}
                  value={valueCampania}
                  getOptionLabel={(option) => option.label}
                  disableClearable
                  onChange={handleChangeCampania}
                  isOptionEqualToValue={(option, value) =>
                    option.id == value.id
                  }
                  renderInput={(params) => (
                    <TextField {...params} size="small" />
                  )}
                />
              </div>
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCancelarSeleccion}>
            Quitar
          </Button>
          <Button color="error" autoFocus onClick={handledAceptarSeleccion}>
            Aceptar
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
};
