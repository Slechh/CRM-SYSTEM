import { UiCreateModal } from "../../uikit/UiCreateModal";
import { UiForm } from "../../uikit/UiForm";
import { UiInput } from "../../uikit/UiInput";
import { UiSelect } from "../../uikit/UiSelect";

import { EMPLOYEE_INPUT_INFO } from "../../constants/employeeInput";

import { useEmployeeForm } from "../../hooks/useEmployeeForm";
import { useSpecializations } from "../../hooks/useSpecializations";

import { createExpert } from "../../api/createExpert";

export function EmployeeAddForm({ isModalClose, onSuccess }) {
  const {
    data: employeeData,
    handleChange,
    handleReset,
    isValid,
    errors,
  } = useEmployeeForm({
    firstname: "",
    lastname: "",
    jobTitle: "",
    specializationId: "",
    sourcingMethod: "",
  });

  const { specializations } = useSpecializations();

  return (
    <UiCreateModal
      label="Employee"
      isModalClose={isModalClose}
      bgForm={{ path: "employeeBg", alt: "Bg Form" }}
      bgGirl={{ path: "employeeGirlBg", alt: "Bg Girl Form" }}
    >
      <UiCreateModal.Body>
        <UiForm
          formData={employeeData}
          handleReset={handleReset}
          onSuccess={onSuccess}
          className="mt-6"
          label="Employee"
          isDisabled={!isValid}
          create={createExpert}
        >
          <div className="grid grid-cols-2 gap-3">
            {EMPLOYEE_INPUT_INFO.map((input) => {
              if (input.name === "specializationId") {
                return (
                  <UiSelect
                    key={input.name}
                    label={input.label}
                    value={employeeData.specializationId}
                    options={specializations}
                    onChange={(value) => {
                      handleChange({
                        target: { name: "specializationId", value },
                      });
                    }}
                    className={input.colSpan ? "col-span-2" : ""}
                    placeholder="Select specialization"
                  />
                );
              }

              return (
                <div
                  key={input.name}
                  className={input.colSpan ? "col-span-2" : ""}
                >
                  <UiInput
                    employeeData={employeeData[input.name]}
                    input={input.name}
                    label={input.label}
                    placeholder={input.placeholder}
                    handleChange={handleChange}
                  />
                  {errors[input.name] && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors[input.name]}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </UiForm>
      </UiCreateModal.Body>
    </UiCreateModal>
  );
}
