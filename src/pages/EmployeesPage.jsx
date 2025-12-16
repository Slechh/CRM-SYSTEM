import { EmployeesHeader } from "../components/employees/EmployeesHeader";
import { EmployeesList } from "../components/employees/EmployeesList";
import { useExperts } from "../hooks/useExperts";
export function EmployeesPage({ className }) {
  const { users, loading, error, handleUpdateList } = useExperts();

  return (
    <div className={className}>
      <EmployeesHeader users={users} handleUpdateList={handleUpdateList} />
      <EmployeesList users={users} />
    </div>
  );
}
