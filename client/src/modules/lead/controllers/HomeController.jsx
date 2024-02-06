import React, { useContext } from "react";
import { AuthContext } from "../../../auth";
import { NoAccessLeads } from "../components";
import ListJefeVentasLead from "../components/JefeFinanciero/ListJefeVentasLead";
import { ListAsesorVentasLead } from "../components/Asesor/ListAsesorVentasLead";
import { ListMarketingLead } from "../components/marketing/ListMarketingLead";

const HomeController = () => {
  const { currentUser } = useContext(AuthContext);
  const { user } = currentUser;

  switch (currentUser.groups) {
    case "asesor": {
      return user.isAdmin ? <ListJefeVentasLead /> : <ListAsesorVentasLead />;
    }
    case "marketing": {
      return <ListMarketingLead />;
    }
    default:
      return <NoAccessLeads />;
  }
};

export default HomeController;
