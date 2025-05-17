import './App.css';
import FileUploader from './components/Fileuploader';
import BalanceOverTimeChart from './components/BalanceOverTimeChart';
import IncomeVsExpenseChart from './components/IncomeVsExpenseChart';
import SpendingByCategoryChart from './components/SpendingByCategoryChart';
import TransactionCountChart from './components/TransactionCountChart';
import AverageTransactionAmountChart from './components/AverageTransactionAmountChart';
import DateRangeSelector, { DateRange } from './components/DateRangeSelector';
import React, { useEffect, useState, useTransition } from 'react';
import { fetchTransactions } from './api';
import { Transaction } from './types';

const getDefaultLastMonthRange = (): DateRange => {
  const now = new Date();
  const from = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const to = new Date(now.getFullYear(), now.getMonth(), 0); // last day of previous month
  return {
    from: from.toISOString().slice(0, 10),
    to: to.toISOString().slice(0, 10),
  };
};

const App = () => {
  const [dateRange, setDateRange] = useState<DateRange>(
    getDefaultLastMonthRange(),
  );
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const params = {
      date_from: dateRange.from,
      date_to: dateRange.to,
      limit: 1000,
      offset: 0,
    };

    startTransition(async () => {
      fetchTransactions(params)
        .then((o) => setTransactions(o.rows))
        .catch(console.error);
    });
  }, [dateRange]);

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 24 }}>
      <h1>MBB Dashboard</h1>
      <FileUploader />
      <DateRangeSelector
        value={dateRange}
        onChange={(newRange) => {
          setDateRange(newRange);
        }}
      />
      {isPending && <div>Loading...</div>}
      <h2>Balance Over Time</h2>
      <BalanceOverTimeChart transactions={transactions} />
      <h2>Income vs Expense Over Time</h2>
      <IncomeVsExpenseChart transactions={transactions} />
      <h2>Spending by Category</h2>
      <SpendingByCategoryChart transactions={transactions} />
      <h2>Transaction Count Over Time</h2>
      <TransactionCountChart transactions={transactions} />
      <h2>Average Transaction Amount</h2>
      <AverageTransactionAmountChart transactions={transactions} />
    </div>
  );
};

export default App;
