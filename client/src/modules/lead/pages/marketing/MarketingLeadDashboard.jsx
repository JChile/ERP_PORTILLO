import React, { useState } from "react";
import { getProyectos } from "../../../proyectos/helpers";
import { ListLeads } from "../ListLeads";

const MarketingDashboard = ({ token }) => {
  return (
    <div className="flex flex-col gap-y-5">
      <h1 className="text-2xl">Encargado de Marketing</h1>
      <hr className="border-t-2 border-gray-300" />
      <ListLeads />
      <hr className="border-t-2 border-gray-300" />
    </div>
  );
};

export default MarketingDashboard;
