import { Icon } from "../Icon";
import { DashboardEmployeeCard } from "./DashboardEmployeeCard";
import { templateUsers } from "../../constants/templateUsers";
import { NavLink } from "react-router-dom";

export function DashboardWorkload({ users }) {
  const arrToShow = users.length > 8 ? users : templateUsers;
  return (
    <div className="flex flex-col w-[1160px] bg-bgBlock rounded-3xl py-7 px-[18px]">
      <div className="flex justify-between">
        <h2 className="text-[22px] font-bold ml-3">Workload</h2>
        <NavLink to="/employees">
          <div className="flex items-center font-semibold text-bgNavBlock gap-2.5">
            <span> View all </span>
            <Icon id="arrow-right-dashboard" className="w-[10px] h-[10px] " />
          </div>
        </NavLink>
      </div>
      <div className="flex flex-wrap gap-4 mt-5 ">
        {arrToShow.slice(0, 12).map((user) => (
          <DashboardEmployeeCard users={user} />
        ))}
      </div>
    </div>
  );
}
