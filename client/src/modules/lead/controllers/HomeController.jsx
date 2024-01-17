import React, { useContext } from "react";
import { AuthContext } from "../../../auth";
import ListLeadController from "./ListLeadController";
import JefeVentasDashboard from "../pages/jefeFinanciero/JefeVentasDashboard";
import AsesorLeadDashboard from "../pages/asesor/AsesorLeadDashboard";
import { NoAccessLeads } from "../components";
import MarketingDashboard from "../pages/marketing/MarketingLeadDashboard";

const HomeController = () => {
  const { currentUser, authTokens } = useContext(AuthContext);

  switch (currentUser.groups) {
    case "asesor": {
      console.log("ASESOR");
      return <AsesorLeadDashboard token={authTokens["access"]} />;
    }
    case "jefe_ventas": {
      return <JefeVentasDashboard token={authTokens["access"]} />;
    }
    case "marketing": {
      return <MarketingDashboard token={authTokens["access"]} />;
    }
    default:
      return <NoAccessLeads />;
  }
};

export default HomeController;
