import React, { useContext } from "react";
import { AuthContext } from "./auth";
import JefeVentasDashboard from "./modules/lead/pages/jefeFinanciero/JefeVentasDashboard";
import AsesorVentasDashboard from "./modules/lead/pages/asesor/AsesorLeadDashboard";

/**
 *
 * @returns Dashboard, retornar un componente de acuerdo al usuario que se registro.
 */
const Dashboard = () => {
  const { currentUser } = useContext(AuthContext);

  switch (currentUser.groups) {
    case "jefe_ventas":
      return <JefeVentasDashboard />;

    case "asesor":
      return <AsesorVentasDashboard />;
  }
};

export default Dashboard;
