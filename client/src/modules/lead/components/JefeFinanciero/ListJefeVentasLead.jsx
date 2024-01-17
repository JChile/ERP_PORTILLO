import React, { useEffect, useState } from "react";
import { getAsesorLeads, getProyectoAsesor } from "../../helpers";
import {
  CustomCircularProgress,
  FilterEstadoLead,
  FilterProyectos,
} from "../../../../components";
import { CustomTable } from "../../../../components/CustomLeadTable";
import { CustomInputBase } from "../../../../components/CustomInputBase";
import { Box, Tab, Tabs } from "@mui/material";
import { MdDateRange, MdDescription, MdLocationPin } from "react-icons/md";
import { useCustomTablePagination } from "../../../../hooks";
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
  const [filterState, setFilterState] = useState({});

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

  const fetchData = async (token) => {
    try {
      //const data = await getAsesorLeads(token);
      const project = await getProyectoAsesor(token, projectId);
      setprojectData(project);
      setLeads(project.lead);
      setLeadsNotAsigned(project.lead.filter((item) => !item.asignado));
      setFilteredLeads(project.lead);
    } catch (error) {
      setError(true);
    }
    setVisibleProgress(false);
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

  useEffect(() => {
    fetchData(credentials);
  }, []);

  const showContent = !error ? (
    <CustomTable headerData={headers} rowData={filteredLeads} />
  ) : (
    <div>Hola</div>
  );

  console.log(filteredLeads);

  return (
    <React.Fragment>
      <div className="flex flex-col gap-y-4">
        <h1 className="font-semibold text-2xl">
          Gestion de leads - Jefe de Ventas
        </h1>
      </div>

      <div className="mt-3 flex flex-col gap-y-4">
        <CustomInputBase
          placeholder="Buscar lead"
          onSearch={handleSearchButton}
        />

        <div className="flex gap-x-3">
          <div>
            <FilterProyectos 
              label="Proyecto" 
              onNewInput={onAddProject} />
            <FilterAsesor 
              label="Asesor" 
              onNewInput={onAddAsesor} />
            <FilterEstadoLead
              label="Estado lead"
              onNewInput={onAddEstadoLead}
            />
          </div>
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
