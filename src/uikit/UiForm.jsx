import { useState } from "react";
import { fetchExperts } from "../api/experts";

export function UiForm({ formData, handleReset, children, className, handleUpdateList }) {
  const token = sessionStorage.getItem("authToken");
  const [message, setMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/v1/experts/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          specializationId: Number(formData.specializationId),
        }),
      });

      if (!response.ok) {
        throw new Error("Ошибка при создании эксперта");
      }

      const result = await response.json();
      setMessage("Эксперт создан! ID: " + result.id);
      handleReset();
      const updatedUsers = await fetchExperts({ token });
      handleUpdateList(updatedUsers);
    } catch (error) {
      setMessage(error.message);
    }
  };
  return (
    <form onSubmit={handleSubmit} className={className}>
      {children}
      {message && <p>{message}</p>}
    </form>
  );
}
