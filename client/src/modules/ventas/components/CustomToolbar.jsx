import React from "react";
import { FiArrowLeft, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { HiThumbDown } from "react-icons/hi";

export const CustomToolbar = (toolbar) => {
  return (
    <div className="flex items-center justify-between mb-1">
      <div className="flex gap-x-7 items-center">
        <button
          onClick={() => toolbar.onNavigate("TODAY")}
          className="hover:shadow-xl hover:bg-slate-300 px-2 py-2 shadow-black border rounded w-20 text-xm"
        >
          Hoy
        </button>
        <button
          className="hover:shadow-xl hover:bg-slate-300 rounded"
          onClick={() => toolbar.onNavigate("PREV")}
        >
          <FiChevronLeft className="w-5 h-5" />
        </button>
        <button
          className="hover:shadow-xl hover:bg-slate-300 rounded"
          onClick={() => toolbar.onNavigate("NEXT")}
        >
          <FiChevronRight className="w-5 h-5" />
        </button>
        <span className="text-xl text-slate-950 font-bold">
          {toolbar.label}
        </span>
      </div>
      <div className="flex gap-x-2">
        <button
          className="hover:shadow-xl hover:bg-slate-300 px-2 py-2 shadow-black border rounded w-20 text-xm"
          type="button"
          onClick={() => toolbar.onView("month")}
        >
          Mes
        </button>
        <button
          className="hover:shadow-xl hover:bg-slate-300 px-2 py-2 shadow-black border rounded w-20 text-xm"
          type="button"
          onClick={() => toolbar.onView("week")}
        >
          Semana
        </button>
      </div>
    </div>
  );
};
