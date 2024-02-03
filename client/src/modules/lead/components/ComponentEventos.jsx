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
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { DialogForm } from "../../ventas/components/DialogForm";
import { AuthContext } from "../../../auth";
import { MdEvent } from "react-icons/md";
import { getEvents, updateEvent } from "../../ventas/helpers/eventCases";
import {
  combinarErrores,
  obtenerHoraActualFormatPostgress,
} from "../../../utils";
import { DialogDetailEvento } from "../../ventas/components/DialogDetailEvento";

const ComponentEventos = ({ lead }) => {
  const { currentUser, authTokens } = useContext(AuthContext);
  const [showDialogForm, setShowDialogForm] = useState(false);
  const [showDialogDetail, setShowDialogDetail] = useState(false);
  const [eventosData, setEventosData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const traerEventos = async () => {
    try {
      const response = await getEvents(authTokens["access"]);
      setLoading(false);
      setEventosData(response);
    } catch (error) {
      const errores = combinarErrores(error);
    }
  };

  const handleSelectEvent = (event) => {
    setShowDialogDetail(true);
    setSelectedEvent(event);
  };

  const updateEventSelected = async (id, event) => {
    const dataToSave = {
      ...event,
      fecha_actualizacion: obtenerHoraActualFormatPostgress(),
    };
    try {
      const response = await updateEvent(id, dataToSave, authTokens["access"]);
    } catch (error) {
      const errores = combinarErrores(error);
    }
  };

  useEffect(() => {
    traerEventos();
  }, []);

  return (
    <React.Fragment>
      <Card sx={{ width: "60%", minHeight: "200px", marginY: "1rem" }}>
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
          title={`Eventos (${eventosData.length})`}
          avatar={<MdEvent size="1.4rem" />}
        />
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "200px",
          }}
        >
          {loading ? (
            <Box>
              <CircularProgress />
            </Box>
          ) : (
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
                  {eventosData.map((element, index) => (
                    <TableRow
                      key={element.id}
                      onClick={() => handleSelectEvent(element)}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{element.titulo}</TableCell>
                      <TableCell>{element.separado ? "Sí" : "No"}</TableCell>
                      <TableCell>{element.asesor.first_name}</TableCell>
                      <TableCell>{element.fecha_visita}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
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
          lead={lead}
          token={authTokens["access"]}
          user={currentUser.user_id}
        />
      )}

      {showDialogDetail && (
        <DialogDetailEvento
          isOpen={showDialogDetail}
          onClose={() => setShowDialogDetail(false)}
          selectedEvent={transformToEvent(selectedEvent)}
          onUpdateEvent={updateEventSelected}
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
