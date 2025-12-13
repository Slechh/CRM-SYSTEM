import { EmployeesHeader } from "../components/employees/EmployeesHeader";
import { EmployeesList } from "../components/employees/EmployeesList";
import { users } from "../constants/users";

export function EmployeesPage({ className }) {
  return (
    <div className={className}>
      <EmployeesHeader />
      <EmployeesList users={users} />
    </div>
  );
}
