import {
  Transaction,
  TransactionQueryParams,
} from '../types/transaction.types';

export function TransactionTable({
  list,
  offset = 0,
  onSort,
  currentSort,
  onFilter,
  filters = {},
}: {
  list: Transaction[];
  offset?: number;
  onSort?: (column: keyof Transaction) => void;
  currentSort?: TransactionQueryParams['sort'];
  onFilter?: (filters: Partial<TransactionQueryParams>) => void;
  filters?: Partial<TransactionQueryParams>;
}) {
  const getSortIcon = (column: keyof Transaction) => {
    if (currentSort === column) return '↑';
    if (currentSort === `-${column}`) return '↓';
    return '↕';
  };

  const handleSort = (column: keyof Transaction) => {
    if (onSort) {
      onSort(column);
    }
  };
  return (
    <div className="space-y-4">
      {/* Current Filters Display */}
      <div className="flex flex-wrap gap-2">
        <span className="text-sm font-medium text-base-content/70">
          Active Filters:
        </span>
        {filters.q && (
          <span className="badge badge-outline badge-sm">
            Search: &ldquo;{filters.q}&rdquo;
          </span>
        )}
        {filters.date_from && (
          <span className="badge badge-outline badge-sm">
            From: {filters.date_from}
          </span>
        )}
        {filters.date_to && (
          <span className="badge badge-outline badge-sm">
            To: {filters.date_to}
          </span>
        )}
        {filters.bank_statement_id && (
          <span className="badge badge-outline badge-sm">
            Statement ID: {filters.bank_statement_id}
          </span>
        )}
        {currentSort && (
          <span className="badge badge-outline badge-sm">
            Sort:{' '}
            {currentSort.startsWith('-')
              ? `${currentSort.slice(1)} ↓`
              : `${currentSort} ↑`}
          </span>
        )}
      </div>

      {/* Filter Controls */}
      {onFilter && (
        <div className="bg-base-200 p-4 rounded-lg space-y-4">
          <h3 className="font-semibold text-base-content">Filters</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search Query */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Search</span>
              </label>
              <input
                type="text"
                placeholder="Search transactions..."
                className="input input-bordered input-sm"
                value={filters.q || ''}
                onChange={(e) => {
                  console.log('--------vv', e.target.value);
                  onFilter({ ...filters, q: e.target.value });
                }}
              />
            </div>

            {/* Date From */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">From Date</span>
              </label>
              <input
                type="date"
                className="input input-bordered input-sm"
                value={filters.date_from || ''}
                onChange={(e) =>
                  onFilter({ ...filters, date_from: e.target.value })
                }
              />
            </div>

            {/* Date To */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">To Date</span>
              </label>
              <input
                type="date"
                className="input input-bordered input-sm"
                value={filters.date_to || ''}
                onChange={(e) =>
                  onFilter({ ...filters, date_to: e.target.value })
                }
              />
            </div>

            {/* Bank Statement ID */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Bank Statement ID</span>
              </label>
              <input
                type="number"
                placeholder="Statement ID"
                className="input input-bordered input-sm"
                value={filters.bank_statement_id || ''}
                onChange={(e) =>
                  onFilter({
                    ...filters,
                    bank_statement_id: e.target.value
                      ? Number(e.target.value)
                      : undefined,
                  })
                }
              />
            </div>
          </div>

          {/* Clear Filters Button */}
          <div className="flex justify-end">
            <button
              className="btn btn-outline btn-sm"
              onClick={() => onFilter({})}
            >
              Clear Filters
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table table-xs">
          <thead>
            <tr>
              <th>#</th>
              <th
                className={
                  onSort ? 'cursor-pointer hover:bg-base-200 select-none' : ''
                }
                onClick={() => handleSort('date')}
              >
                Date{' '}
                {onSort && <span className="ml-1">{getSortIcon('date')}</span>}
              </th>
              <th
                className={
                  onSort ? 'cursor-pointer hover:bg-base-200 select-none' : ''
                }
                onClick={() => handleSort('amount')}
              >
                Amount (RM){' '}
                {onSort && (
                  <span className="ml-1">{getSortIcon('amount')}</span>
                )}
              </th>
              <th
                className={
                  onSort ? 'cursor-pointer hover:bg-base-200 select-none' : ''
                }
                onClick={() => handleSort('description')}
              >
                Description{' '}
                {onSort && (
                  <span className="ml-1">{getSortIcon('description')}</span>
                )}
              </th>
              <th
                className={
                  onSort ? 'cursor-pointer hover:bg-base-200 select-none' : ''
                }
                onClick={() => handleSort('balance')}
              >
                Balance{' '}
                {onSort && (
                  <span className="ml-1">{getSortIcon('balance')}</span>
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {list.map((transaction, index) => (
              <tr
                key={transaction.id}
                className="hover:bg-gray-100 transition-colors"
              >
                <th className="font-semibold text-gray-700">
                  {offset + index + 1}
                </th>
                <td className="text-gray-600">
                  {new Date(transaction.date).toLocaleDateString()}
                </td>
                <td
                  className={`font-mono ${Number(transaction.amount) < 0 ? 'text-red-600' : 'text-green-600'}`}
                >
                  {Number(transaction.amount).toLocaleString('en-MY', {
                    style: 'currency',
                    currency: 'MYR',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td className="text-gray-700">{transaction.description}</td>
                <td className="font-mono text-blue-700">
                  {Number(transaction.balance).toLocaleString('en-MY', {
                    style: 'currency',
                    currency: 'MYR',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot></tfoot>
        </table>
      </div>
    </div>
  );
}
