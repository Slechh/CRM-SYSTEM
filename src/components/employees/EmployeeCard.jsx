import { Icon } from "../Icon";
export function EmployeeCard({ user }) {
  return (
    <div
      className="h-[86px] bg-bgBlock rounded-3xl py-5 px-7 items-center grid 
    grid-cols-[minmax(400px,1fr)_minmax(80px,1fr)_minmax(120px,1fr)_minmax(60px,1fr)_minmax(200px,1fr)_40px]"
    >
      <div className="flex gap-4">
        <img src="/images/photo.png" alt="" className="w-12 h-12" />
        <div className="flex flex-col justify-center">
          <span>{user.name}</span>
          <span>{user.email}</span>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="text-sm text-cardText">Gender</h2>
        <span>{user.gender}</span>
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="text-sm text-cardText">Birthday</h2>
        <span>{user.birthday}</span>
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="text-sm text-cardText">Full age</h2>
        <span>{user.age}</span>
      </div>
      <div className="flex flex-col gap-1 items-start">
        <h2 className="text-sm text-cardText">Position</h2>
        <div className="flex justify-center items-center gap-2">
          <span>{user.position}</span>
          <span className="font-semibold text-xs text-navText py-0.5 px-1 border-solid border border-navText rounded-md">
            {user.role}
          </span>
        </div>
      </div>
      <div>
        <button className="flex flex-col bg-[rgba(244,249,253,1)] p-2.5 rounded-xl">
          <Icon id="more" className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
