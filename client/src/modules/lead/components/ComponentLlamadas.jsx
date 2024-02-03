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
import { FaPhone } from "react-icons/fa";
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

export const ComponentLlamadas = ({
  lead,
  dataLlamada,
  onUpdatedataLlamada,
  onCreatedataLlamada,
}) => {
  const [itemSelected, setItemSelected] = useState(null);
  const [openDialogDetalle, setOpenDialogDetalle] = useState(false);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (itemSelected !== null) {
      const findElement = dataLlamada.find(
        (element) => element.id == itemSelected.id
      );
      setItemSelected(findElement);
    }
  }, [dataLlamada]);

  const handleSelectDetalle = (element) => {
    setItemSelected(element);
    setOpenDialogDetalle(true);
  };

  const handleCloseDetalle = () => {
    setItemSelected(null);
    setOpenDialogDetalle(false);
  };

  // crear registro de llamada
  const crearRegistroLlamada = async (body) => {
    const formatData = {
      ...body,
      lead: lead,
      usuarioCreador: currentUser["user_id"],
    };
    onCreatedataLlamada(formatData);
  };

  // actualizar registro de llamada
  const actualizarRegistroLlamada = (id, body) => {
    const formatData = {
      ...body,
      usuarioActualizador: currentUser["user_id"],
      fecha_actualizacion: obtenerHoraActualFormatPostgress(),
    };
    onUpdatedataLlamada(id, formatData);
  };

  return (
    <React.Fragment>
      <Card sx={{ minHeight: "200px", marginY: "1rem" }}>
        <CardHeader
          sx={{
            backgroundColor: "rgb(59 130 246)",
            fontWeight: "bold",
            height: "4rem",
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
          title={`Llamada (${dataLlamada.length})`}
          avatar={<FaPhone />}
        />
        <CardContent
          sx={{ display: "flex", justifyContent: "center", minHeight: "200px" }}
        >
          {/* Contenido de la primera columna */}
          {dataLlamada.length !== 0 ? (
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
                  {dataLlamada.map((element, index) => (
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
        </CardContent>
        <div className="bg-white rounded-b-lg px-3 flex justify-center items-center flex-col">
          <DialogRegistrarLlamada
            onCreateRegistroLlamada={crearRegistroLlamada}
          />
          {itemSelected !== null && (
            <DialogDetalleLlamada
              open={openDialogDetalle}
              element={itemSelected}
              handleClose={handleCloseDetalle}
              onUpdatedataLlamada={actualizarRegistroLlamada}
            />
          )}
        </div>
      </Card>
    </React.Fragment>
  );
};

const DialogRegistrarLlamada = ({ onCreateRegistroLlamada }) => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [dataLlamada, setdataLlamada] = useState({
    detalle: "",
    contesto: false,
    objecion: null,
  });

  const { detalle, contesto, objecion } = dataLlamada;

  const handleInputValue = ({ target }) => {
    const { value, name } = target;
    setdataLlamada({
      ...dataLlamada,
      [name]: value,
    });
  };

  const handleChangeCheckBoxcontesto = (event) => {
    setdataLlamada({
      ...dataLlamada,
      contesto: event.target.checked,
    });
  };

  const onAddObjecion = (value) => {
    const { id } = value;
    setdataLlamada({
      ...dataLlamada,
      objecion: id,
    });
  };

  const resetFields = () => {
    setdataLlamada({
      detalle: "",
      contesto: false,
      objecion: null,
    });
  };

  const crearRegistroLlamada = () => {
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
      onCreateRegistroLlamada(dataLlamada);
    }
  };

  return (
    <div className="py-4">
      <Button
        title="Salida Parcial"
        onClick={handleClickOpen}
        variant="contained"
        sx={{ textTransform: "capitalize" }}
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
          Registrar Llamada
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={10}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                Contestó:
              </Typography>
              <Checkbox
                checked={contesto}
                onChange={handleChangeCheckBoxcontesto}
                inputProps={{ "aria-label": "controlled" }}
              />
            </Grid>
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
            color="primary"
            autoFocus
            onClick={() => {
              // registramos un nuevo mensaje
              crearRegistroLlamada();
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

const DialogDetalleLlamada = ({
  element,
  open,
  handleClose,
  onUpdatedataLlamada,
}) => {
  const [dataAuxLlamada, setDataAuxLlamada] = useState(element);

  useEffect(() => {
    parserDataElement();
  }, [element]);

  const parserDataElement = () => {
    setDataAuxLlamada(element);
  };

  const {
    id,
    detalle,
    contesto,
    objecion,
    fecha_creacion,
    fecha_actualizacion,
  } = dataAuxLlamada;

  const [editData, setEditData] = useState(true);

  // handle change value
  const handledChangeValue = ({ target }) => {
    const { value, name } = target;
    setDataAuxLlamada({
      ...dataAuxLlamada,
      [name]: value,
    });
  };

  // handle checkbox
  const handleCheckBox = (event) => {
    setDataAuxLlamada({
      ...dataAuxLlamada,
      contesto: event.target.checked,
    });
  };

  // cambiar objecion
  const handleChangeObjecion = (value) => {
    const { id } = value;
    setDataAuxLlamada({
      ...dataAuxLlamada,
      objecion: id,
    });
  };

  // guardar data
  const onSaveChanges = () => {
    onUpdatedataLlamada(id, dataAuxLlamada);
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
        Detalle Llamada
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
          {/* CONTESTÓ */}
          <Grid item xs={10}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Contestó:
            </Typography>
            <Checkbox
              checked={contesto}
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
