import React, { useContext } from "react";
import { AuthContext } from "../../../auth";
import { NoAccessLeads } from "../components";
<<<<<<< HEAD
import MarketingDashboard from "../pages/marketing/MarketingLeadDashboard";
=======
import ListJefeVentasLead from "../components/JefeFinanciero/ListJefeVentasLead";
>>>>>>> 495b386b4d3134d9bf2ee2afe6f6c6bd493788b5

const HomeController = () => {
  const { currentUser, authTokens } = useContext(AuthContext);
  const { user } = currentUser;

  switch (currentUser.groups) {
    case "asesor": {
      console.log({ admin: currentUser.user.isAdmin });
      return user.isAdmin ? (
        <ListJefeVentasLead credentials={authTokens["access"]} />
      ) : (
        <div>Admin</div>
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
