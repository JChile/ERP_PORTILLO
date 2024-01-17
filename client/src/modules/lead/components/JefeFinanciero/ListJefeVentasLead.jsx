import React, { useEffect, useState } from "react";
import { getLeadsActivos } from "../../helpers";
import {
  CustomCircularProgress,
  FilterEstadoLead,
  FilterProyectos,
} from "../../../../components";
import { CustomTable } from "../../../../components/CustomLeadTable";
import { CustomInputBase } from "../../../../components/CustomInputBase";
import { Box, Button, Tab, Tabs, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FilterAsesor } from "../../../../components/filters/asesor/FilterAsesor";

const headers = [
  { name: "Acciones", width: 20 },
  { name: "Nombre", width: 120 },
  { name: "Celular", width: 100 },
  { name: "Estado", width: 40 },
  { name: "Campaña", width: 120 },
  { name: "Entrega", width: 50 },
];

const ListJefeVentasLead = ({ credentials }) => {
  const [visibleProgress, setVisibleProgress] = useState(true);
  const [error, setError] = useState(false);
  const [value, setValue] = useState(0);
  const [projectData, setprojectData] = useState(null);
  const [leads, setLeads] = useState([]);
  const [leadsNotAsigned, setLeadsNotAsigned] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [filterState, setFilterState] = useState({
    proyecto: 0,
    asesor: 0,
    estadoLead: null,
    startDate: null,
    endDate: null,
  });
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 0: {
        setFilteredLeads(projectData.lead);
        break;
      }
      case 1: {
        setFilteredLeads(leadsNotAsigned);
        break;
      }
    }
  };

  const handleSearchButton = (searchText) => {
    const filter = leads
      ? leads.filter((lead) => {
          return (
            lead.nombre.toLowerCase().includes(searchText.toLowerCase()) ||
            lead.apellido.toLowerCase().includes(searchText.toLowerCase()) ||
            lead.celular.includes(searchText) ||
            lead.celular2.includes(searchText) ||
            lead.estadoLead.toLowerCase().includes(searchText.toLowerCase())
          );
        })
      : [];
    setFilteredLeads(filter);
  };

  /** Filters functions */
  const onAddProject = (project) => {
    setFilterState((prev) => ({
      ...prev,
      proyecto: project.id,
    }));
  };

  const onAddAsesor = (asesor) => {
    setFilterState((prev) => ({
      ...prev,
      asesor: asesor.id,
    }));
  };

  const onAddEstadoLead = (estadoLead) => {
    setFilterState((prev) => ({
      ...prev,
      estadoLead: estadoLead.id,
    }));
  };

  const fetchData = async (token) => {
    try {
      const leads = await getLeadsActivos(token);
      setLeads(leads);
      setFilteredLeads(leads);
    } catch (error) {
      setError(true);
    }
    setVisibleProgress(false);
  };

  const onHandleFilterClick = () => {
    const filtered = leads.filter((lead) => {
      // Filtrar por asesor
      if (filterState.asesor && lead.asesor.id !== filterState.asesor) {
        return false;
      }

      // Filtrar por proyecto
      if (
        filterState.proyecto &&
        lead.campania.proyecto !== filterState.proyecto
      ) {
        return false;
      }

      // Filtrar por estadoLead
      if (
        filterState.estadoLead &&
        lead.estadoLead !== filterState.estadoLead
      ) {
        return false;
      }

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

  useEffect(() => {
    fetchData(credentials);
  }, []);

  console.log(leads);
  console.log(filterState);

  const showContent = !error ? (
    <CustomTable headerData={headers} rowData={filteredLeads} />
  ) : (
    <div>No leads por cargar</div>
  );

  return (
    <React.Fragment>
      <div className="flex flex-col gap-y-4">
        <h1 className="font-semibold text-2xl">
          Gestion de leads - Jefe de Ventas
        </h1>
      </div>

      <div className="mt-3 flex flex-col gap-y-3">
        <CustomInputBase
          placeholder="Buscar lead"
          onSearch={handleSearchButton}
        />

        <div className="flex flex-col gap-y-4">
          <h2 className="font-bold">Filtrar leads</h2>
          <form className="flex gap-x-3">
            <FilterProyectos label="Proyecto" onNewInput={onAddProject} />
            <FilterAsesor label="Asesor" onNewInput={onAddAsesor} />
            <FilterEstadoLead label="Estado" onNewInput={onAddEstadoLead} />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={{
                  width: "9rem",
                }}
                label="Desde"
                value={filterState.startDate}
                onChange={(newValue) => {
                  setFilterState((prev) => ({ ...prev, startDate: newValue }));
                }}
                TextField={(params) => <TextField {...params} />}
              />
              <DatePicker
                sx={{
                  width: "9rem",
                }}
                label="Hasta"
                value={filterState.endDate}
                onChange={(newValue) => {
                  setFilterState((prev) => ({ ...prev, endDate: newValue }));
                }}
                TextField={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <Button
              variant="contained"
              sx={{ borderRadius: "0px", textTransform: "capitalize" }}
              onClick={onHandleFilterClick}
            >
              Filtrar
            </Button>
          </form>
        </div>

        <Box sx={{ width: "100%" }}>
          <Tabs
            aria-label="basic tabs"
            value={value}
            onChange={handleChange}
            sx={{ marginY: 2 }}
          >
            <Tab
              sx={{
                textTransform: "capitalize",
                fontWeight: "semibold",
                color: "black",
                fontSize: "0.9rem",
              }}
              label="Leads"
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
        </Box>

        <CustomTabPanel value={value} index={0}>
          {showContent}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          {showContent}
        </CustomTabPanel>
      </div>
      {visibleProgress && <CustomCircularProgress />}
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
