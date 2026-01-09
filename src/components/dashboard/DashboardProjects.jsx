import { NavLink } from "react-router-dom";
import { Icon } from "../Icon";

export function DashboardProjects() {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between w-[1160px]">
        <h2 className="text-[22px] font-bold ml-2.5">Projects</h2>
        <NavLink to="/projects">
          <div className="flex items-center font-semibold text-bgNavBlock gap-2.5">
            <span> View all </span>
            <Icon id="arrow-right-dashboard" className="w-[10px] h-[10px] " />
          </div>
        </NavLink>
      </div>
      <ul className="flex gap-5 mt-5">
        <ProjectItem />
        <ProjectItem />
      </ul>
    </div>
  );
}

function ProjectItem() {
  return (
    <div className="py-6 pl-6 bg-bgBlock rounded-3xl h-[148px] w-[570px]"></div>
  );
}
