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
  { estado: "Tibio", leads: 7 },
  { estado: "Separaciones", leads: 5 },
  { estado: "No responde", leads: 6 },
  { estado: "Frio", leads: 4 },
  { estado: "En proceso", leads: 7 },
  { estado: "Cierre", leads: 7 },
  { estado: "Caliente", leads: 7 },
];

export const DesasignacionEstadoChart = () => {
  return (
    <div className="flex flex-col items-center">
      <Typography fontWeight="bold" sx={{ marginY: 4 }}>
        Proporcion de leads desasignados por estado
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
          dataKey="estado"
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
        <Legend />
        <Bar
          type="monotone"
          dataKey="leads"
          stroke="blue"
          fill="#8884d8"
          activeDot={{ r: 8 }}
        />
      </BarChart>
    </div>
  );
};
