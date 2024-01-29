import React, { useContext, useEffect, useState } from "react";
import { getAsesorLeads } from "../../helpers";
import { CustomCircularProgress } from "../../../../components";
import { CustomTable } from "../../../../components/CustomLeadTable";
import { CustomInputBase } from "../../../../components/CustomInputBase";
import { AuthContext } from "../../../../auth";

const headers = [
  { name: "Acciones", width: 20 },
  { name: "Nombre", width: 120 },
  { name: "Celular", width: 100 },
  { name: "Estado", width: 40 },
  { name: "Campaña", width: 120 },
  { name: "Entrega", width: 50 },
];

export const ListAsesorVentasLead = () => {
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [visibleProgress, setVisibleProgress] = useState(false);
  const [error, setError] = useState(false);
  const { authTokens } = useContext(AuthContext);

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

  const traerLeadByAsesor = async () => {
    setVisibleProgress(true);
    try {
      const data = await getAsesorLeads(authTokens["access"]);
      console.log(data);
      setLeads(data.leads);
      setFilteredLeads(data.leads);
    } catch (error) {
      setError(true);
    }
    setVisibleProgress(false);
  };

  useEffect(() => {
    traerLeadByAsesor();
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
        {showContent}
      </div>
      {visibleProgress && <CustomCircularProgress />}
    </React.Fragment>
  );
};
