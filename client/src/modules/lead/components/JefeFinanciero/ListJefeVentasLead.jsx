import React, { useEffect, useState } from "react";
import { getAsesorLeads, getProyectoAsesor } from "../../helpers";
import { CustomCircularProgress } from "../../../../components";
import { CustomTable } from "../../../../components/CustomLeadTable";
import { CustomInputBase } from "../../../../components/CustomInputBase";
import { Tab, Tabs } from "@mui/material";

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
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [visibleProgress, setVisibleProgress] = useState(true);
  const [error, setError] = useState(false);
  const [adminData, setAdminData] = useState(null);
  const [value, setValue] = useState(0);

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
        <Tabs aria-label="basic tabs" value={value} onChange={handleChange}>
          <Tab sx={{ textTransform: "capitalize" }} label="Asesores" />
          <Tab sx={{ textTransform: "capitalize" }} label="Leads" />
        </Tabs>

        <CustomInputBase
          placeholder="Buscar lead"
          onSearch={handleSearchButton}
        />
        <p>Como estas</p>
        {showContent}
      </div>
      {visibleProgress && <CustomCircularProgress />}
    </React.Fragment>
  );
};

const CustomPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div>
      { value === index && (
        <Box sx={{ p: 3}}>

        </Box>
      )}
    </div>
  )
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
