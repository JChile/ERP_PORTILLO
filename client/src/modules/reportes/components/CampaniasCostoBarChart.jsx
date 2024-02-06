import React from "react";
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from "recharts";

export const CampaniasCostoBarChart = ({ data }) => {
  if (!data || data.length === 0) {
    return null;
  }
  return (
    <BarChart width={500} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="name"
        angle={-45}
        textAnchor="end"
        height={50}
        tick={{ fontSize: 12 }}
        tickFormatter={(value) => {
          if (value.length > 8) {
            return value.substring(0, 7) + "...";
          }
          return value;
        }}
      />
      <YAxis />
      <Tooltip />

      {Object.keys(data[0]).map((key) => {
        const color = key === "costo_estimado" ? "#8884d8" : "#FF5733";
        if (key !== "name") {
          return <Bar key={key} type="monotone" dataKey={key} fill={color} />;
        }
        return null;
      })}
    </BarChart>
  );
};
