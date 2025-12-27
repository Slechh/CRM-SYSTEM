import { UiCreateModal } from "../../uikit/UiCreateModal";
import { PROJECT_INPUT_INFO } from "../../constants/projectInput";
import { UiForm } from "../../uikit/UiForm";
import { UiInput } from "../../uikit/UiInput";
import { useProjectsForm } from "../../hooks/useProjectsForm";
import { createProject } from "../../api/createProject";
import { jwtDecode } from "jwt-decode";

export function ProjectsAddForm({ handleClose }) {
  const token = sessionStorage.getItem("authToken");
  console.log(token);
  const user = jwtDecode(token);
  console.log(user);
  const {
    data: projectData,
    handleChange,
    handleReset,
    isValid,
  } = useProjectsForm({
    projectName: "",
    description: "",
    clientName: "",
    status: "",
    startDate: "",
    endDate: "",
    budgetUsd: 0,
    createdByUserId: Number(user.sub),
  });
  console.log(projectData);
  return (
    <UiCreateModal
      label="Project"
      isModalClose={handleClose}
      bgForm={{ path: "employeeBg", alt: "Bg Form" }}
      bgGirl={{ path: "employeeGirlBg", alt: "Bg Girl Form" }}
    >
      <UiCreateModal.Body>
        <UiForm
          formData={projectData}
          handleReset={handleReset}
          //   onSuccess={onSuccess}
          className="mt-6"
          label="Project"
          isDisabled={!isValid}
          create={createProject}
        >
          <div className="grid grid-cols-2 gap-3">
            {PROJECT_INPUT_INFO.map((input) => (
              <div
                key={input.name}
                className={input.colSpan ? "col-span-2" : ""}
              >
                <UiInput
                  employeeData={projectData[input.name]}
                  input={input.name}
                  label={input.label}
                  placeholder={input.placeholder}
                  handleChange={handleChange}
                  type={input.type}
                />
              </div>
            ))}
          </div>
        </UiForm>
      </UiCreateModal.Body>
    </UiCreateModal>
  );
}
