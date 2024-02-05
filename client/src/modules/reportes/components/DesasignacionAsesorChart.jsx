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

const data = [
  { asesor: "Julian", leadsAsignados: 7, leadsDesasignados: 4 },
  { asesor: "Andrew", leadsAsignados: 5, leadsDesasignados: 3 },
  { asesor: "Jesus", leadsAsignados: 6, leadsDesasignados: 1 },
  { asesor: "Carlos", leadsAsignados: 4, leadsDesasignados: 2 },
  { asesor: "Katy", leadsAsignados: 7, leadsDesasignados: 1 },
];

export const DesasignacionAsesorChart = () => {
  return (
    <div className="flex flex-col items-center">
      <Typography fontWeight="bold" sx={{ marginY: 4 }}>
        Proporcion de leads asignados y desasignados por asesor
      </Typography>
      <BarChart
        data={data}
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
