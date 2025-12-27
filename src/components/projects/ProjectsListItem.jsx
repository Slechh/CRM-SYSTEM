import clsx from "clsx";
import { NavLink } from "react-router-dom";

export function ProjectsListItem({ projectInfo }) {
  return (
    <li>
      <NavLink to={projectInfo.projectName}>
        {({ isActive }) => (
          <div className="relative">
            <div
              className={clsx(
                "w-[240px] rounded-xl pl-4 py-3 transition flex flex-col gap-1",
                isActive ? "bg-bgApp" : ""
              )}
            >
              <h2 className="font-bold text-cardText text-sm">
                Client Name: {projectInfo.clientName}
              </h2>
              <h2 className="font-bold">{projectInfo.projectName}</h2>

              <span
                className={clsx(
                  "absolute top-0 right-[-6px] h-full w-1 rounded-xl transition-all",
                  isActive ? "bg-bgNavBlock opacity-100" : "opacity-0"
                )}
              />
            </div>
          </div>
        )}
      </NavLink>
    </li>
  );
}
