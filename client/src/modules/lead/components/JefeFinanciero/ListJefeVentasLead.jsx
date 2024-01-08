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

const headers = [
  { name: "Acciones", width: 20 },
  { name: "Nombre", width: 120 },
  { name: "Celular", width: 100 },
  { name: "Estado", width: 40 },
  { name: "Campaña", width: 120 },
  { name: "Entrega", width: 50 },
];

const ListJefeVentasLead = ({ credentials, projectId }) => {
  const [leads, setLeads] = useState([]);
  const [visibleProgress, setVisibleProgress] = useState(true);
  const [error, setError] = useState(false);
  const [value, setValue] = useState(0);
  const [adminData, setAdminData] = useState(null);
  const [filteredLeads, setFilteredLeads] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
      const data = await getAsesorLeads(token);
      const proyectoAsesor = await getProyectoAsesor(token, projectId);
      console.log({ proyectoAsesor });
      setAdminData(proyectoAsesor);
      setLeads(data.leads);
      setFilteredLeads(data.leads);
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

  return (
    <React.Fragment>
      <div>
        <h1 className="capitalize">Proyecto {adminData?.nombre}</h1>
      </div>
      <div>
        <h2>Información general</h2>
        <div className="flex gap-x-3">
          <div className="bg-dark-purple text-white">
            <p>12</p>
            <p>Asesores</p>
          </div>
          <div className="bg-dark-purple text-white">
            <p>30</p>
            <p>Leads</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-y-5">
        <Box sx={{ width: "100%" }}>
          <Tabs aria-label="basic tabs" value={value} onChange={handleChange}>
            <Tab sx={{ textTransform: "capitalize" }} label="Asesores" />
            <Tab sx={{ textTransform: "capitalize" }} label="Leads" />
          </Tabs>
        </Box>

        <CustomTabPanel value={value} index={0}>
          {adminData !== null ? (
            adminData.asesor.map((item, index) => {
              return (
                <Accordion key={index}>
                  <AccordionSummary>
                    {item.first_name} - {item.last_name}
                  </AccordionSummary>
                  <AccordionDetails>
                    <ul>
                      {
                      item.lead.map((item, index) => {
                        return (
                          <li key={index} className="capitalize">
                            {item.celular} - {item.nombre} {item.apellido} - {item.estadoLead}
                          </li>
                        );
                      })
                      }
                    </ul>
                  </AccordionDetails>
                </Accordion>
              );
            })
          ) : (
            <p>Loading</p>
          )}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <CustomInputBase
            placeholder="Buscar lead"
            onSearch={handleSearchButton}
          />
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

[
  {
    id: 22,
    proyecto: "Nombre",
    etc: "...",
    asesor: [
      {
        id: "",
        nombre: "cocloiso",
        etc: "...",
        leads: ["id_lead", "id_lead"],
      },
      {
        otroaseser: "...",
      },
    ],
  },
];

/*
            
            */
