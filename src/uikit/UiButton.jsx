import clsx from "clsx";

export function UiButton({
  children,
  className,
  size,
  type,
  onClick,
  btnType,
}) {
  const buttonClassName = clsx(
    "h-12 font-bold flex gap-2 text-bgBlock items-center justify-center",
    className,
    {
      xs: "w-12",
      md: "w-[130px]",
      lg: "w-[180px]",
    }[size],
    {
      small: "px-2.5 bg-bgApp rounded-2xl",
      normal: "px-3 bg-bgBlock rounded-xl",
      big: "px-4 bg-bgNavBlock shadow-[0_8px_30px_rgba(63,140,255,0.3)] hover:bg-blue-500 transition-all duration-300 rounded-xl",
    }[type]
  );
  return (
    <button className={buttonClassName} onClick={onClick} type={btnType}>
      {children}
    </button>
  );
}
