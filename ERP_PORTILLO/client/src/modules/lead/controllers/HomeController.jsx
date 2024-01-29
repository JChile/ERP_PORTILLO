import React, { useContext } from "react";
import { AuthContext } from "../../../auth";
import { NoAccessLeads } from "../components";
import MarketingDashboard from "../pages/marketing/MarketingLeadDashboard";
import ListJefeVentasLead from "../components/JefeFinanciero/ListJefeVentasLead";
import { ListAsesorVentasLead } from "../components/Asesor/ListAsesorVentasLead";

const HomeController = () => {
  const { currentUser, authTokens } = useContext(AuthContext);
  const { user } = currentUser;

  switch (currentUser.groups) {
    case "asesor": {
      return user.isAdmin ? (
        <ListJefeVentasLead credentials={authTokens["access"]} />
      ) : (
        <ListAsesorVentasLead />
      );
    }
    case "marketing": {
      return <MarketingDashboard token={authTokens["access"]} />;
    }
    default:
      return <NoAccessLeads />;
  }
};

export default HomeController;
