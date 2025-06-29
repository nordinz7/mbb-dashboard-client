import React, { useState, useEffect } from 'react';
import { Modal, AccountSelector } from '../../../shared/components/ui';
import { useBankStatements } from '../hooks/useBankStatements';
import { BankStatement } from '../types/bank-statement.types';

interface BankStatementListModalProps {
  isOpen: boolean;
  onClose: () => void;
  accountNumber?: string;
}

interface MonthStatus {
  year: number;
  month: number;
  hasStatement: boolean;
  statement?: BankStatement;
  monthName: string;
}

export const BankStatementListModal: React.FC<BankStatementListModalProps> = ({
  isOpen,
  onClose,
  accountNumber,
}) => {
  const [selectedAccount, setSelectedAccount] = useState(accountNumber || '');
  const { bankStatements, loading, error } = useBankStatements({
    account_number: selectedAccount,
    sort: '-date',
  });

  const [monthsStatus, setMonthsStatus] = useState<MonthStatus[]>([]);

  useEffect(() => {
    if (bankStatements?.rows) {
      generateMonthsStatus(bankStatements.rows);
    }
  }, [bankStatements]);

  const generateMonthsStatus = (statements: BankStatement[]) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    // Get the earliest statement date or start from 2 years ago
    const earliestStatement = statements
      .map((s) => new Date(s.date))
      .sort((a, b) => a.getTime() - b.getTime())[0];

    const startDate = earliestStatement
      ? new Date(
          earliestStatement.getFullYear(),
          earliestStatement.getMonth(),
          1,
        )
      : new Date(currentYear - 2, 0, 1); // Start from 2 years ago if no statements

    const endDate = new Date(currentYear, currentMonth, 1);

    const months: MonthStatus[] = [];
    const statementsByMonth = new Map<string, BankStatement>();

    // Create a map of statements by year-month
    statements.forEach((statement) => {
      const date = new Date(statement.date);
      const key = `${date.getFullYear()}-${date.getMonth()}`;
      statementsByMonth.set(key, statement);
    });

    // Generate all months from start to current
    // eslint-disable-next-line prefer-const
    let currentIterDate = new Date(startDate);
    while (currentIterDate <= endDate) {
      const year = currentIterDate.getFullYear();
      const month = currentIterDate.getMonth();
      const key = `${year}-${month}`;
      const monthName = currentIterDate.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      });

      months.push({
        year,
        month,
        hasStatement: statementsByMonth.has(key),
        statement: statementsByMonth.get(key),
        monthName,
      });

      currentIterDate.setMonth(currentIterDate.getMonth() + 1);
    }

    setMonthsStatus(months.reverse()); // Show most recent first
  };

  const missingMonths = monthsStatus.filter((m) => !m.hasStatement);
  const availableMonths = monthsStatus.filter((m) => m.hasStatement);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Bank Statements Overview"
      size="xl"
    >
      <div className="space-y-6">
        {/* Account Number Selector */}
        <AccountSelector
          value={selectedAccount}
          onChange={setSelectedAccount}
          placeholder="Search and select account number"
          className="max-w-xs"
        />

        {loading && (
          <div className="flex justify-center py-8">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}

        {error && (
          <div className="alert alert-error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {selectedAccount && !loading && bankStatements && (
          <>
            {/* Summary Stats */}
            <div className="stats stats-vertical lg:stats-horizontal shadow w-full">
              <div className="stat">
                <div className="stat-title">Total Statements</div>
                <div className="stat-value text-primary">
                  {availableMonths.length}
                </div>
                <div className="stat-desc">Available months</div>
              </div>

              <div className="stat">
                <div className="stat-title">Missing Statements</div>
                <div className="stat-value text-error">
                  {missingMonths.length}
                </div>
                <div className="stat-desc">Months without data</div>
              </div>

              <div className="stat">
                <div className="stat-title">Coverage</div>
                <div className="stat-value text-secondary">
                  {monthsStatus.length > 0
                    ? Math.round(
                        (availableMonths.length / monthsStatus.length) * 100,
                      )
                    : 0}
                  %
                </div>
                <div className="stat-desc">Data completeness</div>
              </div>
            </div>

            {/* Missing Months Alert */}
            {missingMonths.length > 0 && (
              <div className="alert alert-warning">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
                <div>
                  <h3 className="font-bold">Missing Bank Statements!</h3>
                  <div className="text-xs">
                    You have {missingMonths.length} missing months:{' '}
                    {missingMonths
                      .slice(0, 3)
                      .map((m) => m.monthName)
                      .join(', ')}
                    {missingMonths.length > 3 &&
                      ` and ${missingMonths.length - 3} more...`}
                  </div>
                </div>
              </div>
            )}

            {/* Months Timeline */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Timeline Overview</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 max-h-96 overflow-y-auto">
                {monthsStatus.map((month) => (
                  <div
                    key={`${month.year}-${month.month}`}
                    className={`card card-compact border-2 ${
                      month.hasStatement
                        ? 'border-success bg-success/10'
                        : 'border-error bg-error/10'
                    }`}
                  >
                    <div className="card-body">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">
                          {month.monthName}
                        </span>
                        {month.hasStatement ? (
                          <div className="badge badge-success badge-sm">✓</div>
                        ) : (
                          <div className="badge badge-error badge-sm">✗</div>
                        )}
                      </div>
                      {month.statement && (
                        <div className="text-xs opacity-60">
                          Uploaded:{' '}
                          {new Date(
                            month.statement.created_at,
                          ).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Statement List Table */}
            {availableMonths.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Available Statements</h3>
                <div className="overflow-x-auto">
                  <table className="table table-zebra w-full">
                    <thead>
                      <tr>
                        <th>Month</th>
                        <th>Statement Date</th>
                        <th>Account Number</th>
                        <th>Uploaded</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {availableMonths.map((month) => (
                        <tr key={month.statement?.id}>
                          <td className="font-medium">{month.monthName}</td>
                          <td>
                            {new Date(
                              month.statement!.date,
                            ).toLocaleDateString()}
                          </td>
                          <td>
                            <code className="text-sm">
                              {month.statement!.account_number}
                            </code>
                          </td>
                          <td className="text-sm">
                            {new Date(
                              month.statement!.created_at,
                            ).toLocaleDateString()}
                          </td>
                          <td>
                            <button
                              className="btn btn-ghost btn-xs"
                              onClick={() => {
                                // TODO: Implement view statement details
                                console.log(
                                  'View statement:',
                                  month.statement?.id,
                                );
                              }}
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}

        {selectedAccount && !loading && !bankStatements?.rows?.length && (
          <div className="text-center py-8">
            <div className="text-base-content/60">
              No bank statements found for account: {selectedAccount}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
