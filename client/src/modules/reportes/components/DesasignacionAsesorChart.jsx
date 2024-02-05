import { Typography } from "@mui/material";
import React from "react";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  Legend,
} from "recharts";

/**
 * 
 * @param {Array[]} data 
 * @returns 
 */
export const DesasignacionAsesorChart = ({ data }) => {

  const formatData = data.map(element => ({
    asesor: `${element.first_name} ${element.last_name}`,
    leadsAsignados: element.asignaciones,
    leadsDesasignados: element.desasignaciones,
  }))

  return (
    <div className="flex flex-col items-center">
      <Typography fontWeight="bold" sx={{ marginY: 4 }}>
        Proporcion de leads asignados y desasigDnados por asesor
      </Typography>
      <BarChart
        data={formatData}
        margin={{ top: 10, right: 30, left: 30, bottom: 5 }}
        barSize={20}
        width={620}
        height={450}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="asesor"
          tick={{ fontSize: 14 }}
          tickFormatter={(value) => {
            if (value.length > 10) {
              return value.substring(0, 5) + "...";
            }
            return value;
          }}
        />
        <YAxis />
        <Tooltip />
        <Legend
          formatter={(value, entry, index) => {
            return value === "leadsAsignados"
              ? "# Leads Asignados"
              : "# Leads Desasignados";
          }}
        />
        <Bar
          type="monotone"
          dataKey="leadsAsignados"
          stroke="blue"
          fill="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Bar
          type="monotone"
          dataKey="leadsDesasignados"
          stroke="#FFC300"
          fill="#FF5733"
        />
      </BarChart>
    </div>
  );
};
