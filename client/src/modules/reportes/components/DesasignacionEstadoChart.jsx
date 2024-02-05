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


export const DesasignacionEstadoChart = ({ data }) => {

  const formatData = data.map(element => ({
    estado: element.descripcion,
    leads: element.desasignaciones,
  }))


  return (
    <div className="flex flex-col items-center">
      <Typography fontWeight="bold" sx={{ marginY: 4 }}>
        Proporcion de leads desasignados por estado
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
