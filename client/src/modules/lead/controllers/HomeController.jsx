import React, { useContext } from "react";
import { AuthContext } from "../../../auth";
import { NoAccessLeads } from "../components";
import ListJefeVentasLead from "../components/JefeFinanciero/ListJefeVentasLead";

const HomeController = () => {
  const { currentUser, authTokens } = useContext(AuthContext);

  switch (currentUser.groups) {
    case "asesor": {
      //console.log({admin: currentUser.isAdmin});
      return <AsesorLeadDashboard token={authTokens["access"]} />;
    }
    case "jefe_ventas": {
      return <ListJefeVentasLead credentials={authTokens["access"]} />;
    }
    default:
      return <NoAccessLeads />;
  }
};

export default HomeController;
