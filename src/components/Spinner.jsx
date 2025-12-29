import clsx from "clsx";
export function Spinner({ className }) {
  return (
    <div className={clsx("flex items-center justify-center", className)}>
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-indigo-600" />
    </div>
  );
}
