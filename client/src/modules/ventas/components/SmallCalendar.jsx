import dayjs from "dayjs";
import React, { useContext } from "react";
import { useState } from "react";
import { getMonth } from "../utils/util";
import { useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import CalendarContext from "../context/CalendarContext";

export const SmallCalendar = () => {
  const [currentMonthIdx, setCurrentMonthIdx] = useState(dayjs().month());
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, setSmallCalendarMonth, setDaySelected, daySelected } =
    useContext(CalendarContext);

  const handlePrevMonth = () => {
    setCurrentMonthIdx(currentMonthIdx - 1);
  };

  const handleNextMonth = () => {
    setCurrentMonthIdx(currentMonthIdx + 1);
  };

  const getDayClass = (day) => {
    const formt = "DD-MM-YY";
    const nowDay = dayjs().format(formt);
    const currentDay = day.format(formt);
    const selectedDay = daySelected && daySelected.format(formt)
    if (nowDay === currentDay) {
      return "bg-blue-500 rounded-full text-white";
    }
    else if ( currentDay === selectedDay) {
      return "bg-blue-100 rounded-full text-blue-600 font-bold"
    }
    return "";
  };

  useEffect(() => {
    setCurrentMonthIdx(monthIndex);
  }, [monthIndex]);

  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIdx));
  }, [currentMonthIdx]);

  return (
    <div className="mt-9">
      <div className="flex justify-between">
        <p className="text-gray-950 font-bold ">
          {dayjs(new Date(dayjs().year(), currentMonthIdx)).format("MMMM YYYY")}
        </p>
        <div>
          <button
            onClick={handlePrevMonth}
            className="cursor-pointer text-gray-800 mx-2"
          >
            <FiChevronLeft />
          </button>
          <button
            onClick={handleNextMonth}
            className="cursor-pointer text-gray-800 mx-2"
          >
            <FiChevronRight />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 grid-row-6">
        {currentMonth[0].map((day, index) => (
          <span className="text-sm py-1 text-center" key={index}>
            {day.format("dd").charAt(0)}
          </span>
        ))}
        {currentMonth.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, idx) => (
              <button
                key={idx}
                className={`py-1 w-full ${getDayClass(day)}`}
                onClick={() => {
                  setSmallCalendarMonth(currentMonthIdx);
                  setDaySelected(day)
                }}
              >
                <span className="text-sm">{day.format("D")}</span>
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
