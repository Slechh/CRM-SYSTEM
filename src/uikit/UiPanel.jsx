import clsx from "clsx";

export function UiPanel({ children, className }) {
  return (
    <div
      className={clsx(
        "w-[265px] bg-bgBlock rounded-3xl",
        className
      )}
    >
      {children}
    </div>
  );
}
