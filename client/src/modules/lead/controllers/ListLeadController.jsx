import React, { useContext } from "react";
import { AuthContext } from "../../../auth";
import ListAsesorVentasLead from "../components/Asesor/ListAsesorVentasLead";
import ListJefeVentasLead from "../components/JefeFinanciero/ListJefeVentasLead";
import { ListLeads } from "../pages/ListLeads";
import { useParams } from "react-router-dom";

const ListLeadController = () => {
  const { currentUser, authTokens } = useContext(AuthContext);
  const { projectId } = useParams();


  switch (currentUser.groups) {
    case "asesor": {
      return (
        <ListAsesorVentasLead
          credentials={authTokens.access}
          projectId={projectId}
        />
      );
    }
    case "jefe_ventas": {
      return (
        <ListJefeVentasLead
          credentials={authTokens.access}
          projectId={projectId}
        />
      );
    }
    case "marketing": {
      return <ListLeads />;
    }
  }
};

export default ListLeadController;
