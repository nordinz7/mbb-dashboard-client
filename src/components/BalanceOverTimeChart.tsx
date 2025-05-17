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
import { Transaction } from '../types';

interface BalanceOverTimeChartProps {
  transactions: Transaction[];
}

const BalanceOverTimeChart: React.FC<BalanceOverTimeChartProps> = ({
  transactions,
}) => {
  // Group by date and get the last balance for each day
  const data = Array.from(
    transactions
      .slice()
      .sort((a, b) => a.date.localeCompare(b.date))
      .reduce(
        (acc, tx) => acc.set(tx.date, tx.balance),
        new Map<string, number>(),
      )
      .entries(),
  ).map(([date, balance]) => ({ date, balance }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        {/* <Legend /> */}
        <Line
          type="monotone"
          dataKey="balance"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default BalanceOverTimeChart;
