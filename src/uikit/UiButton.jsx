import clsx from "clsx";

export function UiButton({ children, className, type }) {
  const buttonClassName = clsx(
    "transition-colors",
    className,
    {
      md: "h-12 px-4 font-bold bg-bgNavBlock rounded-xl shadow-[0_8px_30px_rgba(63,140,255,0.4)] hover:bg-blue-500 transition-all duration-300",
    }[type]
  );
  return <button className={buttonClassName}>{children}</button>;
}
