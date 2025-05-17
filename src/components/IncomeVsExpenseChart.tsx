import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Example data, replace with real data from API
const data = [
  { date: '2025-05-01', income: 2000, expense: 800 },
  { date: '2025-05-02', income: 1500, expense: 1200 },
  { date: '2025-05-03', income: 1800, expense: 900 },
  { date: '2025-05-04', income: 2200, expense: 1100 },
];

const IncomeVsExpenseChart: React.FC = () => (
  <ResponsiveContainer width="100%" height={300}>
    <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Area
        type="monotone"
        dataKey="income"
        stackId="1"
        stroke="#82ca9d"
        fill="#82ca9d"
        name="Income"
      />
      <Area
        type="monotone"
        dataKey="expense"
        stackId="1"
        stroke="#ff7f7f"
        fill="#ff7f7f"
        name="Expense"
      />
    </AreaChart>
  </ResponsiveContainer>
);

export default IncomeVsExpenseChart;
