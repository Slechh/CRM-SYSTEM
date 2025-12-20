import { UiButton } from "../../uikit/UiButton";
import { Icon } from "../Icon";

export function OverviewHeader({ userInfo }) {
  return (
    <div className="px-6 pt-6">
      <div className="flex justify-between">
        <img
          src="/images/photo.png"
          alt="logo"
          className="w-[64px] border-2 border-solid border-bgNavBlock rounded-full"
        />
      </div>
      <div className="flex flex-col gap-1.5 mt-4 mb-7">
        <h2 className="text-[22px] font-bold">
          {userInfo.firstName} {userInfo.lastName}
        </h2>
        <p className="text-sm font-semibold">{userInfo.expertSpecialization}</p>
      </div>
    </div>
  );
}
