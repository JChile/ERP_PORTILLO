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
  return (
    <div className="flex flex-col items-center">
      <Typography fontWeight="bold" sx={{ marginY: 2 }}>
        Proporcion de leads asignados y desasignados por asesor
      </Typography>
      <BarChart
        data={data}
        margin={{ top: 10, right: 30, left: 30, bottom: 5 }}
        barSize={20}
        width={580}
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
