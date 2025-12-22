import clsx from "clsx";
import { forwardRef } from "react";

export const InputUi = forwardRef(
  ({ className, label, placeholder, isDisabled, type, ...props }, ref) => {
    return (
      <div className={clsx("flex flex-col gap-y-1.5", className)}>
        <label className="text-sm text-navText ml-1.5 font-bold">{label}</label>
        <input
          ref={ref}
          type={type}
          disabled={isDisabled}
          placeholder={placeholder}
          className="border-2 border-formBorder rounded-2xl px-4 py-3 shadow-sm focus:border-blue-500 focus:outline-none transition-colors duration-300 font-normal [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          {...props}
        />
      </div>
    );
  }
);
