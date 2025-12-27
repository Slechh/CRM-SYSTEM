import { useState } from "react";

export function useProjectsForm(initial = {}) {
  const [data, setData] = useState(initial);
  //   const [errors, setErrors] = useState({});

  //   const validateField = (name, value) => {
  //     let error = "";

  //     if (!value) {
  //       error = "Поле обязательно";
  //     } else if (
  //       ["firstname", "lastname", "sourcingMethod", "jobTitle"].includes(name) &&
  //       value.length > 30
  //     ) {
  //       error = "Слишком длинное значение (макс 30 символов)";
  //     }

  //     setErrors((prev) => ({ ...prev, [name]: error }));
  //   };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // validateField(name, value);
  };

  const handleReset = () => {
    setData(initial);
    // setErrors({});
  };

  const isValid = Object.values(data).every(Boolean);
  // && Object.values(errors).every((e) => !e);

  return { data, handleChange, handleReset, isValid };

  //   return { data, handleChange, handleReset, isValid, errors };
}
