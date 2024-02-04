import React, { useContext } from "react";
import { AuthContext } from "../../../auth";
import { CalendarView } from "../pages/CalendarView";
import NoAccessEventos from "../pages/NoAccessEventos";

const EventosController = () => {
  const { currentUser } = useContext(AuthContext);

  switch (currentUser.groups) {
    case "asesor": {
      return <CalendarView />;
    }
    default: {
      return <NoAccessEventos />;
    }
  }
};

export default EventosController;
