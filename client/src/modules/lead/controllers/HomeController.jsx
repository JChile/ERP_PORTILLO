import React, { useContext } from "react";
import { AuthContext } from "../../../auth";
import ListLeadController from "./ListLeadController";
import JefeVentasDashboard from "../pages/jefeFinanciero/JefeVentasDashboard";
import AsesorLeadDashboard from "../pages/asesor/AsesorLeadDashboard";

const HomeController = () => {
  const { currentUser } = useContext(AuthContext);

  switch (currentUser.groups) {
    case "asesor": {
      return <AsesorLeadDashboard />;
    }
    case "jefe_ventas": {
      return <JefeVentasDashboard />;
    }
  }
};

export default HomeController;
