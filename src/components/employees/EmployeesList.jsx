import { useState } from "react";
import { EmployeeCard } from "./EmployeeCard";
import { EmployeesSearchForm } from "./EmployeesSearchForm";
import { EmployeesSwitcher } from "./EmployeesSwitcher";

export function EmployeesList({ users, onEmployeeDelete }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("");
  const filteredUsers = users.filter((user) => {
    const fullname = `${user.firstName} ${user.lastName}`;
    return fullname.toLowerCase().includes(filter.toLowerCase());
  });

  const handleSearch = (searchValue) => {
    setFilter(searchValue);
    setCurrentPage(1);
  };

  const itemsPerPage = 6;
  const usersToRender = filter ? filteredUsers : users;
  const employeeListLength = usersToRender.length;
  const totalPages = Math.ceil(usersToRender.length / itemsPerPage);
  const employeeLastIndex = Math.min(
    currentPage * itemsPerPage,
    usersToRender.length
  );
  const employeeStartIndex = (currentPage - 1) * itemsPerPage;

  const employeeList = usersToRender.slice(
    employeeStartIndex,
    employeeLastIndex
  );
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

  return (
    <div className="mt-5 flex flex-col">
      <EmployeesSearchForm onSearch={handleSearch} />
      {usersToRender.length > 0 ? (
        <ul className="flex flex-col gap-y-5 overflow-hidden mt-5 min-h-[616px]">
          {employeeList.map((user, index) => (
            <li className="w-full" key={index}>
              <EmployeeCard user={user} onDelete={onEmployeeDelete} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex justify-center items-center min-h-[616px]">
          No employee found
        </div>
      )}
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
