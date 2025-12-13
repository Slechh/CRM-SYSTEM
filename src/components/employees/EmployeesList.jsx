import { useState } from "react";
import { EmployeeCard } from "./EmployeeCard";
import { EmployeesSearchForm } from "./EmployeesSearchForm";
import { EmployeesSwitcher } from "./EmployeesSwitcher";

export function EmployeesList({ users }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const employeeListLength = users.length;
  const totalPages = Math.ceil(users.length / itemsPerPage);
  const employeeLastIndex = currentPage * itemsPerPage;
  const employeeStartIndex = employeeLastIndex - itemsPerPage;
  const employeeList = users.slice(employeeStartIndex, employeeLastIndex);
  const result = employeeLastIndex - users.length;

  const isLeftButtonDisabled = currentPage === 1;
  const isRightButtonDisabled = currentPage === totalPages;

  const nextSlide = () => {
    if (currentPage < totalPages)
      setCurrentPage((prevCurrentPage) => prevCurrentPage + 1);
  };

  const previousSlide = () => {
    if (currentPage > 1)
      setCurrentPage((prevCurrentPage) => prevCurrentPage - 1);
  };

  console.log(totalPages);
  return (
    <div className="mt-5 flex flex-col">
      <EmployeesSearchForm />
      <ul className="flex flex-col gap-y-5 overflow-hidden mt-5 min-h-[616px]">
        {employeeList.map((user, index) => (
          <li className="w-full" key={index}>
            <EmployeeCard user={user} />
          </li>
        ))}
      </ul>
      <EmployeesSwitcher
        employeeStartIndex={employeeStartIndex}
        employeeLastIndex={employeeLastIndex}
        result={result}
        employeeListLength={employeeListLength}
        previousSlide={previousSlide}
        nextSlide={nextSlide}
        isLeftButtonDisabled={isLeftButtonDisabled}
        isRightButtonDisabled={isRightButtonDisabled}
      />
    </div>
  );
}
