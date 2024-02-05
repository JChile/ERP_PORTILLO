import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
} from "recharts";

export const CampaniasRadarChart = ({ data }) => {
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <RadarChart outerRadius={150} width={500} height={300} data={data}>
      <PolarGrid />
      <PolarAngleAxis dataKey="name" />
      <PolarRadiusAxis />
      <Radar
        name="Costo Estimado"
        dataKey="costo_estimado"
        stroke="#ffad01"
        fill="#ffad01"
        fillOpacity={0.6}
      />
      <Radar
        name="Costo Real"
        dataKey="costo_real"
        stroke="#4169FF"
        fill="#4169FF"
        fillOpacity={0.6}
      />
      <Tooltip />
    </RadarChart>
  );
};
