import React from 'react';
import { useTransactions } from '../hooks/useTransactions';
import { TransactionCard } from './TransactionCard';
import { Transaction } from '../types/transaction.types';

interface TransactionListProps {
  onTransactionClick?: (transaction: Transaction) => void;
  limit?: number;
}

export const TransactionList: React.FC<TransactionListProps> = ({
  onTransactionClick,
  limit = 50,
}) => {
  const { transactions, loading, error } = useTransactions(
    {},
    undefined,
    limit,
  );

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error">
        <span>Error loading transactions: {error}</span>
      </div>
    );
  }

  if (!transactions || transactions.rows.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-base-content/60">No transactions found</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Transactions</h2>
        <div className="text-sm text-base-content/60">
          Showing {transactions.rows.length} of {transactions.total}{' '}
          transactions
        </div>
      </div>

      {transactions.rows.map((transaction) => (
        <TransactionCard
          key={transaction.id}
          transaction={transaction}
          onClick={onTransactionClick}
        />
      ))}
    </div>
  );
};
