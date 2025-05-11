import React, { useState } from "react";

const DateRangeSelector: React.FC = () => {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  return (
    <div>
      <label>
        Start Date:
        <input
          type="date"
          value={start}
          onChange={(e) => setStart(e.target.value)}
        />
      </label>
      <label>
        End Date:
        <input
          type="date"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
        />
      </label>
    </div>
  );
};

export default DateRangeSelector;
