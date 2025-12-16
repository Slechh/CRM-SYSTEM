import clsx from "clsx";
export function UiInput({
  employeeData,
  handleChange,
  label,
  input,
  className,
  placeholder
}) {
  return (
    <div className={clsx("flex flex-col gap-y-1.5", className)}>
      <label className="text-sm text-navText font-bold ml-2">{label}</label>
      <input
        name={input}
        value={employeeData} 
        onChange={handleChange} 
        placeholder={placeholder} 
        autoComplete="off"
        className="border-2 border-formBorder rounded-2xl pl-4 py-3 shadow-sm focus:border-blue-500 focus:outline-none transition-colors duration-300"
      />
    </div>
  );
}
