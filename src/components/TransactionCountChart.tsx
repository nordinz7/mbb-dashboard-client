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

interface TransactionCountChartProps {
  transactions: Transaction[];
}

const TransactionCountChart: React.FC<TransactionCountChartProps> = ({
  transactions,
}) => {
  // Count transactions per date
  const grouped: Record<string, number> = {};
  transactions.forEach((tx) => {
    grouped[tx.date] = (grouped[tx.date] || 0) + 1;
  });
  const data = Object.entries(grouped)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        {/* <Legend /> */}
        <Bar dataKey="count" fill="#8884d8" name="Transaction Count" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TransactionCountChart;
