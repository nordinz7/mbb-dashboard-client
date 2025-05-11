import React from "react";

interface Transaction {
  date: string;
  desc: string;
  trans: number;
  bal: number;
}

interface CreditDebitDisplayProps {
  transactions: Transaction[];
}

const CreditDebitDisplay: React.FC<CreditDebitDisplayProps> = ({
  transactions,
}) => {
  const dates = transactions.map((t) => t.date);
  const creditData = transactions.map((t) => (t.trans > 0 ? t.trans : 0));
  const debitData = transactions.map((t) =>
    t.trans < 0 ? Math.abs(t.trans) : 0
  );

  const totalCredit = creditData.reduce((a, b) => a + b, 0);
  const totalDebit = debitData.reduce((a, b) => a + b, 0);

  const width = 600;
  const height = 300;
  const padding = 40;

  const maxY = Math.max(...creditData, ...debitData, 10); // avoid divide by zero
  const pointCount = transactions.length;

  // Scale data to fit the chart size
  const getX = (i: number) =>
    padding + (i * (width - 2 * padding)) / (pointCount - 1);
  const getY = (val: number) =>
    height - padding - (val * (height - 2 * padding)) / maxY;

  const linePath = (data: number[]) =>
    data
      .map((val, i) => `${i === 0 ? "M" : "L"} ${getX(i)},${getY(val)}`)
      .join(" ");

  return (
    <div>
      <svg
        width={width}
        height={height}
        style={{ background: "#f8f8f8", borderRadius: 8 }}
      >
        {/* Axes */}
        <line
          x1={padding}
          y1={padding}
          x2={padding}
          y2={height - padding}
          stroke="#ccc"
        />
        <line
          x1={padding}
          y1={height - padding}
          x2={width - padding}
          y2={height - padding}
          stroke="#ccc"
        />

        {/* Credit line */}
        <path
          d={linePath(creditData)}
          stroke="#7be87b"
          fill="none"
          strokeWidth={2}
        />
        {/* Debit line */}
        <path
          d={linePath(debitData)}
          stroke="#ff8a8a"
          fill="none"
          strokeWidth={2}
        />

        {/* Dots */}
        {creditData.map((val, i) => (
          <circle
            key={`c-${i}`}
            cx={getX(i)}
            cy={getY(val)}
            r={3}
            fill="#7be87b"
          />
        ))}
        {debitData.map((val, i) => (
          <circle
            key={`d-${i}`}
            cx={getX(i)}
            cy={getY(val)}
            r={3}
            fill="#ff8a8a"
          />
        ))}
      </svg>
    </div>
  );
};

export default CreditDebitDisplay;
