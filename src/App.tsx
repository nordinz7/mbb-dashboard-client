import './App.css';
import BalanceOverTimeChart from './components/BalanceOverTimeChart';
import IncomeVsExpenseChart from './components/IncomeVsExpenseChart';
import SpendingByCategoryChart from './components/SpendingByCategoryChart';
import TransactionCountChart from './components/TransactionCountChart';
import AverageTransactionAmountChart from './components/AverageTransactionAmountChart';
import DateRangeSelector, { DateRange } from './components/DateRangeSelector';
import Table from './components/reusable/Table';
import FileUploader from './components/FileUploader';
import React, { useEffect, useState, useTransition } from 'react';
import { fetchBankStatements, fetchTransactions } from './api';
import { BankStatement, Transaction } from './types';

const getDefaultLastMonthRange = (): DateRange => {
  const now = new Date();
  const from = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const to = new Date(now.getFullYear(), now.getMonth(), 0); // last day of previous month
  return {
    from: from.toISOString().slice(0, 10),
    to: to.toISOString().slice(0, 10),
  };
};

const statementColumns = [
  { key: 'id', header: 'ID' },
  { key: 'date', header: 'Date' },
  { key: 'account_number', header: 'Account Number' },
  { key: 'created_at', header: 'Created At' },
];

const transactionColumns = [
  { key: 'id', header: 'ID' },
  { key: 'date', header: 'Date' },
  { key: 'amount', header: 'Amount' },
  { key: 'description', header: 'Description' },
];

const App = () => {
  const [dateRange, setDateRange] = useState<DateRange>(
    getDefaultLastMonthRange(),
  );
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [statements, setStatements] = useState<BankStatement[]>([]);
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
      fetchBankStatements({ ...params, account_number: '162021851156' })
        .then((o) => setStatements(o.rows))
        .catch(console.error);
    });
  }, [dateRange]);

  return (
    <div
      style={{
        maxWidth: '100vw',
        minHeight: '100vh',
        margin: 0,
        padding: 8,
        boxSizing: 'border-box',
        background: 'linear-gradient(to bottom, #020917, #101725)',
        color: '#fff',
        fontSize: 13,
      }}
    >
      <header style={{ marginBottom: 4, fontSize: 18, fontWeight: 700 }}>
        MBB Dashboard
      </header>
      <div
        style={{
          display: 'flex',
          gap: 8,
          alignItems: 'center',
          marginBottom: 4,
        }}
      >
        <FileUploader />
        <DateRangeSelector value={dateRange} onChange={setDateRange} />
        {isPending && <span>Loading...</span>}
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: 'repeat(3, 180px)',
          gap: 8,
          marginBottom: 8,
        }}
      >
        <div style={{ background: '#181f2e', borderRadius: 4, padding: 4 }}>
          <BalanceOverTimeChart transactions={transactions} height={160} />
        </div>
        <div style={{ background: '#181f2e', borderRadius: 4, padding: 4 }}>
          <IncomeVsExpenseChart transactions={transactions} height={160} />
        </div>
        <div style={{ background: '#181f2e', borderRadius: 4, padding: 4 }}>
          <SpendingByCategoryChart transactions={transactions} height={160} />
        </div>
        <div style={{ background: '#181f2e', borderRadius: 4, padding: 4 }}>
          <TransactionCountChart transactions={transactions} height={160} />
        </div>
        <div style={{ background: '#181f2e', borderRadius: 4, padding: 4 }}>
          <AverageTransactionAmountChart
            transactions={transactions}
            height={160}
          />
        </div>
        <div
          style={{
            background: '#181f2e',
            borderRadius: 4,
            padding: 4,
            overflow: 'auto',
          }}
        >
          <div style={{ fontWeight: 600, marginBottom: 2 }}>
            Bank Statements
          </div>
          <Table
            columns={statementColumns}
            data={statements}
            pageSize={3}
            pageSizeOptions={[3]}
            compact
          />
        </div>
      </div>
      <div
        style={{
          background: '#181f2e',
          borderRadius: 4,
          padding: 4,
          overflow: 'auto',
        }}
      >
        <div style={{ fontWeight: 600, marginBottom: 2 }}>Transactions</div>
        <Table
          columns={transactionColumns}
          data={transactions}
          pageSize={5}
          pageSizeOptions={[5]}
          compact
        />
      </div>
    </div>
  );
};

export default App;
