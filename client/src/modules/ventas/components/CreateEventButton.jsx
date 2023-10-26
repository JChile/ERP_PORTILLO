import React, { useContext } from "react";
import { BiCalendarPlus } from "react-icons/bi";
import CalendarContext from "../context/CalendarContext";

export const CreateEventButton = () => {
  const { setShowEventModal } = useContext(CalendarContext);

  return (
    <button
      onClick={() => setShowEventModal(true)}
      className="border p-2 rounded-full flex items-center shadow-md hover:shadow-lg"
    >
      <BiCalendarPlus className="w-7 h-7" />
      <span className="pl-3 pr-4">Create</span>
    </button>
  );
};
