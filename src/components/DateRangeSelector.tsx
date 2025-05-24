import React from 'react';

export interface DateRange {
  from: string;
  to: string;
}

interface DateRangeSelectorProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
}

const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({
  value,
  onChange,
}) => {
  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...value, from: e.target.value });
  };
  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...value, to: e.target.value });
  };
  return (
    <>
      <label>
        From:
        <input type="date" value={value.from} onChange={handleFromChange} />
      </label>
      <label>
        To:
        <input type="date" value={value.to} onChange={handleToChange} />
      </label>
    </>
  );
};

export default DateRangeSelector;
