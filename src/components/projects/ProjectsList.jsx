import { ProjectsListItem } from "./ProjectsListItem";

export function ProjectsList({ projects }) {
  return (
    <ul className="mt-2 px-2 flex flex-col">
      {projects.length > 0 ? (
        projects.map((info) => <ProjectsListItem projectInfo={info} />)
      ) : (
        <div className="flex justify-center text-cardText font-bold mt-2 text-sm">
          No projects found
        </div>
      )}
    </ul>
  );
}
