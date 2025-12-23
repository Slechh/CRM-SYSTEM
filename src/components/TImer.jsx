import { useState, useEffect } from "react";

export function Timer() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  return (
    <div className="flex items-center gap-1 text-2xl font-bold text-white tabular-nums tracking-wider">
      <span>{hours}</span>
      <span>:</span>
      <span>{minutes}</span>
      <span>:</span>
      <span>{seconds}</span>
    </div>
  );
}
