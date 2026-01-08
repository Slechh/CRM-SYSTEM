import { useState } from "react";
import { UiButton } from "./UiButton";

export function UiForm({
  formData,
  handleReset,
  children,
  className,
  onSuccess,
  onError,
  label,
  isDisabled,
  create,
}) {
  const token = sessionStorage.getItem("authToken");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await create?.({
        token,
        data: formData,
      });

      handleReset?.();

      if (onSuccess) {
        await onSuccess(); // ← ДОБАВЛЕН await
      }
    } catch (error) {
      setMessage(error.message);
      onError?.(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      {children}
      <div className="mt-6 flex justify-end">
        <UiButton btnType="submit" size="lg" type="big" disabled={isDisabled}>
          <span>Create {label}</span>
        </UiButton>
      </div>
      {message && <p className="text-red-500 text-sm mt-2">{message}</p>}
    </form>
  );
}
