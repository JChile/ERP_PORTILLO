import React, { useContext } from "react";
import { AuthContext } from "../../../auth";
import ListAsesorVentasLead from "../components/Asesor/ListAsesorVentasLead";
import ListJefeVentasLead from "../components/JefeFinanciero/ListJefeVentasLead";
import { ListLeads } from "../pages/ListLeads";

const ListLeadController = () => {
  const { currentUser, authTokens } = useContext(AuthContext);

  switch (currentUser.groups) {
    case "asesor": {
      return <ListAsesorVentasLead credentials={authTokens.access} />;
    }
    case "jefe_ventas": {
      return <ListJefeVentasLead credentials={authTokens.access} />;
    }
    case "marketing": {
      return <ListLeads />;
    }
  }
};

export default ListLeadController;
