import { UiModal } from "../../uikit/UiModal";
import { UiButton } from "../../uikit/UiButton";
import { UiForm } from "../../uikit/UiForm";
import { UiInput } from "../../uikit/UiInput";

import { EMPLOYEE_INPUT_INFO } from "../../constants/employeeInput";

import { EmployeeModalHeader } from "./EmployeeModalHeader";

import { useEmployeeForm } from "../../hooks/useEmployeeForm";

export function EmployeeAddForm({ isModalClose, handleUpdateList }) {
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
    <UiModal>
      <UiModal.Header>
        <EmployeeModalHeader isModalClose={isModalClose} />
      </UiModal.Header>
      <UiModal.Body>
        <div className="relative w-full mt-6">
          <img
            src="/images/employeeBg.png"
            alt="Bg Employee Form"
            className="w-full"
          />
          <img
            src="/images/employeeGirlBg.png"
            alt="Employee Girl"
            className="absolute bottom-0 left-1/2 -translate-x-1/2"
          />
        </div>
        <UiForm
          formData={employeeData}
          handleReset={handleReset}
          handleUpdateList={handleUpdateList}
          className="mt-6"
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
          <div className="mt-6 flex justify-end">
            <UiButton btnType="submit" size="lg" type="big">
              <span> Create Expert</span>
            </UiButton>
          </div>
        </UiForm>
      </UiModal.Body>
    </UiModal>
  );
}
