import React, { useEffect, useState } from "react";
import { Button, Tab, Tabs, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ViewLeadsNoAsignados } from "./ViewLeadsNoAsignados";
import ViewLeadAsignados from "./ViewLeadAsignados";
import { MdClear, MdFilterAlt, MdFilterList } from "react-icons/md";
import { CustomDatePicker } from "../../../../components";

const ListJefeVentasLead = () => {
  // flag reload
  const [flagReload, setFlagReload] = useState(false);

  // filtros de fechas
  const [filterDate, setFilterDate] = useState({
    startDate: null,
    endDate: null,
  });
  const { startDate, endDate } = filterDate;

  // change flag
  const onSubmitFilter = (event) => {
    // cambiamos el flag de reload
    setFlagReload((prev) => !prev);
  };

  // funcion para cambiar fecha desde
  const onChangeDatePickerFechaDesde = (newDate) => {
    // actualizamos la fecha
    setFilterDate({
      ...filterDate,
      startDate: newDate,
    });
  };

  // funcion para cambiar fecha hasta
  const onChangeDatePickerFechaHasta = (newDate) => {
    // actualizamos la fecha
    setFilterDate({
      ...filterDate,
      endDate: newDate,
    });
  };

  // manejadores de tabs
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => setValue(newValue);

  return (
    <React.Fragment>
      <h1 className="font-semibold text-2xl mt-2">
        Gestion de leads - Administrador
      </h1>
      <div className="mt-6 flex flex-col gap-y-3">
        <div className="mt-2 flex justify-between">
          {/* Filtro de fechas */}
          <div className="flex gap-x-2">
            <CustomDatePicker
              defaultValue={startDate}
              onNewFecha={onChangeDatePickerFechaDesde}
              label="Fecha Desde"
            />
            <CustomDatePicker
              defaultValue={endDate}
              onNewFecha={onChangeDatePickerFechaHasta}
              label="Fecha Hasta"
            />
            <Button
              startIcon={<MdFilterAlt />}
              variant="contained"
              sx={{ textTransform: "capitalize" }}
              onClick={onSubmitFilter}
            >
              Filtrar
            </Button>
          </div>
        </div>
        <Tabs
          aria-label="basic tabs"
          value={value}
          onChange={handleChange}
          sx={{ marginTop: 3 }}
          centered
          variant="fullWidth"
        >
          <Tab
            sx={{
              textTransform: "capitalize",
              fontWeight: "semibold",
              color: "black",
              fontSize: "0.9rem",
            }}
            label="Leads asignados"
          />
          <Tab
            sx={{
              textTransform: "capitalize",
              fontWeight: "semibold",
              color: "black",
              fontSize: "0.9rem",
            }}
            label="Leads no asignados"
          />
        </Tabs>

        <CustomTabPanel value={value} index={0}>
          <ViewLeadAsignados
            startDate={startDate}
            endDate={endDate}
            flagReload={flagReload}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <ViewLeadsNoAsignados
            startDate={startDate}
            endDate={endDate}
            flagReload={flagReload}
          />
        </CustomTabPanel>
      </div>
    </React.Fragment>
  );
};

/**
 * Custom tab panel to use as tab wrapper.
 * @param {*} props
 * @returns
 */
const CustomTabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
};

export default ListJefeVentasLead;
