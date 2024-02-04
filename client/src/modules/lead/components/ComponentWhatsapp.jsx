import {
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { AuthContext } from "../../../auth";
import {
  formatDate_ISO861_to_formatdate,
  obtenerHoraActualFormatPostgress,
} from "../../../utils";
import { CustomTextArea, FilterObjecion } from "../../../components";
import { FiEdit, FiSave, FiX } from "react-icons/fi";

const ITEM_HEIGHT = 48;
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export const ComponentWhatsapp = ({
  lead,
  dataWhatsapp,
  onUpdateDataWhatsapp,
  onCreateDataWhatsapp,
}) => {
  const [itemSelected, setItemSelected] = useState(null);
  const [openDialogDetalle, setOpenDialogDetalle] = useState(false);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (itemSelected !== null) {
      const findElement = dataWhatsapp.find(
        (element) => element.id == itemSelected.id
      );
      setItemSelected(findElement);
    }
  }, [dataWhatsapp]);

  const handleSelectDetalle = (element) => {
    setItemSelected(element);
    setOpenDialogDetalle(true);
  };

  const handleCloseDetalle = () => {
    setItemSelected(null);
    setOpenDialogDetalle(false);
  };

  // crear registro de whatsapp
  const crearRegistroWhatsapp = async (body) => {
    const formatData = {
      ...body,
      lead: lead,
      usuarioCreador: currentUser["user_id"],
    };
    onCreateDataWhatsapp(formatData);
  };

  // actualizar registro de whatsapp
  const actualizarRegistroWhatsapp = (id, body) => {
    const formatData = {
      ...body,
      usuarioActualizador: currentUser["user_id"],
      fecha_actualizacion: obtenerHoraActualFormatPostgress(),
    };
    onUpdateDataWhatsapp(id, formatData);
  };

  return (
    <React.Fragment>
      <Card sx={{ minHeight: "200px", marginY: "2em" }}>
        <CardHeader
          sx={{
            backgroundColor: "rgb(34 197 94)",
            fontWeight: "bold",
            height: "4rem", // Agrega esta línea para aumentar la altura del encabezado
            color: "white",
            "& .MuiCardHeader-title": {
              fontSize: "1.125rem",
              fontWeight: "bold",
              lineHeight: "1.75rem",
            },
            "& .MuiSvgIcon-root": {
              fontWeight: "bold",
            },
          }}
          title={`Whatsapp (${dataWhatsapp.length})`}
          avatar={<FaWhatsapp size="1.4rem" />}
        />

        <CardContent
          sx={{ display: "flex", justifyContent: "center", minHeight: "200px" }}
        >
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
                      <TableCell>
                        {formatDate_ISO861_to_formatdate(
                          element["fecha_creacion"]
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <p>No hay registros</p>
          )}
        </CardContent>
        <div className="bg-white rounded-b-lg px-3 flex justify-center items-center flex-col">
          <DialogRegistrarMensajeWhatsapp
            onCreateRegistroWhatsapp={crearRegistroWhatsapp}
          />
          {itemSelected !== null && (
            <DialogDetalleMensajeWhatsapp
              open={openDialogDetalle}
              element={itemSelected}
              handleClose={handleCloseDetalle}
              onUpdateDataWhatsapp={actualizarRegistroWhatsapp}
            />
          )}
        </div>
      </Card>
    </React.Fragment>
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
  const [dataWhatsapp, setDataWhatsapp] = useState({
    detalle: "",
    respondio: false,
    objecion: null,
  });

  const { detalle, respondio, objecion } = dataWhatsapp;

  const handleInputValue = ({ target }) => {
    const { value, name } = target;
    setDataWhatsapp({
      ...dataWhatsapp,
      [name]: value,
    });
  };

  const handleChangeCheckBoxRespondio = (event) => {
    setDataWhatsapp({
      ...dataWhatsapp,
      respondio: event.target.checked,
    });
  };

  const onAddObjecion = (value) => {
    const { id } = value;
    setDataWhatsapp({
      ...dataWhatsapp,
      objecion: id,
    });
  };

  const resetFields = () => {
    setDataWhatsapp({
      detalle: "",
      respondio: false,
      objecion: null,
    });
  };

  const crearRegistroWhatsapp = () => {
    let handleErrors = "";
    if (detalle.length === 0 || objecion === null) {
      if (detalle.length === 0) {
        handleErrors += "Debe ingresar un detalle del mensaje\n";
      }
      if (objecion === null) {
        handleErrors += "Debe ingresar una objeción\n";
      }
      alert(handleErrors);
    } else {
      onCreateRegistroWhatsapp(dataWhatsapp);
    }
  };

  return (
    <div className="py-4">
      <Button
        className="bg-green-500 text-white font-bold py-2 px-4 rounded mr-2"
        title="Salida Parcial"
        color="success"
        variant="contained"
        sx={{ textTransform: "capitalize" }}
        onClick={handleClickOpen}
      >
        Nuevo registro
      </Button>
      <BootstrapDialog
        maxWidth={"xs"}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Registrar mensaje Whatsapp
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            {/* RESPONDIÓ */}
            <Grid item xs={10}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                Respondió:
              </Typography>
              <Checkbox
                checked={respondio}
                onChange={handleChangeCheckBoxRespondio}
                inputProps={{ "aria-label": "controlled" }}
              />
            </Grid>
            {/* DETALLE */}
            <Grid item xs={10}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                Detalle:
              </Typography>
              <CustomTextArea
                value={detalle}
                name="detalle"
                onChangeValue={handleInputValue}
              />
            </Grid>
            {/* OBJECION */}
            <Grid item xs={10}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                Objeción:
              </Typography>
              <FilterObjecion
                defaultValue={objecion}
                onNewInput={onAddObjecion}
              />
            </Grid>
          </Grid>
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
              // reset fields
              resetFields();
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

const DialogDetalleMensajeWhatsapp = ({
  element,
  open,
  handleClose,
  onUpdateDataWhatsapp,
}) => {
  const [dataAuxtMensajeWhatsapp, setDataAuxMensajeWhatsapp] =
    useState(element);

  useEffect(() => {
    parserDataElement();
  }, [element]);

  const parserDataElement = () => {
    setDataAuxMensajeWhatsapp(element);
  };

  const {
    id,
    detalle,
    respondio,
    objecion,
    fecha_creacion,
    fecha_actualizacion,
  } = dataAuxtMensajeWhatsapp;

  const [editData, setEditData] = useState(true);

  // handle change value
  const handledChangeValue = ({ target }) => {
    const { value, name } = target;
    setDataAuxMensajeWhatsapp({
      ...dataAuxtMensajeWhatsapp,
      [name]: value,
    });
  };

  // handle checkbox
  const handleCheckBox = (event) => {
    setDataAuxMensajeWhatsapp({
      ...dataAuxtMensajeWhatsapp,
      respondio: event.target.checked,
    });
  };

  // cambiar objecion
  const handleChangeObjecion = (value) => {
    const { id } = value;
    setDataAuxMensajeWhatsapp({
      ...dataAuxtMensajeWhatsapp,
      objecion: id,
    });
  };

  // guardar data
  const onSaveChanges = () => {
    onUpdateDataWhatsapp(id, dataAuxtMensajeWhatsapp);
    setEditData(true);
  };

  // cancelar guardado
  const onCancelChanges = () => {
    parserDataElement();
    setEditData(true);
  };

  return (
    <BootstrapDialog
      maxWidth={"xs"}
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        id="customized-dialog-title"
      >
        Detalle mensaje Whatsapp
        {editData ? (
          <IconButton
            onClick={() => {
              setEditData(!editData);
            }}
          >
            <FiEdit />
          </IconButton>
        ) : (
          <div>
            <IconButton color="success" onClick={onSaveChanges}>
              <FiSave />
            </IconButton>
            <IconButton color="error" onClick={onCancelChanges}>
              <FiX />
            </IconButton>
          </div>
        )}
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          {/* RESPONDIÓ */}
          <Grid item xs={10}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Respondió:
            </Typography>
            <Checkbox
              checked={respondio}
              disabled={editData}
              onChange={handleCheckBox}
              inputProps={{ "aria-label": "controlled" }}
            />
          </Grid>
          {/* DETALLE */}
          <Grid item xs={10}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Detalle:
            </Typography>
            <CustomTextArea
              value={detalle}
              name="detalle"
              onChangeValue={handledChangeValue}
              active={editData}
            />
          </Grid>
          {/* OBJECION */}
          <Grid item xs={10}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Objeción:
            </Typography>
            <FilterObjecion
              defaultValue={objecion}
              onNewInput={handleChangeObjecion}
              active={editData}
            />
          </Grid>
          {/* FECHA DE CREACION */}
          <Grid item xs={10}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Fecha de creación:
            </Typography>
            <Typography>
              {formatDate_ISO861_to_formatdate(fecha_creacion)}
            </Typography>
          </Grid>
          {/* FECHA DE ACTULIZACION */}
          <Grid item xs={10}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Fecha de actualización:
            </Typography>
            {fecha_actualizacion ? (
              <Typography>
                {formatDate_ISO861_to_formatdate(fecha_actualizacion)}
              </Typography>
            ) : (
              <Typography>No actualizado</Typography>
            )}
          </Grid>
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
