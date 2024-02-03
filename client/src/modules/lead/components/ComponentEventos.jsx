import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { DialogForm } from "../../ventas/components/DialogForm";
import { AuthContext } from "../../../auth";
import { MdEvent } from "react-icons/md";
import { getEvents, updateEvent } from "../../ventas/helpers/eventCases";
import {
  combinarErrores,
  formatDate_ISO861_to_formatdate,
  obtenerHoraActualFormatPostgress,
} from "../../../utils";
import { DialogDetailEvento } from "../../ventas/components/DialogDetailEvento";

/**
 *
 * @param {Object} lead
 * @param {Array} dataEventos
 * @param {Function} onCreateDataEvento
 * @param {Function} onUpdateDataEvento
 * @returns
 */
const ComponentEventos = ({
  lead,
  dataEventos,
  onCreateDataEvento,
  onUpdateDataEvento,
}) => {
  const { currentUser, authTokens } = useContext(AuthContext);
  const [showDialogForm, setShowDialogForm] = useState(false);
  const [showDialogDetail, setShowDialogDetail] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleSelectEvent = (event) => {
    setShowDialogDetail(true);
    setSelectedEvent(event);
  };

  const handleCloseDialogDetail = () => {
    setShowDialogDetail(false);
    setSelectedEvent(null);
  };

  const createRegistroEvento = (body) => {
    const formatData = {
      ...body,
      lead: parseInt(lead.id),
      usuarioCreador: currentUser["user_id"],
    };
    onCreateDataEvento(formatData);
  };

  const actualizarRegistroEvento = (id, body) => {
    const formatData = {
      ...body,
      usuarioActualizador: currentUser["user_id"],
      fecha_actualizacion: obtenerHoraActualFormatPostgress(),
    };
    onUpdateDataEvento(id, formatData);
  };

  return (
    <React.Fragment>
      <Card sx={{ minHeight: "200px", marginY: "1rem" }}>
        <CardHeader
          sx={{
            backgroundColor: "yellow",
            fontWeight: "bold",
            height: "4rem", // Agrega esta línea para aumentar la altura del encabezado
            "& .MuiCardHeader-title": {
              fontSize: "1.125rem",
              fontWeight: "bold",
              lineHeight: "1.75rem",
            },
            "& .MuiSvgIcon-root": {
              fontWeight: "bold",
            },
          }}
          title={`Eventos (${dataEventos.length})`}
          avatar={<MdEvent size="1.4rem" />}
        />
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "center",
            minHeight: "200px",
          }}
        >
          {dataEventos.length > 0 ? (
            <TableContainer>
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
                    <TableCell>N°</TableCell>
                    <TableCell>Evento</TableCell>
                    <TableCell>Separado</TableCell>
                    <TableCell>Asesor</TableCell>
                    <TableCell>Fecha</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataEventos.map((element, index) => (
                    <TableRow
                      key={element.id}
                      onClick={() => handleSelectEvent(element)}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{element.titulo}</TableCell>
                      <TableCell>{element.separado ? "Sí" : "No"}</TableCell>
                      <TableCell>{`${lead.asesor.first_name} ${lead.asesor.last_name}`}</TableCell>
                      <TableCell>{formatDate_ISO861_to_formatdate(element.fecha_visita)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography>No hay registros</Typography>
          )}
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="success"
            sx={{ textTransform: "capitalize", marginX: "auto" }}
            onClick={() => setShowDialogForm(true)}
          >
            Crear Evento
          </Button>
        </CardActions>
      </Card>
      {showDialogForm && (
        <DialogForm
          isOpen={showDialogForm}
          onClose={() => setShowDialogForm(false)}
          onCreateRegistroEvento={createRegistroEvento}
        />
      )}

      {showDialogDetail && (
        <DialogDetailEvento
          isOpen={showDialogDetail}
          selectedEvent={transformToEvent(selectedEvent)}
          onClose={handleCloseDialogDetail}
          onUpdateEvent={actualizarRegistroEvento}
          showLead={false}
        />
      )}
    </React.Fragment>
  );
};

/**
 *
 * @param {*} oldEvent
 * @returns event in calendar_view
 */
const transformToEvent = (oldEvent) => {
  const startEvent = new Date(oldEvent.fecha_visita);
  const durationMilliseconds = oldEvent.duracion * 60000;
  const endEvent = new Date(startEvent.getTime() + durationMilliseconds);
  return {
    id: oldEvent.id,
    separado: oldEvent.separado,
    title: oldEvent.titulo,
    lead: oldEvent.lead,
    start: startEvent,
    end: endEvent,
    duracion: oldEvent.duracion,
    tipo: oldEvent.tipo.id,
    estadoEvento: oldEvent.estadoEvento.id,
    observacion: oldEvent.observacion,
  };
};

export default ComponentEventos;
