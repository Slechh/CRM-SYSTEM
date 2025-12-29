import clsx from "clsx";
import { NavLink } from "react-router-dom";
import { Icon } from "../Icon";

export function ProjectsListItem({ projectInfo, onDeleteClick }) {
  const slug = `${projectInfo.projectName.toLowerCase().replace(/\s+/g, "-")}-${
    projectInfo.id
  }`;

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onDeleteClick(projectInfo);
  };

  return (
    <li>
      <NavLink to={slug}>
        {({ isActive }) => (
          <div className="relative">
            <div
              className={clsx(
                "w-[240px] rounded-xl pl-4 py-3 transition flex flex-col gap-1",
                isActive ? "bg-bgApp" : ""
              )}
            >
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <h2 className="font-bold text-cardText text-sm">
                    Client Name: {projectInfo.clientName}
                  </h2>
                  <h2 className="font-bold">{projectInfo.projectName}</h2>
                </div>
                {isActive && (
                  <button onClick={handleDelete}>
                    <Icon id="trash" className="w-5 h-5 text-red-500" />
                  </button>
                )}
              </div>

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
