import { useState } from "react";
import { UiButton } from "../../uikit/UiButton";
import { Icon } from "../Icon";
import { ProjectsAddForm } from "./ProjectsAddForm";

export function ProjectsHeader({ getProjects }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpen = () => setIsModalOpen((prev) => !prev);
  const handleClose = () => setIsModalOpen((prev) => !prev);
  return (
    <div className="flex font-bold justify-between items-center">
      <h1 className="text-4xl font-bold">Projects </h1>
      <UiButton
        size="lg"
        className="gap-2 text-bgBlock"
        type="big"
        onClick={handleOpen}
      >
        <Icon id="plus" className="w-3 h-3" />
        <span>Add Project</span>
      </UiButton>
      {isModalOpen && (
        <ProjectsAddForm handleClose={handleClose} getProjects={getProjects} />
      )}
    </div>
  );
}
