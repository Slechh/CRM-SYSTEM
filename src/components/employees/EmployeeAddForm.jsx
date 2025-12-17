import { UiModal } from "../../uikit/UiModal";
import { UiButton } from "../../uikit/UiButton";
import { UiForm } from "../../uikit/UiForm";
import { UiInput } from "../../uikit/UiInput";

import { EMPLOYEE_INPUT_INFO } from "../../constants/employeeInput";

import { useEmployeeForm } from "../../hooks/useEmployeeForm";

export function EmployeeAddForm({ isModalClose, onSuccess }) {
  const {
    data: employeeData,
    handleChange,
    handleReset,
  } = useEmployeeForm({
    firstname: "",
    lastname: "",
    jobTitle: "",
    specializationId: "",
    sourcingMethod: "",
  });

  return (
    <UiModal
      label="Employee"
      isModalClose={isModalClose}
      bgForm={{ path: "employeeBg", alt: "Bg Form" }}
      bgGirl={{ path: "employeeGirlBg", alt: "Bg Girl Form" }}
    >
      <UiModal.Body>
        <UiForm
          formData={employeeData}
          handleReset={handleReset}
          onSuccess={onSuccess}
          className="mt-6"
          label="Employee"
        >
          <div className="grid grid-cols-2 gap-3">
            {EMPLOYEE_INPUT_INFO.map((input) => (
              <UiInput
                key={input.name}
                employeeData={employeeData[input.name]}
                input={input.name}
                label={input.label}
                placeholder={input.placeholder}
                handleChange={handleChange}
                className={input.colSpan ? "col-span-2" : ""}
              />
            ))}
          </div>
        </UiForm>
      </UiModal.Body>
    </UiModal>
  );
}
