import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./../components/calendar.css";
import moment from "moment";
import { CustomToolbar, CustomEvent, CustomEventWrapper } from "../components";
import { DialogForm } from "../components/DialogForm";
import { DialogDetail } from "../components/DialogDetail";

const localizer = momentLocalizer(moment);

const events = [
  {
    id: 1,
    title: "Evento 1",
    start: new Date(2023, 9, 27, 10, 0), // Año, mes, día, hora, minuto
    end: new Date(2023, 9, 27, 12, 0),
    category: { id: "visita", text: "visita", color: "red" },
    description: "Descripción 00",
  },
  {
    id: 2,
    title: "Evento 2",
    start: new Date(2023, 9, 28, 13, 0), // Año, mes, día, hora, minuto
    end: new Date(2023, 9, 28, 14, 0),
    category: { id: "llamada", text: "llamada", color: "green" },
    description: "Descripción 11",
  },
  {
    id: 3,
    title: "Evento 3",
    start: new Date(2023, 9, 29, 14, 0), // Año, mes, día, hora, minuto
    end: new Date(2023, 9, 29, 15, 0),
    category: { id: "firma", text: "firma", color: "blue" },
    description: "Descripción 22",
  },
  // Agrega más eventos aquí
];

const taskCategories = [
  { id: "visita", text: "visita", color: "red" },
  { id: "llamada", text: "llamada", color: "green" },
  { id: "firma", text: "firma", color: "blue" },
];

export const CalendarView = () => {
  /** Dialog state events */
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [createEvent, setCreateEvent] = useState(false);
  /** Filter state events */
  const [calendarEvents, setCalendarEvents] = useState(events);
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [filterStates, setFilterStates] = useState({
    visita: true,
    firma: true,
    llamada: true,
  });

  const handleFilterChange = (event) => {
    const { name, checked } = event.target;
    setFilterStates({
      ...filterStates,
      [name]: checked,
    });
  };

  const applyFilters = () => {
    const filtered = calendarEvents.filter((event) => {
      if (filterStates[event.category.id]) return true;
      return false;
    });
    setFilteredEvents(filtered);
  };

  const handleSaveNewEvent = (formData) => {
    const calculateStart = new Date(`${formData.date}T${formData.startTime}`);
    const durationMs = formData.duration * 60000;
    const calculateEnd = new Date(calculateStart.getTime() + durationMs);

    const newEvent = {
      id: calendarEvents.length + 1,
      title: formData.title,
      start: calculateStart,
      end: calculateEnd,
      category: { id: formData.category, text: "Llamada", color: "green" },
      description: formData.description,
    };
    setCalendarEvents((prev) => [...prev, newEvent]);
  };

  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex justify-between">
        <button
          className="hover:shadow-xl hover:bg-slate-300 px-2 py-2 shadow-black border rounded w-20 text-xm"
          onClick={() => setCreateEvent(true)}
        >
          Crear
        </button>

        <button onClick={applyFilters} className="bg-slate-300">
          Limitar a
        </button>

        <div className="flex gap-x-2">
          {taskCategories.map((category) => {
            return (
              <label
                key={category.id}
                htmlFor={`${category.id}Checkbox`}
                className={`flex gap-x-2 items-center h-7 px-2 justify-center rounded-md text-xs cursor-pointer`}
              >
                {category.text}
                <input
                  type="checkbox"
                  name={category.text}
                  id={`${category.id}Checkbox`}
                  checked={filterStates[category.id]}
                  onChange={(event) => handleFilterChange(event)}
                />
              </label>
            );
          })}
        </div>
      </div>

      <Calendar
        culture="es"
        localizer={localizer}
        events={filteredEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        views={["month", "week"]}
        components={{
          eventWrapper: (props) => (
            <CustomEventWrapper {...props} onSelectEvent={setSelectedEvent} />
          ),
          event: CustomEvent,
          toolbar: CustomToolbar,
        }}
      />

      {selectedEvent && (
        <DialogDetail
          selectedEvent={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          isOpen={selectedEvent !== null}
        />
      )}

      {createEvent && (
        <DialogForm
          categories={taskCategories}
          onClose={() => setCreateEvent(false)}
          isOpen={createEvent}
          onSave={handleSaveNewEvent}
        />
      )}
    </div>
  );
};
