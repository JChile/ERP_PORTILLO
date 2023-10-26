import React, { useState, useContext, useEffect } from "react";
import { getMonth } from "../utils/util";
import {
  CalendarHeader,
  Month,
  CalendarSideBar,
  EventModal,
} from "../components";
import CalendarContext from "../context/CalendarContext";

export const CalendarView = () => {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal } = useContext(CalendarContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);


  return (
    <React.Fragment>
      {showEventModal && <EventModal />}
      <div className="h-screen flex flex-col">
        <CalendarHeader />
        <div className="flex flex-1">
          <CalendarSideBar />
          <Month month={currentMonth} />
        </div>
      </div>
    </React.Fragment>
  );
};
