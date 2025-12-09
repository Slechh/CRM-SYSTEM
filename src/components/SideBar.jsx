import { UiButton } from "../uikit/UiButton";
import { Icon } from "./Icon";

export function Sidebar({ children }) {
  return (
    <div className="w-[200px] bg-bgBlock rounded-3xl h-full pl-4 py-10 flex flex-col">
      <div className="ml-2 ">
        <img src="/images/logo.png" alt="logo" />
      </div>
      <nav className="font-semibold text-navText flex flex-col gap-y-5 mt-12">
        {children}
      </nav>
      <div className="w-[168px] h-[168px] relative bg-[rgba(63,140,255,0.1)] rounded-xl mt-auto flex flex-col items-center">
        <div className="relative w-full flex justify-end">
          <img
            className="w-[140px] h-[124px] -mt-12 mr-2.5"
            src="/images/support.png"
            alt=""
          />
        </div>
        <UiButton className="mt-auto mb-4 flex items-center justify-center text-bgApp gap-2" type="md">
          <Icon id="support" className="w-4 h-4" />
          <h2>Support</h2>
        </UiButton>
      </div>
    </div>
  );
}
