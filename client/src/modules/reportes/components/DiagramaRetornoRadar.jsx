import React from "react";
import {
  Tooltip,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

export const DiagramRetornoRadar = ({ data }) => {
  if (!data || data.length === 0) {
    return null;
  }

  const calcularCostoPorLead = (data) => {
    return data.map((item) => ({
      ...item,
      costo_por_lead:
        item.leads !== 0 ? (item.costo_real / item.leads).toFixed(3) : 0,
    }));
  };

  const newData = calcularCostoPorLead(data);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip bg-white p-2 rounded-md">
          <p>{`Campaña: ${label}`}</p>
          <p style={{ color: "#8884d8" }}>
            {`Costo: ${payload[0].payload.costo_real}`}
          </p>
          <p style={{ color: "#8884d8" }}>
            {`Costo por lead: ${payload[0].payload.costo_por_lead}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <RadarChart width={500} height={300} data={newData}>
      <PolarGrid />
      <PolarAngleAxis dataKey="name" />
      <PolarRadiusAxis />
      <Radar
        name="Campañas"
        dataKey="leads"
        stroke="#8884d8"
        fill="#8884d8"
        fillOpacity={0.6}
      />
      <Tooltip content={<CustomTooltip />} />
    </RadarChart>
  );
};
