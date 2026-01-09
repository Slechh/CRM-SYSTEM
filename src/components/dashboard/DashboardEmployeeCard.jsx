export function DashboardEmployeeCard({ users }) {
  return (
    <div className="flex items-center justify-center w-[174px] h-[180px] bg-bgApp rounded-2xl ">
      <div className="flex flex-col">
        <div className="flex justify-center">
          <img
            src="/images/photo.png"
            alt=""
            className="w-[58px] h-[58px] border-2 border-solid border-bgNavBlock rounded-full"
          />
        </div>
        <div className="flex flex-col items-center mt-3">
          <span className="font-bold">
            {users.firstName} {users.lastName}
          </span>
          <span className="text-sm">{users.specialization}</span>
          <span className="font-semibold text-xs text-navText py-0.5 px-1 border-solid border border-navText rounded-md mt-2">
            {users.jobTitle}
          </span>
        </div>
      </div>
    </div>
  );
}
