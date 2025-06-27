import React from 'react';
import { Transaction } from '../types/transaction.types';

interface TransactionCardProps {
  transaction: Transaction;
  onClick?: (transaction: Transaction) => void;
}

export const TransactionCard: React.FC<TransactionCardProps> = ({
  transaction,
  onClick,
}) => {
  const handleClick = () => {
    onClick?.(transaction);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div
      className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
      onClick={handleClick}
    >
      <div className="card-body p-4">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="card-title text-sm font-medium truncate">
              {transaction.description}
            </h3>
            <p className="text-xs text-base-content/60 mt-1">
              {formatDate(transaction.date)}
            </p>
          </div>
          <div className="text-right ml-4">
            <p
              className={`font-semibold ${
                transaction.amount >= 0 ? 'text-success' : 'text-error'
              }`}
            >
              {transaction.amount >= 0 ? '+' : ''}
              {formatCurrency(transaction.amount)}
            </p>
            <p className="text-xs text-base-content/60">
              Balance: {formatCurrency(transaction.balance)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
