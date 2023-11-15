import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./../components/calendar.css";
import moment from "moment";
import { CustomToolbar, CustomEvent, CustomEventWrapper } from "../components";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Checkbox,
} from "@mui/material";
import { DialogForm } from "../components/DialogForm";

const localizer = momentLocalizer(moment);

const taskCategories = [
  { id: "visita", text: "Visita", color: "red" },
  { id: "llamda", text: "Llamada", color: "green" },
  { id: "firma", text: "Firma del Contrato", color: "blue" },
];

const events = [
  {
    id: 1,
    title: "Evento 1",
    start: new Date(2023, 9, 27, 10, 0), // Año, mes, día, hora, minuto
    end: new Date(2023, 9, 27, 12, 0),
    category: { id: "visita", text: "Visita", color: "red" },
    description: "Descripción 00",
  },
  {
    id: 2,
    title: "Evento 2",
    start: new Date(2023, 9, 28, 13, 0), // Año, mes, día, hora, minuto
    end: new Date(2023, 9, 28, 14, 0),
    category: { id: "llamda", text: "Llamada", color: "green" },
    description: "Descripción 11",
  },
  {
    id: 3,
    title: "Evento 3",
    start: new Date(2023, 9, 29, 14, 0), // Año, mes, día, hora, minuto
    end: new Date(2023, 9, 29, 15, 0),
    category: { id: "firma", text: "Firma del Contrato", color: "blue" },
    description: "Descripción 22",
  },
  // Agrega más eventos aquí
];

export const CalendarView = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEditing, setEditing] = useState(false);
  const [updatedEvent, setUpdatedEvent] = useState({
    title: "",
    end: new Date(),
    start: new Date(),
    description: "",
    category: "",
  });

  const [createEvent, setCreateEvent] = useState(false);

  const handleSelectEvent = (eventSelected) => {
    setSelectedEvent(eventSelected);
    setUpdatedEvent(eventSelected);
    setEditing(false);
  };

  const handleUpdateEvent = () => {
    // Aquí puedes manejar la lógica para actualizar el evento con la información de updatedEvent
    // Por ejemplo, puedes enviar una solicitud al servidor para guardar los cambios.
    console.log("Evento actualizado:", updatedEvent);
  };

  return (
    <div>
      <button onClick={() => setCreateEvent(true)}>Crear</button>

      <Calendar
        culture="es"
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        views={["month", "week"]}
        components={{
          eventWrapper: (props) => (
            <CustomEventWrapper {...props} onSelectEvent={handleSelectEvent} />
          ),
          event: CustomEvent,
          toolbar: CustomToolbar,
        }}
      />

      {/*
      <Dialog
        open={selectedEvent !== null}
        onClose={() => setSelectedEvent(null)}
      >
        <DialogTitle>
          <input
            className="font-bold py-2 px-1"
            type="text"
            disabled={!isEditing}
            value={selectedEvent?.title}
          />
        </DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <div>
            <p>Categoría:</p>
            <div>
              {taskCategories.map((item, index) => {
                const checked = selectedEvent?.category.id === item.id;
                return (
                  <input
                    type="radio"
                    key={index}
                    checked={checked}
                    disabled={!isEditing}
                    className={`bg-${item.color}-500`}
                  />
                );
              })}
            </div>
          </div>
          <textarea
            className=""
            value={updatedEvent?.description}
            disabled={!isEditing}
          />
          <p>
            Inicio:{" "}
            {moment(selectedEvent?.start).format("ddd DD MMM YYYY / hh:mm A")}
          </p>
          <p>
            Fin:{" "}
            {moment(selectedEvent?.end).format("ddd DD MMM YYYY / hh:mm A")}
          </p>
        </DialogContent>
        <DialogActions>
          {isEditing ? (
            <React.Fragment>
              <button onClick={handleUpdateEvent} color="primary">
                Guardar
              </button>
              <button onClick={() => setEditing(false)}>Cancelar</button>
            </React.Fragment>
          ) : (
            <button onClick={() => setEditing(true)} color="primary">
              Editar
            </button>
          )}
          <button
            onClick={() => {
              setSelectedEvent(null);
              setEditing(false);
            }}
          >
            Cerrar
          </button>
        </DialogActions>
      </Dialog>
      */}

      <DialogForm
        categories={taskCategories}
        onClose={() => setCreateEvent(false)}
        isOpen={createEvent}
        onSave={() => {}}
      />
    </div>
  );
};
