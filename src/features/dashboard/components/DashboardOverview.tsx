import { TransactionList } from '../../transactions';
import {
  BankStatementUpload,
  BankStatementListModal,
} from '../../bank-statements';
import { useState } from 'react';

export const DashboardOverview = () => {
  const [showBankStatementsModal, setShowBankStatementsModal] = useState(false);

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-base-content">MBB Dashboard</h1>
        <p className="text-base-content/60 mt-2">
          Welcome to your financial dashboard
        </p>
      </div>

      {/* Bank Statement Upload */}
      <div className="card bg-base-100 shadow-xl mb-6">
        <div className="card-body">
          <div className="flex justify-between items-center mb-4">
            <h2 className="card-title">Upload Bank Statements</h2>
            <button
              className="btn btn-outline btn-sm"
              onClick={() => setShowBankStatementsModal(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              View Statements
            </button>
          </div>
          <BankStatementUpload />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Quick Stats */}
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">Total Balance</div>
            <div className="stat-value text-primary">$25,400</div>
            <div className="stat-desc">↗︎ 400 (22%)</div>
          </div>
        </div>

        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">This Month</div>
            <div className="stat-value text-secondary">$4,200</div>
            <div className="stat-desc">↗︎ 40 (2%)</div>
          </div>
        </div>

        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">Transactions</div>
            <div className="stat-value">1,200</div>
            <div className="stat-desc">↘︎ 90 (14%)</div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title mb-4">Recent Transactions</h2>
          <TransactionList />
        </div>
      </div>

      {/* Bank Statements Modal */}
      <BankStatementListModal
        isOpen={showBankStatementsModal}
        onClose={() => setShowBankStatementsModal(false)}
      />
    </div>
  );
};
