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
  const [search, setSearch] = useState('');
  const [checked, setChecked] = useState<number[]>([]);

  const totalPages = Math.ceil(data.length / size);
  const filteredData = search
    ? data.filter((row) =>
        columns.some((col) =>
          String(row[col.key] ?? '')
            .toLowerCase()
            .includes(search.toLowerCase()),
        ),
      )
    : data;
  const paginatedData = filteredData.slice((page - 1) * size, page * size);
  const pageNumbers = getPageNumbers(
    page,
    Math.ceil(filteredData.length / size),
  );

  const handlePageChange = (p: number | string) => {
    if (
      typeof p === 'number' &&
      p >= 1 &&
      p <= Math.ceil(filteredData.length / size)
    ) {
      setPage(p);
    }
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSize(Number(e.target.value));
    setPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleCheckAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setChecked(paginatedData.map((_, idx) => idx));
    } else {
      setChecked([]);
    }
  };

  const handleCheckRow = (idx: number) => {
    setChecked((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx],
    );
  };

  return (
    <div className="flex flex-col">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="border border-gray-200 rounded-lg divide-y divide-gray-200 dark:border-neutral-700 dark:divide-neutral-700">
            <div className="py-3 px-4">
              <div className="relative max-w-xs">
                <label className="sr-only">Search</label>
                <input
                  type="text"
                  name="hs-table-with-pagination-search"
                  id="hs-table-with-pagination-search"
                  className="py-1.5 sm:py-2 px-3 ps-9 block w-full border-gray-200 shadow-2xs rounded-lg sm:text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  placeholder="Search for items"
                  value={search}
                  onChange={handleSearchChange}
                />
                <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-3">
                  <svg
                    className="size-4 text-gray-400 dark:text-neutral-500"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </svg>
                </div>
              </div>
            </div>
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                <thead className="bg-gray-50 dark:bg-neutral-700">
                  <tr>
                    <th scope="col" className="py-3 px-4 pe-0">
                      <div className="flex items-center h-5">
                        <input
                          id="hs-table-pagination-checkbox-all"
                          type="checkbox"
                          className="border-gray-200 rounded-sm text-blue-600 focus:ring-blue-500 dark:bg-neutral-700 dark:border-neutral-500 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                          checked={
                            checked.length === paginatedData.length &&
                            paginatedData.length > 0
                          }
                          onChange={handleCheckAll}
                        />
                        <label
                          htmlFor="hs-table-pagination-checkbox-all"
                          className="sr-only"
                        >
                          Checkbox
                        </label>
                      </div>
                    </th>
                    {columns.map((col) => (
                      <th
                        key={String(col.key)}
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                      >
                        {col.header}
                      </th>
                    ))}
                    <th className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                  {paginatedData.map((row, idx) => (
                    <tr key={idx}>
                      <td className="py-3 ps-4">
                        <div className="flex items-center h-5">
                          <input
                            id={`hs-table-pagination-checkbox-${idx}`}
                            type="checkbox"
                            className="border-gray-200 rounded-sm text-blue-600 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                            checked={checked.includes(idx)}
                            onChange={() => handleCheckRow(idx)}
                          />
                          <label
                            htmlFor={`hs-table-pagination-checkbox-${idx}`}
                            className="sr-only"
                          >
                            Checkbox
                          </label>
                        </div>
                      </td>
                      {columns.map((col) => (
                        <td
                          key={String(col.key)}
                          className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200"
                        >
                          {row[col.key] as React.ReactNode}
                        </td>
                      ))}
                      <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                        <button
                          type="button"
                          className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-hidden focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="py-1 px-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <span className="mr-2 text-sm">Rows:</span>
                <select
                  value={size}
                  onChange={handleSizeChange}
                  className="border-gray-200 rounded-lg px-2 py-1 text-sm dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400"
                >
                  {pageSizeOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
              <nav
                className="flex items-center space-x-1"
                aria-label="Pagination"
              >
                <button
                  type="button"
                  className="p-2.5 min-w-10 inline-flex justify-center items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                  aria-label="Previous"
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                >
                  <span aria-hidden="true">«</span>
                  <span className="sr-only">Previous</span>
                </button>
                {pageNumbers.map((num, idx) =>
                  num === '...' ? (
                    <span
                      key={idx}
                      className="min-w-10 flex justify-center items-center py-2.5 text-sm"
                    >
                      ...
                    </span>
                  ) : (
                    <button
                      key={num}
                      type="button"
                      className={`min-w-10 flex justify-center items-center text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 py-2.5 text-sm rounded-full disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:focus:bg-neutral-700 dark:hover:bg-neutral-700 ${num === page ? 'font-bold underline' : ''}`}
                      aria-current={num === page ? 'page' : undefined}
                      onClick={() => handlePageChange(num as number)}
                      disabled={num === page}
                    >
                      {num}
                    </button>
                  ),
                )}
                <button
                  type="button"
                  className="p-2.5 min-w-10 inline-flex justify-center items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                  aria-label="Next"
                  onClick={() => handlePageChange(page + 1)}
                  disabled={
                    page === Math.ceil(filteredData.length / size) ||
                    filteredData.length === 0
                  }
                >
                  <span className="sr-only">Next</span>
                  <span aria-hidden="true">»</span>
                </button>
              </nav>
              <span className="text-sm text-gray-500 dark:text-neutral-400">{`Page ${page} of ${Math.max(1, Math.ceil(filteredData.length / size))}`}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Table;
