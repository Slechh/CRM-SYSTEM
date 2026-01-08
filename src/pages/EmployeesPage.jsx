import { useState } from "react";
import { EmployeesHeader } from "../components/employees/EmployeesHeader";
import { EmployeesList } from "../components/employees/EmployeesList";
import { useExperts } from "../hooks/useExperts";
import { Toast } from "../components/Toast";

export function EmployeesPage({ className }) {
  const [toast, setToast] = useState(null);
  const { users, loading, refetchExperts, deleteExpert } = useExperts();

  const handleDeleteEmployee = async (userId) => {
    try {
      await deleteExpert(userId);
      setToast({ message: "Employee deleted successfully!", type: "success" });
    } catch (error) {
      setToast({
        message: error.message || "Failed to delete employee",
        type: "error",
      });
    }
  };

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className={className}>
        <EmployeesHeader users={users} onEmployeeCreated={refetchExperts} />
        <EmployeesList
          users={users}
          onEmployeeDelete={handleDeleteEmployee}
          isLoading={loading}
        />
      </div>
    </>
  );
}
