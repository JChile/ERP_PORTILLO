import React, { useContext, useState } from "react";
import CalendarIcon from "./../ventas_icons/calendar.png";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import CalendarContext from "../context/CalendarContext";
import dayjs from "dayjs";
import { CalendarMenu } from "./CalendarMenu";
import { Box, Button } from "@mui/material";
import { AiOutlineDown } from "react-icons/ai";

export const CalendarHeader = () => {
  const {
    monthIndex,
    setMonthIndex,
    calendarState,
    setCalendarState,
    calendarStates,
  } = useContext(CalendarContext);

  const handlePreviusMonth = () => {
    setMonthIndex(monthIndex - 1);
  };

  const handleNextMonth = () => {
    setMonthIndex(monthIndex + 1);
  };

  const handleReset = () => {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );
  };

  const handleChangeView = (newState) => {
    setCalendarState(newState);
  };

  return (
    <div className="px-4 py-2 flex items-center">
      <img src={CalendarIcon} alt="calendar" className="w-12 h-12" />
      <h1 className="mr-10 text-xl black font-bold">Calendario</h1>
      <button
        type="button"
        className="border rounded py-2 px-4 mr-5 font-bold text-gray-950 hover:bg-slate-100 hover:shadow-xl"
        onClick={handleReset}
      >
        Hoy
      </button>
      <button
        type="button"
        className="rounded px-4 mr-5"
        onClick={handlePreviusMonth}
      >
        <FiChevronLeft />
      </button>
      <button
        type="button"
        className="rounded px-4 mr-5"
        onClick={handleNextMonth}
      >
        <FiChevronRight />
      </button>
      <h2 className="ml-4 text-xl text-gray-950 font-bold">
        {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
      </h2>

      <div className="ml-auto">
        <CalendarMenu
          setView={handleChangeView}
          text={calendarState}
          calendarStates={calendarStates}
        />
      </div>
    </div>
  );
};
