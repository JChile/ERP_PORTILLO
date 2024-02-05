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
  { objecion: "La ubicación no me gusta", leads: 7 },
  { objecion: "Vuélveme a llamar", leads: 5 },
  { objecion: "Yo les devuelvo la llamada", leads: 6 },
  { objecion: "Muy caro", leads: 4 },
  { objecion: "Número equivocado", leads: 7 },
  { objecion: "No estoy interesado", leads: 7 },
  { objecion: "Ninguna", leads: 7 },
];

export const DesasignacionObjecionChart = () => {
  return (
    <div className="flex flex-col items-center">
      <Typography fontWeight="bold" sx={{ marginY: 4 }}>
        Proporcion de leads desasignados por objeción
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
          dataKey="objecion"
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
