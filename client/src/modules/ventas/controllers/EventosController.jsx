import React, { useContext } from "react";
import { AuthContext } from "../../../auth";
import { CalendarView } from "../pages/CalendarView";
import NoAccessEventos from "../pages/NoAccessEventos";
import { CalendarViewAdmin } from "../pages/CalendarViewAdmin";

const EventosController = () => {
  const { currentUser } = useContext(AuthContext);
  const { user } = currentUser;

  switch (currentUser.groups) {
    case "asesor": {
      return user.isAdmin ?  <CalendarViewAdmin />: <CalendarView />;
    }

    default: {
      return <NoAccessEventos />;
    }
  }
};

export default EventosController;
