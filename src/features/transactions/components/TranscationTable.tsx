import { Transaction } from '../types/transaction.types';

export function TransactionTable({
  list,
  offset = 0,
}: {
  list: Transaction[];
  offset?: number;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="table table-xs">
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Amount (RM)</th>
            <th>Description</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {list.map((transaction, index) => (
            <tr key={transaction.id}>
              <th>{offset + index + 1}</th>
              <td>{transaction.date}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.description}</td>
              <td>{transaction.balance}</td>
            </tr>
          ))}
        </tbody>
        <tfoot></tfoot>
      </table>
    </div>
  );
}
