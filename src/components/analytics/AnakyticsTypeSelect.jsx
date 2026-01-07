import { useState } from "react";

const CHART_TYPES = [
  { value: "bar", label: "Bar Chart" },
  { value: "pie", label: "Pie Chart" },
  { value: "horizontalBar", label: "Horizontal Bar Chart" },
];

export function AnalyticsTypeSelect({ selected, onSelect }) {
  const [open, setOpen] = useState(false);

  const selectedType = CHART_TYPES.find((type) => type.value === selected);

  return (
    <div className="relative w-72">
      <div
        onClick={() => setOpen(!open)}
        className="border rounded-xl px-4 py-2 cursor-pointer bg-white"
      >
        {selectedType ? selectedType.label : "Select chart type"}
      </div>

      {open && (
        <div className="absolute w-full mt-2 border rounded-xl bg-white shadow-lg z-10">
          <ul>
            {CHART_TYPES.map((type) => (
              <li
                key={type.value}
                onClick={() => {
                  onSelect(type.value);
                  setOpen(false);
                }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {type.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
