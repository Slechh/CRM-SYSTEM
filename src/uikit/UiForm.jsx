import { useState } from "react";
import { createExpert } from "../api/createExpert";
import { UiButton } from "./UiButton";

export function UiForm({
  formData,
  handleReset,
  children,
  className,
  onSuccess,
  label,
  isDisabled,
}) {
  const token = sessionStorage.getItem("authToken");
  const [message, setMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createExpert({
        token,
        data: formData,
      });

      handleReset();
      onSuccess?.();
    } catch (error) {
      setMessage(error.message);
    }
  };
  return (
    <form onSubmit={handleSubmit} className={className}>
      {children}
      <div className="mt-6 flex justify-end ">
        <UiButton btnType="submit" size="lg" type="big" disabled={isDisabled}>
          <span> Create {label}</span>
        </UiButton>
      </div>
      {message && <p>{message}</p>}
    </form>
  );
}
