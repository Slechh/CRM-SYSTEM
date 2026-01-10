import { NavLink } from "react-router-dom";
import { Icon } from "../Icon";
import { formatDate } from "../../helpers/FormatDate";
import { templateProjects } from "../../constants/templateProjects";
import { useAuth } from "../../hooks/useAuth";

export function DashboardProjects({ projects }) {
  const { hasRole } = useAuth();
  const canViewAll = hasRole(["CEO"]);
  const arrToShow = projects.length >= 2 ? projects : templateProjects;

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between w-full">
        <h2 className="text-[22px] font-bold ml-2.5">Projects</h2>
        {canViewAll && (
          <NavLink to="/projects">
            <div className="flex items-center font-semibold text-bgNavBlock gap-2.5">
              <span> View all </span>
              <Icon id="arrow-right-dashboard" className="w-[10px] h-[10px] " />
            </div>
          </NavLink>
        )}
      </div>
      <ul className="flex gap-5 mt-5">
        {arrToShow.slice(0, 2).map((project) => (
          <ProjectItem project={project} key={project.id} />
        ))}
      </ul>
    </div>
  );
}

function ProjectItem({ project }) {
  return (
    <li className="px-6 bg-bgBlock rounded-3xl h-[148px] flex-1 relative flex">
      <div className="flex flex-col gap-[22px] py-6 flex-[0.45]">
        <div className="flex gap-[18px]">
          <img src="/images/projectLogo.png" alt="" className="w-12 h-12" />
          <div className="flex flex-col gap-1">
            <span className="text-sm text-cardText">
              Client name: {project.clientName}
            </span>
            <span className="text-lg font-bold">{project.projectName}</span>
          </div>
        </div>
        <div className="flex text-cardText gap-1.5">
          <Icon id="calendar-filled" className="w-5 h-5" />
          <span className="text-cardText text-sm font-semibold">
            Created {formatDate(project.createdAt)}
          </span>
        </div>
      </div>
      <div className="w-px bg-bgLine h-full mx-10"></div>
      <div className="flex flex-col py-6 gap-4 flex-[0.55]">
        <h2 className="font-bold">Project Data</h2>
        <div className="flex gap-11">
          <div className="flex flex-col gap-1.5">
            <span className="text-cardText text-sm">Status</span>
            <span className="font-bold">{project.status}</span>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-cardText text-sm">Start Date</span>
            <span className="font-bold">{formatDate(project.startDate)}</span>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-cardText text-sm">End Date</span>
            <span className="font-bold">{formatDate(project.endDate)}</span>
          </div>
        </div>
      </div>
    </li>
  );
}
