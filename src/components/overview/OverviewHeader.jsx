import clsx from "clsx";
import { NavLink } from "react-router-dom";
export function OverviewHeader({ userInfo }) {
  const buttons = [
    { id: "overview", name: "Overview" },
    { id: "attachment", name: "Attachment" },
  ];
  return (
    <div className="px-6 py-6">
      <div className="flex gap-5 items-center">
        <img
          src="/images/photo.png"
          alt="logo"
          className="w-[64px] border-2 border-solid border-bgNavBlock rounded-full"
        />
        <div className="flex flex-col test-sm font-bold">
          <h2>
            {userInfo.firstName} {userInfo.lastName}
          </h2>
          <h2>
            {userInfo.country} / {userInfo.city}
          </h2>
        </div>
      </div>
      <div className="flex flex-col gap-1.5 mt-4 mb-7">
        <h2 className="text-xl font-bold">Specialization</h2>
        <p className="text-sm font-semibold">{userInfo.expertSpecialization}</p>
      </div>

      <div className="flex items-center justify-center">
        <div className="flex w-[455px] bg-overviewSwitcher p-1 rounded-2xl gap-1">
          {buttons.map((value) => {
            return (
              <NavLink
                key={value.id}
                to={value.id === "overview" ? "" : value.id}
                end={value.id === "overview"}
                className={({ isActive }) =>
                  clsx(
                    "flex flex-1 items-center justify-center rounded-2xl py-2 transition-all duration-300",
                    isActive && "bg-bgNavBlock text-bgApp font-bold"
                  )
                }
              >
                {value.name}
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
}
