import React, { useState } from 'react';

type Column<T> = {
  key: keyof T;
  header: string;
};

type TableProps<T> = {
  columns: Column<T>[];
  data: T[];
  pageSize?: number;
  pageSizeOptions?: number[];
  compact?: boolean;
};

const getPageNumbers = (
  current: number,
  total: number,
): (number | string)[] => {
  const delta = 2;
  const range: (number | string)[] = [];

  const start = Math.max(2, current - delta);
  const end = Math.min(total - 1, current + delta);

  for (let i = start; i <= end; i++) {
    range.push(i);
  }

  if (start > 2) {
    range.unshift('...');
  }
  if (end < total - 1) {
    range.push('...');
  }

  range.unshift(1);
  if (total > 1) {
    range.push(total);
  }

  return range;
};

function Table<T extends object>({
  columns,
  data,
  pageSize = 10,
  pageSizeOptions = [10, 20, 50],
  compact = false,
}: TableProps<T>) {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(pageSize);

  const totalPages = Math.ceil(data.length / size);
  const paginatedData = data.slice((page - 1) * size, page * size);

  const handlePageChange = (p: number | string) => {
    if (typeof p === 'number' && p >= 1 && p <= totalPages) {
      setPage(p);
    }
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSize(Number(e.target.value));
    setPage(1);
  };

  const pageNumbers = getPageNumbers(page, totalPages);

  return (
    <div>
      <table
        style={{
          width: '100%',
          fontSize: compact ? 11 : undefined,
          borderSpacing: 0,
        }}
      >
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                style={{
                  padding: compact ? '2px 4px' : undefined,
                  fontWeight: 600,
                  background: compact ? '#232b3b' : undefined,
                }}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, idx) => (
            <tr key={idx}>
              {columns.map((col) => (
                <td
                  key={String(col.key)}
                  style={{
                    padding: compact ? '2px 4px' : undefined,
                    maxWidth: 120,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div
        style={{
          marginTop: compact ? 2 : '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: compact ? 4 : '1rem',
          fontSize: compact ? 11 : undefined,
        }}
      >
        <span>
          Rows:{' '}
          <select
            value={size}
            onChange={handleSizeChange}
            style={{ fontSize: compact ? 11 : undefined }}
          >
            {pageSizeOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </span>
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          style={{ fontSize: compact ? 11 : undefined }}
        >
          Prev
        </button>
        {pageNumbers.map((num, idx) =>
          num === '...' ? (
            <span key={idx} style={{ margin: '0 2px' }}>
              ...
            </span>
          ) : (
            <button
              key={num}
              onClick={() => handlePageChange(num)}
              disabled={num === page}
              style={{
                fontWeight: num === page ? 'bold' : undefined,
                textDecoration: num === page ? 'underline' : undefined,
                margin: '0 1px',
                fontSize: compact ? 11 : undefined,
              }}
            >
              {num}
            </button>
          ),
        )}
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          style={{ fontSize: compact ? 11 : undefined }}
        >
          Next
        </button>
        <span>{`Page ${page} of ${totalPages}`}</span>
      </div>
    </div>
  );
}

export default Table;
