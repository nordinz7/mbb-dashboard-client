import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Example data, replace with real data from API
const data = [
  { date: '2025-05-01', balance: 1200 },
  { date: '2025-05-02', balance: 1500 },
  { date: '2025-05-03', balance: 1100 },
  { date: '2025-05-04', balance: 1700 },
];

const BalanceOverTimeChart: React.FC = () => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="balance"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
    </LineChart>
  </ResponsiveContainer>
);

export default BalanceOverTimeChart;
