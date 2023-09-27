import { Paper } from "@mui/material";
import React, { useContext } from "react";
import { AuthContext } from "../auth";


/**
 * 
 * @param {string} moduleName Nombre del modulo
 * @param {string} userName Informacion del usuario
 * @param {string} viewName Titulo de la vista
 * @returns 
 */
export const CustomTopBar = ({ moduleName, userName, viewName }) => {

  return (
    <Paper elevation={1} square>
      <div className="py-6 px-8 flex flex-row items-center justify-between">
        <h1 className="text-lg font-bold">{viewName}</h1>
        <div className="flex flex-row gap-x-3 items-center">
          <div className="flex rounded-full bg-[#9e154a] w-8 h-8 items-center justify-center">
            <p className="text-sm font-bold text-white">AJ</p>
          </div>
          <div>
            <p className="text-xs font-semi-bold">{userName}</p>
            <p className="text-xs text-[gray]">{moduleName}</p>
          </div>
        </div>
      </div>
    </Paper>
  );
};
