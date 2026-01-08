import { useParams } from "react-router-dom";
import { useProject } from "../../hooks/useProject";
import { ProjectsEmployee } from "./ProjectsEmployee";
import { UiButton } from "../../uikit/UiButton";
import { Icon } from "../Icon";
import { useState } from "react";
import { useExperts } from "../../hooks/useExperts";
import { Spinner } from "../Spinner";
import { ProjectsSwitcher } from "./ProjectsSwitcher";
import { useProjects } from "../../hooks/useProjects";
import { Toast } from "../Toast";

export function ProjectDetails() {
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [addingUserIds, setAddingUserIds] = useState([]);
  const [toast, setToast] = useState(null);

  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState("");

  const { slug } = useParams();
  const projectId = slug.split("-").pop();

  const { users, loading } = useExperts();
  const {
    project,
    projectMembers,
    projectLoading,
    projectError,
    projectMembersData,
  } = useProject(projectId);
  const { addEmployee, deleteEmployee } = useProjects();

  const usersNotInProject = users.filter(
    (user) => !projectMembers.find((member) => member.expertId === user.id)
  );

  const filteredUsers = usersNotInProject.filter((user) => {
    const fullname = `${user.firstName} ${user.lastName}`;
    return fullname.toLowerCase().includes(filter.toLowerCase());
  });

  if (projectLoading) {
    return (
      <div className="w-full h-full bg-bgBlock rounded-3xl animate-pulse"></div>
    );
  }

  if (projectError) {
    return <div className="text-red-500">Error: {projectError}</div>;
  }

  const arrToRender = filter ? filteredUsers : usersNotInProject;
  const itemsPerPage = 8;
  const projectsListLength = arrToRender.length;
  const totalPages = Math.ceil(arrToRender.length / itemsPerPage);
  const projectsLastIndex = Math.min(
    currentPage * itemsPerPage,
    arrToRender.length
  );
  const projectsStartIndex = (currentPage - 1) * itemsPerPage;

  const employeesList = arrToRender.slice(
    projectsStartIndex,
    projectsLastIndex
  );
  const isLeftButtonDisabled = currentPage === 1;
  const isRightButtonDisabled = currentPage === totalPages;

  const handleClick = () =>
    setIsButtonClicked((prev) => {
      setInputValue("");
      setFilter("");
      setCurrentPage(1);
      return !prev;
    });

  const handleSearchClick = () => {
    handleSearch(inputValue);
  };

  const handleSearch = (searchValue) => {
    setFilter(searchValue);
  };

  const nextSlide = () => {
    if (currentPage < totalPages)
      setCurrentPage((prevCurrentPage) => prevCurrentPage + 1);
  };

  const previousSlide = () => {
    if (currentPage > 1)
      setCurrentPage((prevCurrentPage) => prevCurrentPage - 1);
  };

  const handleAddEmployee = async (data) => {
    if (addingUserIds.includes(data.expertId)) return;

    try {
      setAddingUserIds((prev) => [...prev, data.expertId]);

      await addEmployee(data);
      await projectMembersData();

      setToast({
        message: "Employee added to project successfully!",
        type: "success",
      });
    } catch (err) {
      console.error(err);
      setToast({
        message: err.message || "Failed to add employee",
        type: "error",
      });
    } finally {
      setAddingUserIds((prev) => prev.filter((id) => id !== data.expertId));
    }
  };

  const handleDeleteEmployee = async (idProject, idUser) => {
    try {
      await deleteEmployee(idProject, idUser);
      await projectMembersData();

      setToast({
        message: "Employee removed from project successfully!",
        type: "success",
      });
    } catch (err) {
      console.error(err);
      setToast({
        message: err.message || "Failed to remove employee",
        type: "error",
      });
    }
  };

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="p-6 flex flex-col bg-bgBlock rounded-3xl">
        <DetailsHeader
          project={project}
          handleClick={handleClick}
          isButtonClicked={isButtonClicked}
        />
        {isButtonClicked ? (
          loading ? (
            <Spinner />
          ) : (
            <>
              <div className="w-full bg-bgBlock px-5 py-3 mt-5 rounded-2xl border border-solid border-cardText">
                <div className="flex items-center">
                  <input
                    type="text"
                    value={inputValue}
                    placeholder="Search"
                    className="bg-transparent w-full outline-none mr-4"
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                  <button className="ml-5" onClick={handleSearchClick}>
                    <Icon id="search" className="w-6 h-6" />
                  </button>
                </div>
              </div>
              <EmployeesList
                users={employeesList}
                iconType="plus"
                iconCn="bg-green-500"
                onClick={handleAddEmployee}
                projectId={projectId}
                addingUserIds={addingUserIds}
              />
            </>
          )
        ) : projectMembers.length > 0 ? (
          <div className="flex flex-1 justify-center items-center font-bold">
            <EmployeesList
              users={projectMembers}
              iconType="trash"
              iconCn="bg-red-500"
              onClick={handleDeleteEmployee}
              projectId={projectId}
            />
          </div>
        ) : (
          <div className="flex flex-1 justify-center items-center font-bold text-lg min-h-[200px]">
            No employee yet
          </div>
        )}
      </div>
      {isButtonClicked && users.length > 0 && (
        <ProjectsSwitcher
          projectsStartIndex={projectsStartIndex}
          projectsLastIndex={projectsLastIndex}
          projectsListLength={projectsListLength}
          previousSlide={previousSlide}
          nextSlide={nextSlide}
          isLeftButtonDisabled={isLeftButtonDisabled}
          isRightButtonDisabled={isRightButtonDisabled}
          className="mt-auto"
        />
      )}
    </>
  );
}

export function EmployeesList({
  users,
  iconType,
  iconCn,
  onClick,
  projectId,
  addingUserIds = [],
}) {
  return users.length > 0 ? (
    <div className="grid grid-cols-4 gap-7 mt-[25px]">
      {users.map((expert) => (
        <ProjectsEmployee
          key={expert.id}
          expert={expert}
          iconType={iconType}
          iconCn={iconCn}
          handleAction={onClick}
          projectId={projectId}
          disabled={addingUserIds.includes(expert.id)}
        />
      ))}
    </div>
  ) : (
    <div className="flex flex-1 justify-center items-center text-lg font-bold min-h-[200px]">
      No employee found
    </div>
  );
}

export function DetailsHeader({ project, handleClick, isButtonClicked }) {
  return (
    <div className="flex justify-between items-center">
      <h2 className="font-bold text-2xl">{project.projectName} </h2>
      {isButtonClicked ? (
        <button onClick={handleClick}>
          <Icon id="close" className="w-5 h-5 text-red-500" />
        </button>
      ) : (
        <UiButton
          size="lg"
          type="small"
          className="bg-emerald-600 text-white"
          onClick={handleClick}
        >
          <Icon id="plus" className="w-3 h-3" />
          Add Employee
        </UiButton>
      )}
    </div>
  );
}
