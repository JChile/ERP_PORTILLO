import React from 'react';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from 'recharts';

export const DiagramRetornoLeadCampania = ({ data }) => (
  <BarChart width={500} height={300} data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} tick={{ fontSize: 10 }} />
    <YAxis />
    <Tooltip />

    {Object.keys(data[0]).map((key) => {
      // Excluir la clave 'name' del mapeo ya que se utiliza para el eje X
      if (key !== 'name') {
        return (
          <Bar
            key={key}
            type="monotone"
            dataKey={key}
            stroke={`#${Math.floor(Math.random()*16777215).toString(16)}`} // Color aleatorio
            activeDot={{ r: 8 }}
          />
        );
      }
      return null;
    })}
  </BarChart>
);
