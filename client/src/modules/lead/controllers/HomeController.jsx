import React, { useContext } from "react";
import { AuthContext } from "../../../auth";
import { NoAccessLeads } from "../components";
import ListJefeVentasLead from "../components/JefeFinanciero/ListJefeVentasLead";

const HomeController = () => {
  const { currentUser, authTokens } = useContext(AuthContext);
  const { user } = currentUser;

  switch (currentUser.groups) {
    case "asesor": {
      return user.isAdmin ? (
        <ListJefeVentasLead credentials={authTokens["access"]} />
      ) : (
        <div>Admin</div>
      );
    }
    default:
      return <NoAccessLeads />;
  }
};

export default HomeController;
