import { useState } from "react";
import { UiButton } from "../../uikit/UiButton";
import { Icon } from "../Icon";
import { EmployeeAddForm } from "./EmployeeAddForm";
import { useAuth } from "../../hooks/useAuth";
import { Toast } from "../Toast";

export function EmployeesHeader({ users, onEmployeeCreated }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const { hasRole } = useAuth();

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleSuccess = () => {
    handleClose();
    onEmployeeCreated();
    setToast({ message: "Employee added successfully!", type: "success" });
  };

  const handleError = (error) => {
    handleClose();
    setToast({
      message: error.message || "Failed to add employee",
      type: "error",
    });
  };

  const canAddEmployee = hasRole(["CEO", "RECRUITER"]);

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="flex font-bold justify-between items-center">
        <h1 className="text-4xl">Employees ({users.length})</h1>
        <span className="bg-bgNavBlock rounded-3xl h-10 py-2 text-bgBlock px-14 flex items-center justify-center">
          List
        </span>
        <div className="flex gap-6 items-center justify-center">
          <UiButton size="xs" type="normal" className="text-black">
            <Icon id="filter" className="w-5 h-5" />
          </UiButton>

          {canAddEmployee && (
            <UiButton
              size="lg"
              className="gap-2 text-bgBlock"
              type="big"
              onClick={handleOpen}
            >
              <Icon id="plus" className="w-3 h-3" />
              <span>Add Employee</span>
            </UiButton>
          )}

          {isModalOpen && (
            <EmployeeAddForm
              isModalClose={handleClose}
              onSuccess={handleSuccess}
              onError={handleError}
            />
          )}
        </div>
      </div>
    </>
  );
}
