import React, { useContext } from "react";
import { AuthContext } from "../../../auth";
import ListLeadController from "./ListLeadController";
import JefeVentasDashboard from "../pages/jefeFinanciero/JefeVentasDashboard";
import AsesorLeadDashboard from "../pages/asesor/AsesorLeadDashboard";

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
    default:
      console.log("OTHER");
      break;
  }
};

export default HomeController;
