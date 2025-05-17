User Interfaces

1. Pdf file uploader
   - support multiple
   - show list of uploaded files
   - each list should succes or fail, option to override if already exists
2. Charts
   a. Balance Over Time (Line Chart)
   X-axis: date

   Y-axis: balance

   Shows how your account balance changes day by day or month by month.

   Useful for spotting trends, growth, or drops in your balance.

   b. Income vs Expense Over Time (Stacked Bar or Area Chart)
   Separate positive (amount > 0) and negative (amount < 0) transactions.

   Plot total income and total expenses per day/week/month.

   Helps visualize cash flow and identify spending spikes or income patterns.

   c. Spending by Category or Description (Pie Chart or Donut Chart)
   Group transactions by description or user-assigned category.

   Show percentage or total amount spent in each category.

   Useful for budgeting and seeing where money goes.

   d. Transaction Count or Volume Over Time (Bar Chart)
   Number of transactions per day/week/month.

   Detect periods of high financial activity or inactivity.

   e. Average Transaction Amount (Line or Bar Chart)
   Average spending or income per period.

   Helps monitor if your transaction amounts are growing or shrinking.

   Bonus Ideas:
   Cash Flow Waterfall Chart: Visualize how income and expenses impact balance.

   Savings Goal Progress: Track your progress toward a target balance.

3. api

# API Endpoints

## Bank Statements

- **POST** `/api/bank-statements/upload`

- **GET** `/api/bank-statements`

  - Query Parameters:
    - `account_number=123456789` mandatory
    - `date_from=YYYY-MM-DD`
    - `date_to=YYYY-MM-DD`
    - `limit=10`
    - `offset=0`
    - `sort=-createdAt` prefix - means DESC
    - `sort=updatedAt` prefix - means DESC
    - `sort=amount`

- **GET** `/api/bank-statements/:id`

- **DELETE** `/api/bank-statements/:id`

---

## Transactions

- **GET** `/api/transactions`

  - Query Parameters:
    - `q=search term`
    - `bank_statement_id=123`
    - `date_from=YYYY-MM-DD`
    - `date_to=YYYY-MM-DD`
    - `limit=10`
    - `offset=0`
    - `sort=createdAt`
    - `sort=-amount`

- **GET** `/api/transactions/:id`
