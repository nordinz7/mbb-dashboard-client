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
import { Transaction } from '../types';

interface IncomeVsExpenseChartProps {
  transactions: Transaction[];
}

const IncomeVsExpenseChart: React.FC<IncomeVsExpenseChartProps> = ({
  transactions,
}) => {
  // Group by date, sum income and expense
  const grouped: Record<string, { income: number; expense: number }> = {};
  transactions.forEach((tx) => {
    if (!grouped[tx.date]) grouped[tx.date] = { income: 0, expense: 0 };
    if (tx.amount > 0) grouped[tx.date].income += tx.amount;
    else grouped[tx.date].expense += Math.abs(tx.amount);
  });
  const data = Object.entries(grouped)
    .map(([date, { income, expense }]) => ({ date, income, expense }))
    .sort((a, b) => a.date.localeCompare(b.date));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={data}
        margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        {/* <Legend /> */}
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
};

export default IncomeVsExpenseChart;
