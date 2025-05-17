import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Transaction } from '../types';

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#A28BFE',
  '#FF6F91',
  '#FFD36E',
];

interface SpendingByCategoryChartProps {
  transactions: Transaction[];
}

const SpendingByCategoryChart: React.FC<SpendingByCategoryChartProps> = ({
  transactions,
}) => {
  // Group negative transactions by description (as category)
  const grouped: Record<string, number> = {};
  transactions.forEach((tx) => {
    if (tx.amount < 0) {
      grouped[tx.description] =
        (grouped[tx.description] || 0) + Math.abs(tx.amount);
    }
  });
  const data = Object.entries(grouped).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        {/* <Legend /> */}
      </PieChart>
    </ResponsiveContainer>
  );
};

export default SpendingByCategoryChart;
