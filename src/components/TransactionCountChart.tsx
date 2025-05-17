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
  { date: '2025-05-01', count: 5 },
  { date: '2025-05-02', count: 8 },
  { date: '2025-05-03', count: 3 },
  { date: '2025-05-04', count: 7 },
];

const TransactionCountChart: React.FC = () => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="count" fill="#8884d8" name="Transaction Count" />
    </BarChart>
  </ResponsiveContainer>
);

export default TransactionCountChart;
