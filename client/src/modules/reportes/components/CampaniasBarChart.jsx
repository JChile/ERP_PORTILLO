import React from "react";
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from "recharts";

export const CampaniasBarChart = ({ data }) => {
  if (!data || data.length === 0) {
    return null;
  }
  return (
    <BarChart width={400} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="name"
        angle={-45}
        textAnchor="end"
        height={100}
        tick={{ fontSize: 10 }}
      />
      <YAxis />
      <Tooltip />

      {Object.keys(data[0]).map((key) => {
        const color = key === "costo_estimado" ? "#ffad01" : "#4169FF";
        if (key !== "name") {
          return <Bar key={key} type="monotone" dataKey={key} fill={color} />;
        }
        return null;
      })}
    </BarChart>
  );
};
