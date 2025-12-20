import clsx from "clsx";
import { forwardRef } from "react";

export const InputUi = forwardRef(
  ({ className, label, placeholder, isDisabled, ...props }, ref) => {
    return (
      <div className={clsx("flex flex-col gap-y-1.5", className)}>
        <label className="text-sm text-navText ml-1.5 font-bold">{label}</label>
        <input
          disabled={isDisabled}
          placeholder={placeholder}
          ref={ref}
          {...props}
          className="border-2 border-formBorder rounded-2xl px-4 py-3 shadow-sm focus:border-blue-500 focus:outline-none transition-colors duration-300 font-normal"
        />
      </div>
    );
  }
);
