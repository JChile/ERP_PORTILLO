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

  console.log({adminData})

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
      <div className="flex flex-col gap-y-4">
        <h1 className="capitalize font-semibold text-2xl">
          Proyecto {adminData?.nombre}
        </h1>
        <div className="border rounded flex justify-around items-center bg-slate-100 py-3 px-2">
          <div className="flex flex-col gap-y-1 items-center">
            <MdDescription size={28} />
            <p className="text-lg">Descripción</p>
            <p className="text-xs">{adminData?.descripcion}</p>
          </div>
          <div className="h-8 w-1 rounded-sm border-black bg-black"></div>
          <div className="flex flex-col gap-y-1 items-center">
            <MdDateRange size={28} />
            <p className="text-lg">Fecha de creación</p>
            <p className="text-xs">{adminData?.fecha_creacion}</p>
          </div>
          <div className="h-8 w-1 rounded-sm border-black bg-black"></div>
          <div className="flex flex-col gap-y-1 items-center">
            <MdDateRange size={28} />
            <p className="text-lg">Fecha de actualización</p>
            <p className="text-xs">{adminData?.fecha_actualizacion}</p>
          </div>
          <div className="h-8 w-1 rounded-sm border-black bg-black"></div>
          <div className="flex flex-col gap-y-1 items-center">
            <MdLocationPin size={28} />
            <p className="text-lg">Ubicación</p>
            <p className="capitalize text-xs">{adminData?.ubicacion}</p>
          </div>
        </div>
      </div>

      {/** ------------------------------------------------------------------ */}

      <div className="flex mt-4 justify-center gap-x-6">
        <div className="bg-dark-purple flex flex-col rounded items-center w-24 h-24 justify-center text-white">
          <p className="text-lg">Asesores</p>
          <p className="text-sm">{adminData?.asesor.length}</p>
        </div>
        <div className="bg-dark-purple flex flex-col rounded items-center w-24 h-24 justify-center text-white">
          <p className="text-lg">Leads</p>
          <p className="text-sm">{leads.length}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-y-5">
        <Box sx={{ width: "100%" }}>
          <Tabs aria-label="basic tabs" value={value} onChange={handleChange}>
            <Tab
              sx={{
                textTransform: "capitalize",
                fontWeight: "semibold",
                color: "black",
                fontSize: "0.9rem",
              }}
              label="Asesores"
            />
            <Tab
              sx={{
                textTransform: "capitalize",
                fontWeight: "semibold",
                color: "black",
                fontSize: "0.9rem",
              }}
              label="Leads"
            />
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
                      {item.lead.map((item, index) => {
                        return (
                          <li key={index} className="capitalize">
                            {item.celular} - {item.nombre} {item.apellido} -{" "}
                            {item.estadoLead}
                          </li>
                        );
                      })}
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
