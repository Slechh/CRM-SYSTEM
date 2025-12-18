import clsx from "clsx";

export function UiButton({
  children,
  className,
  size,
  type,
  onClick,
  btnType,
  disabled,
}) {
  const isDisabled = disabled
    ? "bg-slate-500 cursor-not-allowed hover:bg-slate-700 transition-all duration-300 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.15)]"
    : "";
  const buttonClassName = clsx(
    "h-12 font-bold flex gap-2 text-bgBlock items-center justify-center",
    className,
    isDisabled,
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
    <button
      className={buttonClassName}
      onClick={onClick}
      type={btnType}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
