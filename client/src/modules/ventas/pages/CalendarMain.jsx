import React from "react";
import { CalendarContextWrapper } from "../context/CalendarContextWrapper";
import { CalendarView } from "./CalendarView";

export const CalendarMain = () => {
  return (
    <CalendarContextWrapper>
      <CalendarView />
    </CalendarContextWrapper>
  );
};
