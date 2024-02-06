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
    <RadarChart width={500} height={300} data={data}>
      <PolarGrid />
      <PolarAngleAxis dataKey="name" 
        tick={{ fontSize: 13 }}/>
      <PolarRadiusAxis />
      <Radar
        name="Costo Estimado"
        dataKey="costo_estimado"
        stroke="#FF5733"
        fill="#FF5733"
        fillOpacity={0.6}
      />
      <Radar
        name="Costo Real"
        dataKey="costo_real"
        stroke="#8884d8"
        fill="#8884d8"
        fillOpacity={0.6}
      />
      <Tooltip />
    </RadarChart>
  );
};
