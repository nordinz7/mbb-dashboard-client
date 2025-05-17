import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Example data, replace with real data from API
const data = [
  { date: '2025-05-01', avg: 240 },
  { date: '2025-05-02', avg: 180 },
  { date: '2025-05-03', avg: 210 },
  { date: '2025-05-04', avg: 300 },
];

const AverageTransactionAmountChart: React.FC = () => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="avg" fill="#82ca9d" name="Average Amount" />
    </BarChart>
  </ResponsiveContainer>
);

export default AverageTransactionAmountChart;
