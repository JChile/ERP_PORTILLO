import React from "react";
import {
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export const EstadoLeadDiagram = ({ data }) => {
  const BarChartExample = () => {
    return (
      <BarChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="descripcion"
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
        <Bar dataKey="conteo" name="costo_por_lead" fill="#8884d8" />
      </BarChart>
    );
  };

  const RadarChartExample = () => {
    return (
      <RadarChart width={500} height={300} data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="descripcion" tick={{ fontSize: 13 }} />
        <PolarRadiusAxis />
        <Radar
          name="Estado"
          dataKey="conteo"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.6}
        />
        <Tooltip />
      </RadarChart>
    );
  };

  return (
    <div>
      <h2>Gráfico de barras de los estados del lead</h2>
      <BarChartExample />

      <h2>Gráfico de radar de los estados del lead</h2>
      <RadarChartExample />
    </div>
  );
};
