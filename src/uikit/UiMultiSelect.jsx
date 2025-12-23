import { useState } from "react";

export function UiMultiSelect({
  label,
  value = [],
  onChange,
  options = [],
  placeholder,
  disabled,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredOptions = options.filter(
    (opt) =>
      opt.toLowerCase().includes(search.toLowerCase()) && !value.includes(opt)
  );

  const addItem = (item) => {
    onChange([...value, item]);
    setSearch("");
  };

  const removeItem = (item) => {
    onChange(value.filter((v) => v !== item));
  };

  return (
    <div className="flex flex-col gap-y-1.5 relative">
      <label className="text-sm text-navText ml-1.5 font-bold">{label}</label>

      <div
        className={`border-2 border-formBorder rounded-2xl px-4 py-3 shadow-sm min-h-[52px] flex flex-wrap gap-2 items-center transition-colors duration-300 ${
          disabled
            ? "bg-gray-50 cursor-not-allowed"
            : "focus-within:border-blue-500"
        }`}
      >
        {/* Теги */}
        {value.map((item, index) => (
          <div
            key={`${item}-${index}`}
            className={`px-3 py-0.5 rounded-lg flex items-center gap-1.5 text-sm font-medium ${
              disabled ? "bg-gray-200 text-gray-500" : "bg-bgApp text-blue-800"
            }`}
          >
            <span>{item}</span>
            {!disabled && (
              <button
                type="button"
                onClick={() => removeItem(item)}
                className="text-red-500 hover:text-red-700 font-bold text-lg leading-none"
              >
                ×
              </button>
            )}
          </div>
        ))}

        {/* Инпут для поиска */}
        {!disabled && (
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setIsOpen(true)}
            onBlur={() => setTimeout(() => setIsOpen(false), 200)}
            placeholder={value.length === 0 ? placeholder : ""}
            className="flex-1 min-w-[120px] outline-none font-normal"
          />
        )}
      </div>

      {/* Dropdown */}
      {isOpen && filteredOptions.length > 0 && !disabled && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border-2 border-formBorder rounded-2xl shadow-lg max-h-[200px] overflow-y-auto z-10">
          {filteredOptions.map((option) => (
            <div
              key={option}
              onClick={() => addItem(option)}
              className="px-4 py-3 hover:bg-blue-50 cursor-pointer transition-colors duration-150 font-normal"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
