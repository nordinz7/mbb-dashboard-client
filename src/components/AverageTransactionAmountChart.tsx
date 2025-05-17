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
import { Transaction } from '../types';

interface AverageTransactionAmountChartProps {
  transactions: Transaction[];
}

const AverageTransactionAmountChart: React.FC<
  AverageTransactionAmountChartProps
> = ({ transactions }) => {
  // Group by date, calculate average amount (absolute value)
  const grouped: Record<string, { sum: number; count: number }> = {};
  transactions.forEach((tx) => {
    if (!grouped[tx.date]) grouped[tx.date] = { sum: 0, count: 0 };
    grouped[tx.date].sum += Math.abs(tx.amount);
    grouped[tx.date].count += 1;
  });
  const data = Object.entries(grouped)
    .map(([date, { sum, count }]) => ({ date, avg: count ? sum / count : 0 }))
    .sort((a, b) => a.date.localeCompare(b.date));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        {/* <Legend /> */}
        <Bar dataKey="avg" fill="#82ca9d" name="Average Amount" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default AverageTransactionAmountChart;
