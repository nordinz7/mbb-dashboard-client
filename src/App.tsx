import './App.css';
import FileUploader from './components/Fileuploader';
import BalanceOverTimeChart from './components/BalanceOverTimeChart';
import IncomeVsExpenseChart from './components/IncomeVsExpenseChart';
import SpendingByCategoryChart from './components/SpendingByCategoryChart';
import TransactionCountChart from './components/TransactionCountChart';
import AverageTransactionAmountChart from './components/AverageTransactionAmountChart';

const App = () => {
  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 24 }}>
      <h1>MBB Dashboard</h1>
      <FileUploader />
      <h2>Balance Over Time</h2>
      <BalanceOverTimeChart />
      <h2>Income vs Expense Over Time</h2>
      <IncomeVsExpenseChart />
      <h2>Spending by Category</h2>
      <SpendingByCategoryChart />
      <h2>Transaction Count Over Time</h2>
      <TransactionCountChart />
      <h2>Average Transaction Amount</h2>
      <AverageTransactionAmountChart />
    </div>
  );
};

export default App;
