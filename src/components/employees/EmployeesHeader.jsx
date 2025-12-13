import { UiButton } from "../../uikit/UiButton";
import { Icon } from "../Icon";

export function EmployeesHeader() {
  return (
    <div className="flex font-bold justify-between items-center">
      <h1 className="text-4xl">Employees (28)</h1>
      <span className="bg-bgNavBlock rounded-3xl h-10 py-2 text-bgBlock px-14 flex items-center justify-center">
        List
      </span>
      <div className="flex gap-6 items-center justify-center">
        <button className="p-4 bg-bgBlock rounded-xl flex items-center justify-center">
          <Icon id="filter" className="w-5 h-5" />
        </button>
        <UiButton
          type="lg"
          className="flex gap-2 text-bgBlock items-center justify-center"
        >
          <Icon id="plus" className="w-3 h-3" />
          <span>Add Employee</span>
        </UiButton>
      </div>
    </div>
  );
}
