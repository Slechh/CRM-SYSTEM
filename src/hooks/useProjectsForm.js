import { useState } from "react";

export function useProjectsForm(initial = {}) {
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

  const isValid = Object.values(data).every(Boolean);

  return { data, handleChange, handleReset, isValid };

}
