import { Icon } from "../Icon";
export function DashboardHeader() {
  const date = new Date();
  const dateToShow = date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  const dateAfterMonth = new Date(`
    ${date.getMonth() + 2},
    ${date.getDate()},
    ${date.getFullYear()}
    `).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  return (
    <div className="flex justify-between items-center">
      <h1 className="text-4xl font-bold">Dashboard</h1>
      <div className="flex gap-4 bg-overviewSwitcher py-3 px-4 rounded-xl w-[280px]">
        <Icon id="calendar" className="w-5 h-5" />
        <div>
          {dateToShow} - {dateAfterMonth}
        </div>
      </div>
    </div>
  );
}
