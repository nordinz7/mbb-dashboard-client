import { useTransactions } from '../hooks/useTransactions';
import { TransactionQueryParams } from '../types/transaction.types';
import { TransactionTable } from './TranscationTable';
import { PaginationComponent, usePagination } from '../../../shared';

type TransactionListProps = {} & Omit<
  TransactionQueryParams,
  'limit' | 'offset'
>;

export const TransactionList = ({ ...filters }: TransactionListProps) => {
  const { limit, offset, handlePageChange } = usePagination();

  const { transactions, loading, error } = useTransactions({
    ...filters,
    limit,
    offset,
  });

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
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Transactions</h2>
      </div>

      <TransactionTable list={transactions.rows} offset={offset} />

      <PaginationComponent
        limit={transactions.limit}
        total={transactions.total}
        offset={transactions.offset}
        onPageChange={handlePageChange}
        disabled={loading}
      />
    </div>
  );
};
