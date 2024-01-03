import React, { useContext, useEffect, useReducer, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./../components/calendar.css";
import moment from "moment";
import { CustomToolbar, CustomEvent, CustomEventWrapper } from "../components";
import { DialogForm } from "../components/DialogForm";
import { DialogDetail } from "../components/DialogDetail";
import { getEvents } from "../helpers/eventCases";
import { getTipoEventos } from "../helpers/typeEventCases";
import { CustomCircularProgress } from "../../../components";
import {
  Button,
  Checkbox,
  Drawer,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import { transformToEvent } from "../utils/util";
import { AuthContext } from "../../../auth";

const localizer = momentLocalizer(moment);

function reducer(state, action) {
  switch (action.type) {
    case "create_state": {
      return {
        createState: true,
        selectState: false,
        loadState: false,
        filterState: false,
      };
    }
    case "update_state": {
      return {
        createState: false,
        selectState: true,
        loadState: false,
        filterState: false,
      };
    }
    case "base_state": {
      return {
        createState: false,
        selectState: false,
        loadState: false,
        filterState: false,
      };
    }
    case "loading_state": {
      return {
        createEvent: false,
        selectState: false,
        loadState: true,
        filterState: false,
      };
    }
    case "filter_state": {
      return {
        createState: false,
        selectState: false,
        loadState: false,
        filterState: true,
      };
    }
  }
}

const initialState = {
  createState: false,
  selectState: false,
  loadState: true,
};

export const CalendarView = () => {
  const { authTokens } = useContext(AuthContext);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [flagLoader, setFlagLoader] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [typeEvents, setTypeEvents] = useState([]);
  const [originalEvents, setOriginalEvents] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [tempFilters, setTempFilters] = useState({});

  // temporary viewr

  const handleTempFilters = (event) => {
    const { name, checked } = event.target;
    const updatedFilters = {
      ...tempFilters,
      [name]: checked,
    };
    setTempFilters(updatedFilters);
  };


  const applyFilters = () => {
    const filtered = originalEvents.filter(
      (event) => tempFilters[event.tipo.nombre]
    );
    setCalendarEvents(filtered);
    setSelectedFilters(tempFilters);
  };

  const getCalendarData = async (authTokens) => {
    try {
      const events = await getEvents(authTokens);
      const typeEvents = await getTipoEventos();


      if (Object.keys(selectedFilters).length === 0) {
        const initialFilters = {};
        typeEvents.forEach((typeEvent) => {
          initialFilters[typeEvent.nombre] = true;
        });
        setSelectedFilters(initialFilters);
      }
      setTypeEvents(typeEvents);
      const transformedEvents = events.map((item) => transformToEvent(item));
      // Aplicar filtros si existen antes de actualizar los eventos
      if (Object.keys(selectedFilters).length > 0) {
        const filteredEvents = transformedEvents.filter(
          (event) => selectedFilters[event.tipo.nombre]
        );
        setCalendarEvents(filteredEvents);
      } else {
        setCalendarEvents(transformedEvents);
      }

      setOriginalEvents(transformedEvents);
      dispatch({ type: "base_state" });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    getCalendarData(authTokens.access);
    return () => controller.abort();
  }, [flagLoader]);

  return (
    <React.Fragment>
      <div className="flex flex-col gap-y-3">
        <div className="flex justify-between">
          <Button
            variant="contained"
            color="inherit"
            sx={{ textTransform: "capitalize", borderRadius: "0px" }}
            onClick={() => dispatch({ type: "create_state" })}
          >
            Crear
          </Button>

          <Button
            variant="contained"
            color="inherit"
            sx={{ textTransform: "capitalize", borderRadius: "0px" }}
            onClick={() => {
              setTempFilters({ ...selectedFilters });
              dispatch({ type: "filter_state" });
            }}
          >
            Filtrar eventos
          </Button>
        </div>

        <Drawer
          anchor="right"
          open={state.filterState}
          className="z-20"
          onClose={() => {
            setTempFilters(selectedFilters);
            dispatch({ type: "base_state" });
          }}
        >
          {/** HECHO CON TAILWIND CSS */}
          <div className="flex flex-col gap-y-2 h-full justify-between">
            <div className="bg-[#282828]">
              <h2 className=" text-white py-8 px-4 font-bold">Filtrar por:</h2>
            </div>
            <div className="overflow-auto flex-1">
              <List
                sx={{
                  paddingX: "1rem",
                }}
              >
                {typeEvents.map((type) => (
                  <ListItem key={type.id} disablePadding>
                    <ListItemText
                      primary={type.nombre}
                      sx={{
                        textTransform: "capitalize",
                      }}
                    />
                    <ListItemSecondaryAction>
                      <Checkbox
                        edge="end"
                        onChange={handleTempFilters}
                        checked={tempFilters[type.nombre] || false}
                        inputProps={{ name: type.nombre }}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </div>

            <div className="flex gap-x-2 px-4 py-4 bg-dark-purple justify-center">
              <Button
                variant="contained"
                color="inherit"
                sx={{
                  textTransform: "capitalize",
                  width: "100%",
                  borderRadius: "0px",
                }}
                size="small"
                onClick={() => {
                  applyFilters();
                  setFlagLoader((prev) => !prev);
                  dispatch({ type: "loading_state" });
                }}
              >
                Filtrar
              </Button>
            </div>
          </div>
        </Drawer>

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
              <CustomEventWrapper
                {...props}
                onSelectEvent={(event) => {
                  dispatch({ type: "update_state" });
                  setSelectedEvent(event);
                }}
              />
            ),
            event: CustomEvent,
            toolbar: CustomToolbar,
          }}
        />

        {state.selectState && (
          <DialogDetail
            selectedEvent={selectedEvent}
            onClose={() => {
              dispatch({ type: "base_state" });
              setSelectedEvent(null);
            }}
            isOpen={state.selectState}
          />
        )}

        {state.createState && (
          <DialogForm
            typeEvents={typeEvents}
            onClose={() => {
              dispatch({ type: "loading_state" });
              setFlagLoader((prev) => !prev);
            }}
            isOpen={state.createState}
          />
        )}
      </div>
      {state.loadState && <CustomCircularProgress />}
    </React.Fragment>
  );
};
