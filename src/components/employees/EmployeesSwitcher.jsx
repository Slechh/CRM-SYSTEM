import { Icon } from "../Icon";
import clsx from "clsx";
export function EmployeesSwitcher({
  employeeStartIndex,
  employeeLastIndex,
  employeeListLength,
  previousSlide,
  nextSlide,
  isLeftButtonDisabled,
  isRightButtonDisabled,
}) {
  return (
    <div className="mt-7 flex justify-end">
      {employeeListLength > 0 ? (
        <div className="bg-bgBlock px-5 py-3 rounded-2xl flex items-center">
          <span>
            {employeeStartIndex + 1}-{employeeLastIndex} of {employeeListLength}
          </span>
          <div className="flex gap-x-1 ml-5">
            <button
              className="w-6 h-6 flex items-center justify-center"
              onClick={previousSlide}
              disabled={isLeftButtonDisabled}
            >
              <Icon
                id="arrow-left"
                className={clsx(
                  "w-3 h-3",
                  isLeftButtonDisabled ? "text-switcherText" : "text-bgNavBlock"
                )}
              />
            </button>
            <button
              className="w-6 h-6 flex items-center justify-center"
              onClick={nextSlide}
              disabled={isRightButtonDisabled}
            >
              <Icon
                id="arrow-right"
                className={clsx(
                  "w-3 h-3",
                  isRightButtonDisabled
                    ? "text-switcherText"
                    : "text-bgNavBlock"
                )}
              />
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
