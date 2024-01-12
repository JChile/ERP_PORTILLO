import React, { useEffect, useState } from "react";
import { getAsesorLeads, getProyectoAsesor } from "../../helpers";
import { CustomCircularProgress } from "../../../../components";
import { CustomTable } from "../../../../components/CustomLeadTable";
import { CustomInputBase } from "../../../../components/CustomInputBase";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Tab,
  Tabs,
} from "@mui/material";
import {
  MdDataset,
  MdDateRange,
  MdDescription,
  MdLocalActivity,
  MdLocationPin,
} from "react-icons/md";
import { useCustomTablePagination } from "../../../../hooks";

const headers = [
  { name: "Acciones", width: 20 },
  { name: "Nombre", width: 120 },
  { name: "Celular", width: 100 },
  { name: "Estado", width: 40 },
  { name: "Campaña", width: 120 },
  { name: "Entrega", width: 50 },
];

const ListJefeVentasLead = ({ credentials, projectId }) => {
  const [visibleProgress, setVisibleProgress] = useState(true);
  const [error, setError] = useState(false);
  const [value, setValue] = useState(0);
  const [projectData, setprojectData] = useState(null);
  const [leads, setLeads] = useState([]);
  const [leadsNotAsigned, setLeadsNotAsigned] = useState([]);

  const [filteredLeads, setFilteredLeads] = useState([]);

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
        <h1 className="capitalize font-semibold text-2xl">
          Proyecto {projectData?.nombre}
        </h1>
        <div className="border rounded flex justify-around items-center bg-slate-100 py-3 px-2">
          <div className="flex flex-col gap-y-1 items-center">
            <MdDescription size={28} />
            <p className="text-lg">Descripción</p>
            <p className="text-xs">{projectData?.descripcion}</p>
          </div>
          <div className="h-8 w-1 rounded-sm border-black bg-black"></div>
          <div className="flex flex-col gap-y-1 items-center">
            <MdDateRange size={28} />
            <p className="text-lg">Fecha de creación</p>
            <p className="text-xs">{projectData?.fecha_creacion}</p>
          </div>
          <div className="h-8 w-1 rounded-sm border-black bg-black"></div>
          <div className="flex flex-col gap-y-1 items-center">
            <MdDateRange size={28} />
            <p className="text-lg">Fecha de actualización</p>
            <p className="text-xs">{projectData?.fecha_actualizacion}</p>
          </div>
          <div className="h-8 w-1 rounded-sm border-black bg-black"></div>
          <div className="flex flex-col gap-y-1 items-center">
            <MdLocationPin size={28} />
            <p className="text-lg">Ubicación</p>
            <p className="capitalize text-xs">{projectData?.ubicacion}</p>
          </div>
        </div>
      </div>

      {/** ------------------------------------------------------------------ */}

      <div className="flex mt-4 justify-center gap-x-6">
        <div className="bg-dark-purple flex flex-col rounded items-center w-24 h-24 justify-center text-white">
          <p className="text-lg text-center">Total de Leads</p>
          <p className="text-sm">{leads.length}</p>
        </div>
        <div className="bg-dark-purple flex flex-col rounded items-center w-24 h-24 justify-center text-white">
          <p className="text-lg capitalize text-center">Leads no asigandos</p>
          <p className="text-sm">{leads.length}</p>
        </div>
        <div className="bg-dark-purple flex flex-col rounded items-center w-24 h-24 justify-center text-white">
          <p className="text-lg capitalize text-center">Leads asignados</p>
          <p className="text-sm">{leads.length}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-col">
        <CustomInputBase
          placeholder="Buscar lead"
          onSearch={handleSearchButton}
        />
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
