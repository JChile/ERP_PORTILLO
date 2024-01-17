import React, { useContext } from "react";
import { AuthContext } from "../../../auth";
import { NoAccessLeads } from "../components";
import ListJefeVentasLead from "../components/JefeFinanciero/ListJefeVentasLead";
import { ListAsesorVentasLead } from "../components/Asesor/ListAsesorVentasLead";

const HomeController = () => {
  const { currentUser, authTokens } = useContext(AuthContext);
  const { user } = currentUser;

  switch (currentUser.groups) {
    case "asesor": {
      console.log({ admin: currentUser.user.isAdmin });
      return user.isAdmin ? (
        <ListJefeVentasLead credentials={authTokens["access"]} />
      ) : (
        <ListAsesorVentasLead />
      );
    }
    default:
      return <NoAccessLeads />;
  }
};

export default HomeController;
