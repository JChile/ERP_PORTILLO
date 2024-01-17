import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { createWhatsapp } from "../helpers";
import { AuthContext } from "../../../auth";
import { combinarErrores } from "../../../utils";

const ITEM_HEIGHT = 48;
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export const ComponentWhatsapp = ({ lead, dataWhatsapp, onLoadDataRfresh }) => {
  const [itemSelected, setItemSelected] = useState(null);
  const [openDialogDetalle, setOpenDialogDetalle] = useState(false);
  const { currentUser, authTokens } = useContext(AuthContext);

  const handleSelectDetalle = (element) => {
    setItemSelected(element);
    setOpenDialogDetalle(true);
  };

  const handleCloseDetalle = () => {
    setItemSelected(null);
    setOpenDialogDetalle(false);
  };

  const crearRegistroWhatsapp = async (body) => {
    const formatData = {
      ...body,
      lead: lead,
      usuarioCreador: currentUser["user_id"],
      usuarioActualizador: currentUser["user_id"],
    };
    try {
      const result = await createWhatsapp(formatData, authTokens["access"]);
      onLoadDataRfresh();
    } catch (error) {
      const pilaError = combinarErrores(error);
      alert(pilaError);
    }
  };

  return (
    <div className="w-1/2 py-3 px-2">
      <div className="rounded-lg shadow-md">
        <div className="bg-green-500 rounded-t-lg p-4 text-white mb-4">
          <div className="flex items-center">
            <FaWhatsapp className="mr-2" />
            <h2 className="text-lg font-bold">{`Whatsapp (${dataWhatsapp.length})`}</h2>
          </div>
        </div>
        <div className="bg-white rounded-b-lg px-3 flex justify-center items-center flex-col">
          {/* Contenido de la primera columna */}
          {dataWhatsapp.length !== 0 ? (
            <TableContainer
              sx={{ minWidth: 100, maxWidth: 600 }}
              arial-aria-labelledby="customized table"
            >
              <Table stickyHeader>
                <TableHead sx={{ background: "black" }}>
                  <TableRow
                    sx={{
                      "& th": {
                        color: "rgba(0,0,0)",
                        backgroundColor: "#c8e3c5",
                        fontWeight: "bold",
                      },
                    }}
                  >
                    <TableCell align="left">#</TableCell>
                    <TableCell align="left">Detalle</TableCell>
                    <TableCell align="left">Fec. Creación</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataWhatsapp.map((element, index) => (
                    <TableRow
                      key={index}
                      onClick={() => handleSelectDetalle(element)}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{element["detalle"]}</TableCell>
                      <TableCell>{element["fecha_creacion"]}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <p>No hay registros</p>
          )}
          <DialogRegistrarMensajeWhatsapp
            onCreateRegistroWhatsapp={crearRegistroWhatsapp}
          />
          {itemSelected !== null && (
            <DialogDetalleMensajeWhatsapp
              open={openDialogDetalle}
              element={itemSelected}
              handleClose={handleCloseDetalle}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const DialogRegistrarMensajeWhatsapp = ({ onCreateRegistroWhatsapp }) => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [inputValue, setinputValue] = React.useState("");
  const handleInputValue = ({ target }) => {
    const { value, name } = target;
    setinputValue(value);
  };

  const crearRegistroWhatsapp = () => {
    if (inputValue.length === 0) {
      alert("Debe ingresar un detalle del mensaje");
    } else {
      const formatData = {
        detalle: inputValue,
      };
      onCreateRegistroWhatsapp(formatData);
    }
  };

  return (
    <div className="py-4">
      <button
        className="bg-green-500 text-white font-bold py-2 px-4 rounded mr-2"
        title="Salida Parcial"
        onClick={handleClickOpen}
      >
        Nuevo registro
      </button>
      <BootstrapDialog
        maxWidth={"lg"}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Registrar mensaje Whatsapp
        </DialogTitle>
        <DialogContent dividers>
          <div className="mb-3">
            <label htmlFor="detalle" className="form-label">
              Detalle:
            </label>
            <textarea
              id="detalle"
              className="form-control"
              value={inputValue}
              onChange={handleInputValue}
              style={{
                width: "100%",
                backgroundColor: "#fcf6f1", // Color de fondo verde muy claro
                border: "1px solid #a69482", // Borde verde claro
                borderRadius: "0.25rem", // Bordes ligeramente redondeados
                padding: "0.5rem", // Relleno interno
              }}
            ></textarea>
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="inherit" onClick={handleClose}>
            Cerrar
          </Button>
          <Button
            variant="contained"
            color="success"
            autoFocus
            onClick={() => {
              // registramos un nuevo mensaje
              crearRegistroWhatsapp();
              // cerramos el cuadro de dialogo
              handleClose();
            }}
          >
            Aceptar
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
};

const DialogDetalleMensajeWhatsapp = ({ element, open, handleClose }) => {
  return (
    <BootstrapDialog
      maxWidth={"lg"}
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Detalle mensaje Whatsapp
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Detalle:
            </Typography>
            <Typography>{element["detalle"]}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Fecha de creación:
            </Typography>
            <Typography>{element["fecha_creacion"]}</Typography>
          </Grid>
          {/* Agrega más campos de propiedad según sea necesario */}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="inherit" onClick={handleClose}>
          Cerrar
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};
