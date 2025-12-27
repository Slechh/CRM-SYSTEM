import clsx from "clsx";
import { Icon } from "../components/Icon";

export function UiSelect({
  label,
  value,
  options,
  onChange,
  className,
  placeholder,
  disabled, 
}) {
  return (
    <div className={clsx("flex flex-col gap-y-1.5", className)}>
      <label className="text-sm text-black font-bold ml-2">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled} 
          className={clsx(
            "w-full border-2 border-formBorder rounded-2xl pl-4 py-3 pr-10 shadow-sm focus:border-blue-500 focus:outline-none transition-colors duration-300 appearance-none bg-white cursor-pointer font-normal",
            disabled && "bg-gray-50" 
          )}
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.name}
            </option>
          ))}
        </select>

        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <Icon id="chevron-down" className="w-3 h-3" />
        </div>
      </div>
    </div>
  );
}
