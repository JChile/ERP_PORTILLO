import React, { useEffect, useState } from "react";
import { Button, Tab, Tabs, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ViewLeadsNoAsignados } from "./ViewLeadsNoAsignados";
import ViewLeadAsignados from "./ViewLeadAsignados";
import { MdClear, MdFilterList } from "react-icons/md";

const ListJefeVentasLead = () => {
  const [error, setError] = useState(false);
  const [value, setValue] = useState(0);
  const [filterState, setFilterState] = useState({
    startDate: null,
    endDate: null,
  });

  const handleChange = (event, newValue) => setValue(newValue);

  const handleSearchButton = (searchText) => {};

  const onHandleFilterClick = () => {
    const filtered = leads.filter((lead) => {
      // Filtrar por fecha de inicio
      if (filterState.startDate) {
        const startDate = new Date(filterState.startDate);
        const leadDate = new Date(lead.horaRecepcion);
        if (leadDate < startDate) {
          return false;
        }
      }
      // Filtrar por fecha de fin
      if (filterState.endDate) {
        const endDate = new Date(filterState.endDate);
        const leadDate = new Date(lead.horaRecepcion);
        if (leadDate > endDate) {
          return false;
        }
      }
      return true;
    });
    setFilteredLeads(filtered);
  };

  const onHandleCleanFilter = () => {
    setFilterState(() => {
      onHandleFilterClick();
      return {
        startDate: null,
        endDate: null,
      };
    });
  };

  return (
    <React.Fragment>
      <h1 className="font-semibold text-2xl mt-2">
        Gestion de leads - Administrador
      </h1>
      <div className="mt-6 flex flex-col gap-y-3">
        <form className="flex flex-col gap-y-3">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="flex gap-x-6">
              <DatePicker
                label="Desde"
                value={filterState.startDate}
                onChange={(newValue) => {
                  setFilterState((prev) => ({
                    ...prev,
                    startDate: newValue,
                  }));
                }}
                sx={{ width: 160 }}
                TextField={(params) => <TextField {...params} size="medium" />}
              />
              <DatePicker
                label="Hasta"
                value={filterState.endDate}
                onChange={(newValue) => {
                  setFilterState((prev) => ({ ...prev, endDate: newValue }));
                }}
                sx={{ width: 160 }}
                TextField={(params) => <TextField {...params} size="medium" />}
              />
            </div>
          </LocalizationProvider>

          <div className="flex gap-x-4">
            <Button
              startIcon={<MdClear size={16} />}
              size="large"
              variant="contained"
              sx={{ textTransform: "capitalize", width: 80, paddingX: 5 }}
              onClick={onHandleCleanFilter}
            >
              Limpiar
            </Button>
            <Button
              startIcon={<MdFilterList size={16} />}
              size="large"
              variant="contained"
              sx={{ textTransform: "capitalize", width: 80, paddingX: 5 }}
              onClick={onHandleFilterClick}
            >
              Filtrar
            </Button>
          </div>
        </form>

        <Tabs
          aria-label="basic tabs"
          value={value}
          onChange={handleChange}
          sx={{ marginTop: 3 }}
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
          <ViewLeadAsignados />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <ViewLeadsNoAsignados />
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
