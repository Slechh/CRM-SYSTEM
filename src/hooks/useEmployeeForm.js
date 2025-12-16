import { useState } from "react";

export function useEmployeeForm(initial = {}) {
  const [data, setData] = useState(initial);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setData(initial);
  };

  return { data, handleChange, handleReset };
}
