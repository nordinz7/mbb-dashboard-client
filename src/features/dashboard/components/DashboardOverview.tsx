import { TransactionList } from '../../transactions';

export const DashboardOverview = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-base-content">MBB Dashboard</h1>
        <p className="text-base-content/60 mt-2">
          Welcome to your financial dashboard
        </p>
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
          <TransactionList limit={10} />
        </div>
      </div>
    </div>
  );
};
