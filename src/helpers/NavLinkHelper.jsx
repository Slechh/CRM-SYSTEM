import clsx from "clsx";
import { Icon } from "../components/Icon";

export const activeLinkChecker = (isActive) =>
  clsx(
    "flex relative items-center gap-4 w-[172px] h-11 py-2.5 pl-2.5 transition-all duration-300",
    isActive
      ? "rounded-xl text-bgNavBlock bg-[rgba(63,140,255,0.1)] font-bold"
      : " "
  );

export const renderNavLinkContent = (isActive, item) => (
  <>
    <Icon id={item.icon} className="w-4 h-4" />
    <h2>{item.label}</h2>
    {createLinkLine(isActive)}
  </>
);

const createLinkLine = (isActive) => (
  <span
    className={clsx(
      "absolute top-0 right-[-12px] w-1 h-full bg-bgNavBlock rounded-xl transition-all duration-300",
      isActive ? "opacity-100" : "opacity-0"
    )}
  ></span>
);
