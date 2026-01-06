import clsx from "clsx";
import { Icon } from "../Icon";

export function ProjectsEmployee({
  expert,
  iconType,
  iconCn,
  handleAction,
  projectId,
  disabled,
}) {
  return (
    <div className="bg-bgApp rounded-3xl relative group">
      <div className="p-4 h-[180px] w-[300px] flex flex-col justify-center gap-2">
        <div className="flex justify-center">
          <img src="/images/photo.png" alt="" className="w-20 h-20" />
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="font-semibold">
            {expert.firstName} {expert.lastName} {expert.fullName}
          </div>
          <div>{expert.specialization || expert.role}</div>
        </div>
        <button
          disabled={disabled}
          className={clsx(
            "absolute top-1 right-1 transition-opacity duration-200 p-2 rounded-xl text-white",
            disabled
              ? "opacity-50 cursor-not-allowed"
              : "opacity-0 group-hover:opacity-100",
            iconCn
          )}
          onClick={() => {
            if (iconType === "plus") {
              handleAction({
                expertId: expert.id,
                projectId: Number(projectId),
                role: expert.specialization,
                responsibilities: "Do some tasks",
                allocationPercentage: 100,
                joinedDate: "2021-11-25",
              });
            }
            if (iconType === "trash") {
              handleAction(Number(projectId), expert.expertId);
            }
          }}
        >
          <Icon id={iconType} className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
