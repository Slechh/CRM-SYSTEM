import { useParams } from "react-router-dom";
import { useProject } from "../../hooks/useProject";
import { projectExperts } from "../../constants/projectMembers";
import { ProjectsEmployee } from "./ProjectsEmployee";
import { UiButton } from "../../uikit/UiButton";
import { Icon } from "../Icon";

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("ru-RU");
}

export function ProjectDetails() {
  const { slug } = useParams();
  const projectId = slug.split("-").pop();
  const { project, projectMembers, projectLoading, projectError } =
    useProject(projectId);

  if (projectLoading) {
    return (
      <div className="w-full h-full bg-bgBlock rounded-3xl animate-pulse"></div>
    );
  }

  if (projectError) {
    return <div className="text-red-500">Error: {projectError}</div>;
  }

  return (
    <div className="p-6 flex flex-col">
      <DetailsHeader project={project} />
      <div className="grid grid-cols-4 gap-7 mt-5">
        {projectExperts.length > 0 ? (
          projectExperts.map((expert) => (
            <ProjectsEmployee key={expert.expertId} expert={expert} />
          ))
        ) : (
          <div className="flex justify-center items-center font-bold">
            No employee yet
          </div>
        )}
        <div className="bg-bgApp rounded-3xl">
          <div className="p-4 h-[180px] w-[300px] flex flex-col justify-center gap-2">
            <div className="flex justify-center">
              <img src="/images/photo.png" alt="" className="w-20 h-20" />
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="font-semibold">Kazarov Dima</div>
              <div className="">{projectExperts[0].role}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DetailsHeader({ project }) {
  return (
    <div className="flex justify-between">
      <h2 className="font-bold text-2xl">{project.projectName} </h2>
      <UiButton size="lg" type="small" className="bg-emerald-600 text-white">
        <Icon id="plus" className="w-3 h-3" />
        Add Employee
      </UiButton>
    </div>
  );
}
