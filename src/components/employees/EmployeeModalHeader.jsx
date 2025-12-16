import { Icon } from "../Icon";
import { UiButton } from "../../uikit/UiButton";

export function EmployeeModalHeader({ isModalClose }) {
  return (
    <div className="text-black flex justify-between items-center text-2xl font-bold">
      <h2>Add Employee</h2>
      <UiButton
        size="xs"
        type="small"
        className="text-black"
        onClick={isModalClose}
      >
        <Icon id="close" className="w-4 h-4" />
      </UiButton>
    </div>
  );
}
