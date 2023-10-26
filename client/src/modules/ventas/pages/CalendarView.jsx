import React, { useState, useContext, useEffect } from "react";
import { getMonth } from "../utils/util";
import {
  CalendarHeader,
  Month,
  CalendarSideBar,
  EventModal,
  Week,
} from "../components";
import CalendarContext from "../context/CalendarContext";

export const CalendarView = () => {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal, calendarState, calendarStates } =
    useContext(CalendarContext);

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
          {calendarState === calendarStates.month && (
            <Month month={currentMonth} />
          )}
          {calendarState === calendarStates.week && <Week />}
        </div>
      </div>
    </React.Fragment>
  );
};
