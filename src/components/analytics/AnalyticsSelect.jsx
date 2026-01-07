import { useState } from "react";

export function AnalyticsSelect({ projects, selected, onSelect }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = projects.filter((p) =>
    p.projectName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative w-72">
      <div
        onClick={() => setOpen(!open)}
        className="border rounded-xl px-4 py-2 cursor-pointer bg-white"
      >
        {selected ? selected.projectName : "Выберите проект"}
      </div>

      {open && (
        <div className="absolute w-full mt-2 border rounded-xl bg-white shadow-lg z-10">
          <input
            type="text"
            placeholder="Поиск проекта..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2 border-b outline-none"
          />

          <ul className="max-h-48 overflow-y-auto">
            {filtered.length ? (
              filtered.map((p) => (
                <li
                  key={p.id}
                  onClick={() => {
                    onSelect(p);
                    setOpen(false);
                    setSearch("");
                  }}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {p.projectName}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-400">Ничего не найдено</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
