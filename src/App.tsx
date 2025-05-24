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
  { key: 'id' as keyof BankStatement, header: 'ID' },
  { key: 'date' as keyof BankStatement, header: 'Date' },
  { key: 'account_number' as keyof BankStatement, header: 'Account #' },
  { key: 'created_at' as keyof BankStatement, header: 'Created' },
];

const transactionColumns = [
  { key: 'id' as keyof Transaction, header: 'ID' },
  { key: 'date' as keyof Transaction, header: 'Date' },
  { key: 'amount' as keyof Transaction, header: 'Amount' },
  { key: 'description' as keyof Transaction, header: 'Description' },
];

const getSummary = (transactions: Transaction[]) => {
  const total = transactions.reduce((sum, t) => sum + t.amount, 0);
  const income = transactions
    .filter((t) => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);
  const expense = transactions
    .filter((t) => t.amount < 0)
    .reduce((sum, t) => sum + t.amount, 0);
  return { total, income, expense };
};

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

  const summary = getSummary(transactions);

  return (
    <div
      style={{
        maxWidth: '100vw',
        minHeight: '100vh',
        margin: 0,
        padding: 2,
        boxSizing: 'border-box',
        background: 'linear-gradient(to bottom, #020917, #101725)',
        color: '#fff',
        fontSize: 11,
        lineHeight: 1.2,
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: 4,
          alignItems: 'center',
          marginBottom: 2,
        }}
      >
        <header style={{ marginBottom: 2, fontSize: 18, fontWeight: 700 }}>
          MBB Dashboard
        </header>
        <DateRangeSelector value={dateRange} onChange={setDateRange} />
        <FileUploader />
        {isPending && <span>Loading...</span>}
      </div>
      <div style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
        <div
          style={{
            background: '#181f2e',
            borderRadius: 2,
            padding: 2,
            flex: 1,
          }}
        >
          <div style={{ fontWeight: 600, marginBottom: 1 }}>Summary</div>
          <div style={{ display: 'flex', gap: 8, fontSize: 10 }}>
            <div>
              Total:{' '}
              <b>
                {summary.total.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}
              </b>
            </div>
            <div>
              Income:{' '}
              <b style={{ color: '#4caf50' }}>
                {summary.income.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}
              </b>
            </div>
            <div>
              Expense:{' '}
              <b style={{ color: '#f44336' }}>
                {summary.expense.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}
              </b>
            </div>
            <div>
              Count: <b>{transactions.length}</b>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'repeat(2, 110px)',
          gap: 4,
          marginBottom: 4,
        }}
      >
        <div style={{ background: '#181f2e', borderRadius: 2, padding: 2 }}>
          <BalanceOverTimeChart transactions={transactions} />
        </div>
        <div style={{ background: '#181f2e', borderRadius: 2, padding: 2 }}>
          <IncomeVsExpenseChart transactions={transactions} />
        </div>
        <div style={{ background: '#181f2e', borderRadius: 2, padding: 2 }}>
          <SpendingByCategoryChart transactions={transactions} />
        </div>
        <div style={{ background: '#181f2e', borderRadius: 2, padding: 2 }}>
          <TransactionCountChart transactions={transactions} />
        </div>
        <div style={{ background: '#181f2e', borderRadius: 2, padding: 2 }}>
          <AverageTransactionAmountChart transactions={transactions} />
        </div>
        <div
          style={{
            background: '#181f2e',
            borderRadius: 2,
            padding: 2,
            overflow: 'auto',
          }}
        >
          <div style={{ fontWeight: 600, marginBottom: 1 }}>
            Bank Statements
          </div>
          <Table
            columns={statementColumns}
            data={statements}
            pageSize={5}
            pageSizeOptions={[5, 10]}
            compact
          />
        </div>
      </div>
      <div
        style={{
          background: '#181f2e',
          borderRadius: 2,
          padding: 2,
          overflow: 'auto',
        }}
      >
        <div style={{ fontWeight: 600, marginBottom: 1 }}>Transactions</div>
        <Table
          columns={transactionColumns}
          data={transactions}
          pageSize={10}
          pageSizeOptions={[10, 20, 50]}
          compact
        />
      </div>
    </div>
  );
};

export default App;
