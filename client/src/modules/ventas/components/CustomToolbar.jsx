import { Button } from "@mui/material";
import React from "react";
import { FiArrowLeft, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { HiThumbDown } from "react-icons/hi";

export const CustomToolbar = (toolbar) => {
  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex gap-x-7 items-center">
        <Button
          onClick={() => toolbar.onNavigate("TODAY")}
          color="inherit"
          variant="contained"
          sx={{ textTransform: "capitalize", borderRadius: "0px" }}
        >
          Hoy
        </Button>

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
        <Button
          variant="contained"
          sx={{ textTransform: "capitalize", borderRadius: "0px" }}
          color="inherit"
          onClick={() => toolbar.onView("month")}
        >
          Mes
        </Button>
        <Button
          variant="contained"
          sx={{ textTransform: "capitalize", borderRadius: "0px" }}
          color="inherit"
          onClick={() => toolbar.onView("week")}
        >
          Semana
        </Button>
      </div>
    </div>
  );
};
