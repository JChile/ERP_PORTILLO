import React, { useContext, useEffect, useReducer, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./../components/calendar.css";
import moment from "moment";
import { CustomToolbar, CustomEvent, CustomEventWrapper } from "../components";
import { DialogDetailEvento } from "../components/DialogDetailEvento";
import { getEvents, updateEvent } from "../helpers/eventCases";
import { getTipoEventos } from "../helpers/typeEventCases";
import { CustomCircularProgress, CustomDatePicker } from "../../../components";
import {
  Button,
  Checkbox,
  Drawer,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { AuthContext } from "../../../auth";
import { obtenerHoraActualFormatPostgress } from "../../../utils";
import { MdFilter, MdFilterAlt } from "react-icons/md";
import { useAlertMUI } from "../../../hooks";
import { getAsesorActivo } from "../../../components/filters/asesor/getAsesor";

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
  const { authTokens, currentUser } = useContext(AuthContext);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [flagLoader, setFlagLoader] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [typeEvents, setTypeEvents] = useState([]);
  const [originalEvents, setOriginalEvents] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [tempFilters, setTempFilters] = useState({});
  const [desdeValue, setDesdeValue] = useState(null);
  const [hastaValue, setHastaValue] = useState(null);

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
    const transformedEvents = filtered.map((item) => transformToEvent(item));
    setCalendarEvents(transformedEvents);
    setSelectedFilters(tempFilters);
  };

  const getCalendarData = async (authTokens) => {
    let query = "";
    if (desdeValue && hastaValue) {
      query = `desde=${desdeValue}T00:00:00&hasta=${hastaValue}T23:59:59`;
    }
    try {
      const events = await getEvents(authTokens, query);
      const typeEvents = await getTipoEventos();
      const asesores = await getAsesorActivo(authTokens);

      setOriginalEvents(events);
      setTypeEvents(typeEvents);
      const transformedEvents = events.map((item) => transformToEvent(item));
      if (Object.keys(selectedFilters).length === 0) {
        const initialFilters = {};
        typeEvents.forEach((typeEvent) => {
          initialFilters[typeEvent.nombre] = true;
        });
        setSelectedFilters(initialFilters);
        setCalendarEvents(transformedEvents);
      }

      if (Object.keys(selectedFilters).length > 0) {
        const filteredEvents = events.filter((e) => {
          return selectedFilters[e.tipo.nombre];
        });
        setCalendarEvents(filteredEvents.map((item) => transformToEvent(item)));
      }
      dispatch({ type: "base_state" });
    } catch (error) {
      console.error(error);
    }
  };

  const updateEventSelected = async (id, event) => {
    const dataToSave = {
      ...event,
      asesor: currentUser["user_id"],
      fecha_actualizacion: obtenerHoraActualFormatPostgress(),
    };
    const response = await updateEvent(id, dataToSave, authTokens["access"]);
  };

  const onChangeDatePickerFechaDesde = (newDate) => {
    setDesdeValue(newDate);
  };

  const onChangeDatePickerFechaHasta = (newDate) => {
    setHastaValue(newDate);
  };

  const onSubmitFilter = (event) => {
    setFlagLoader((prev) => !prev);
  };

  useEffect(() => {
    getCalendarData(authTokens.access);
  }, [flagLoader]);


  console.log(calendarEvents)

  return (
    <React.Fragment>
      <div className="flex flex-col gap-y-3">
        <Typography variant="h4">Eventos Registrados</Typography>
        <Typography variant="subtitle1">Filtro por fechas</Typography>
        <div className="w-fit flex flex-col sm:flex-row gap-y-4 gap-x-4">
          <CustomDatePicker
            label="Fecha Desde"
            onNewFecha={onChangeDatePickerFechaDesde}
            defaultValue={desdeValue}
          />
          <CustomDatePicker
            label="Fecha Hasta"
            onNewFecha={onChangeDatePickerFechaHasta}
            defaultValue={hastaValue}
          />

          <Button
            startIcon={<MdFilterAlt />}
            variant="contained"
            sx={{ textTransform: "capitalize", width: "11.4rem" }}
            onClick={onSubmitFilter}
          >
            Filtrar
          </Button>
        </div>
        <FormControl
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Button
            onClick={() => {
              setTempFilters({ ...selectedFilters });
              dispatch({ type: "filter_state" });
            }}
            variant="contained"
            color="inherit"
            sx={{ textTransform: "capitalize", borderRadius: "0px" }}
          >
            Filtrar eventos
          </Button>
        </FormControl>

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
          <DialogDetailEvento
            selectedEvent={selectedEvent}
            onClose={() => {
              setFlagLoader((prev) => !prev);
              setSelectedEvent(null);
            }}
            isOpen={state.selectState}
            onUpdateEvent={updateEventSelected}
          />
        )}
      </div>
      {state.loadState && <CustomCircularProgress />}
    </React.Fragment>
  );
};

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
    tipo: oldEvent.tipo,
    estadoEvento: oldEvent.estadoEvento.id,
    observacion: oldEvent.observacion,
    objecion: oldEvent.objecion,
    asesor: oldEvent.asesor,
  };
};
