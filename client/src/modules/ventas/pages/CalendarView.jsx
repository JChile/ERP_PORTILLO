import React, { useEffect, useReducer, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./../components/calendar.css";
import moment from "moment";
import { CustomToolbar, CustomEvent, CustomEventWrapper } from "../components";
import { DialogForm } from "../components/DialogForm";
import { DialogDetail } from "../components/DialogDetail";
import { createEvent, getEvents } from "../helpers/eventCases";
import { getTipoEventos } from "../helpers/typeEventCases";
import { CustomCircularProgress } from "../../../components";

const localizer = momentLocalizer(moment);

const taskCategories = [
  { id: "visita", text: "visita", color: "red" },
  { id: "llamada", text: "llamada", color: "green" },
  { id: "firma", text: "firma", color: "blue" },
];

function reducer(state, action) {
  switch (action.type) {
    case "create_state": {
      return {
        createState: true,
        selectState: false,
        loadState: false,
      };
    }
    case "update_state": {
      return {
        createState: false,
        selectState: true,
        loadState: false,
      };
    }
    case "base_state": {
      return {
        createState: false,
        selectState: false,
        loadState: false,
      };
    }
    case "loading_state": {
      return {
        createEvent: false,
        selectState: false,
        loadState: true,
      };
    }
  }
}

const initialState = {
  createState: false,
  selectState: false,
  loadState: true,
};

const transformToEvent = (oldEvent) => {
  const startEvent = new Date(oldEvent.fecha_visita);
  const durationMilliseconds = oldEvent.duracion * 60000;
  const endEvent = new Date(startEvent.getTime() + durationMilliseconds);
  return {
    title: oldEvent.titulo,
    start: startEvent,
    end: endEvent,
    proyecto: oldEvent.proyecto,
    tipo: oldEvent.tipo,
    descripcion: oldEvent.descripcion,
    estado: oldEvent.estado,
    ubicacion: oldEvent.ubicacion,
    id: oldEvent.id,
    asesor: oldEvent.asesor,
    duracion: oldEvent.duracion,
  };
};

export const CalendarView = () => {

  const [state, dispatch] = useReducer(reducer, initialState);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [typeEvents, setTypeEvents] = useState([]);

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

  const getCalendarData = async () => {
    try {
      const events = await getEvents();
      const typeEvents = await getTipoEventos();
      setTypeEvents(typeEvents);
      setCalendarEvents(events.map((item) => transformToEvent(item)));
      dispatch({ type: "base_state" });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    getCalendarData();
    return () => controller.abort();
  }, []);

  return (
    <React.Fragment>
    <div className="flex flex-col gap-y-3">
      <div className="flex justify-between">
        <button
          className="hover:shadow-xl hover:bg-slate-300 px-2 py-2 shadow-black border rounded w-20 text-xm"
          onClick={() => dispatch({ type: "create_state" })}
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
        events={calendarEvents}
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

      {state.selectState && (
        <DialogDetail
          selectedEvent={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          isOpen={state.selectState}
        />
      )}

      {state.createState && (
        <DialogForm
          typeEvents={typeEvents}
          onClose={() => dispatch({ type: "loading_state" })}
          isOpen={state.createState}
        />
      )}
    </div>
    { state.loadState && <CustomCircularProgress /> }
    </React.Fragment>
  );
};
