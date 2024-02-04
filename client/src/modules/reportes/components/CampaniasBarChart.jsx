import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar } from 'recharts';

const data = [
  { name: 'Año Nuevo Portillo', coste_estimado: 700, coste_real: 800 },
  { name: 'ProyectoX_organico', coste_estimado: 0, coste_real: 0 },
];

export const CampaniasBarChart = () => (
  <BarChart width={500} height={300} data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Bar type="monotone" dataKey="coste_estimado" stroke="#8884d8" activeDot={{ r: 8 }} />
    <Bar type="monotone" dataKey="coste_real" stroke="#82ca9d" />
  </BarChart>
);