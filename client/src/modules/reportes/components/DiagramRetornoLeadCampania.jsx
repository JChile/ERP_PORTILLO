import React from "react";
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from "recharts";

export const DiagramRetornoLeadCampania = ({ data }) => {
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
      const barColor = payload[0].payload.color;

      return (
        <div className="custom-tooltip bg-white p-2 rounded-md">
          <p>{`Campaña: ${label}`}</p>
          <p style={{ color: "#8884d8" }}>
            {`Leads: ${payload[0].payload.leads}`}
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
    <BarChart width={500} height={300} data={newData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="name"
        angle={-45}
        textAnchor="end"
        height={100}
        tick={{ fontSize: 12 }}
      />
      <YAxis />
      <Tooltip content={<CustomTooltip />} />
      <Bar dataKey="costo_por_lead" name="costo_por_lead" fill="#8884d8" />
    </BarChart>
  );
};
