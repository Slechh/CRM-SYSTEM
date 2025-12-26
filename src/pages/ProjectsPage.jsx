import { ProjectsHeader } from "../components/projects/ProjectsHeader";
import clsx from "clsx";

export function ProjectsPage({ className }) {
  return (
    <div className={clsx(className, "gap-5 flex flex-col")}>
      <ProjectsHeader />
      <div>content</div>
    </div>
  );
}
