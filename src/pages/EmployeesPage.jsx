import { EmployeesHeader } from "../components/employees/EmployeesHeader";
import { EmployeesList } from "../components/employees/EmployeesList";
import { useExperts } from "../hooks/useExperts";
export function EmployeesPage({ className }) {
  const { users, loading, error, refetchExperts } = useExperts();

  return (
    <div className={className}>
      <EmployeesHeader users={users} onEmployeeCreated={refetchExperts} />
      <EmployeesList users={users} />
    </div>
  );
}
