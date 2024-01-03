import React, { useEffect, useState } from "react";
import { getAsesorLeads } from "../../helpers";
import { CustomCircularProgress } from "../../../../components";
import { CustomTable } from "../../../../components/CustomLeadTable";
import { CustomInputBase } from "../../../../components/CustomInputBase";

const headers = [
  { name: "Acciones", width: 20 },
  { name: "Nombre", width: 120 },
  { name: "Celular", width: 100 },
  { name: "Estado", width: 40 },
  { name: "Campaña", width: 120 },
  { name: "Entrega", width: 50 },
];

const ListJefeVentasLead = ({ credentials }) => {
  //const [ventasData, setVentasData] = useState(null);
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [visibleProgress, setVisibleProgress] = useState(true);
  const [error, setError] = useState(false);

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
      //setVentasData(data);
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
      <div className="flex flex-col gap-y-5">
        
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

export default ListJefeVentasLead;



[
  {
    id: 22,
    "proyecto": "Nombre",
    "etc": "...",
    asesor: [
      {
        id: "",
        "nombre": "cocloiso",
        "etc": "...",
        "leads": [         
            "id_lead",
            "id_lead",
        ]
      },
      {
        otroaseser: "..."
      }
    ]
  }
]
