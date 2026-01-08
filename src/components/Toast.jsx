import { useEffect } from "react";
import { Icon } from "./Icon";

export function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";

  return (
    <div
      className={`fixed top-5 right-5 ${bgColor} text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-3 z-50`}
    >
      <span className="font-semibold">{message}</span>
      <button onClick={onClose} className="hover:opacity-80">
        <Icon id="close" className="w-4 h-4" />
      </button>
    </div>
  );
}