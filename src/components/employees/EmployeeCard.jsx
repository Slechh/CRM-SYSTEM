import { Icon } from "../Icon";
export function EmployeeCard({ user }) {
  return (
    <div
      className="h-[86px] bg-bgBlock rounded-3xl py-5 px-7 items-center grid 
    grid-cols-[minmax(400px,1fr)_minmax(80px,1fr)_minmax(120px,1fr)_minmax(60px,1fr)_minmax(200px,1fr)_40px]"
    >
      <div className="flex gap-4">
        <img src="/images/photo.png" alt="" className="w-12 h-12" />
        <div className="flex flex-col justify-center gap-1">
          <span className="font-bold text-cardText">First Name</span>
          <span className="text-sm font-bold">{user.firstName}</span>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <span className="font-bold text-cardText">Last Name</span>
        <span className="text-sm font-bold">{user.lastName}</span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="font-bold text-cardText">Interviewed</span>
        <span className="text-sm font-bold">
          {user.interviewed ? "Yes" : "No"}
        </span>
      </div>
      <div className="flex flex-col gap-1 items-start">
        <span className="font-bold text-cardText">Position</span>
        <div className="flex justify-center items-center gap-2">
          <span className="text-sm font-bold">{user.specialization}</span>
          <span className="font-semibold text-xs text-navText py-0.5 px-1 border-solid border border-navText rounded-md">
            {user.jobTitle}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <span className="font-bold text-cardText">Status</span>
        <span className="text-sm font-bold">{user.status}</span>
      </div>
      <div>
        <button className="flex flex-col bg-[rgba(244,249,253,1)] p-2.5 rounded-xl">
          <Icon id="more" className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
