import { Outlet } from "react-router-dom";
import { ProjectsHeader } from "../components/projects/ProjectsHeader";
import { UiPanel } from "../uikit/UiPanel";
import clsx from "clsx";
import { useProjects } from "../hooks/useProjects";
import { Spinner } from "../components/Spinner";
import { ProjectsList } from "../components/projects/ProjectsList";
import { Icon } from "../components/Icon";
import { useState } from "react";
import { ProjectsSwitcher } from "../components/projects/ProjectsSwitcher";

export function ProjectsPage({ className }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState("");
  const { projects, projectsLoading, projectsError } = useProjects();
  const filteredProjects = projects.filter((projects) => {
    return projects.projectName.toLowerCase().includes(filter.toLowerCase());
  });

  const arrToRender = filter ? filteredProjects : projects;
  const itemsPerPage = 6;
  const projectsListLength = arrToRender.length;
  const totalPages = Math.ceil(arrToRender.length / itemsPerPage);
  const projectsLastIndex = Math.min(
    currentPage * itemsPerPage,
    arrToRender.length
  );
  const projectsStartIndex = (currentPage - 1) * itemsPerPage;

  const projectList = arrToRender.slice(projectsStartIndex, projectsLastIndex);
  const isLeftButtonDisabled = currentPage === 1;
  const isRightButtonDisabled = currentPage === totalPages;

  const handleClick = () => {
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

  if (projectsLoading) {
    return (
      <div className="flex items-center justify-center">
        <Spinner />;
      </div>
    );
  }

  return (
    <div className={clsx(className, "flex flex-col flex-1")}>
      <ProjectsHeader />
      <div className="flex mt-7 gap-8 flex-1">
        <div className="flex flex-col gap-2">
          <UiPanel className="pt-7 pb-3 h-full flex-1">
            <h2 className="font-bold px-6">All Projects</h2>
            <div className="px-4 mt-2">
              <div className="w-full bg-bgBlock px-5 py-3 rounded-2xl border border-solid border-cardText">
                <div className="flex items-center">
                  <input
                    type="text"
                    value={inputValue}
                    placeholder="Search"
                    className="bg-transparent w-full outline-none mr-4"
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                  <button className="ml-5" onClick={handleClick}>
                    <Icon id="search" className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
            <div className="w-full h-px bg-bgLine mt-4 mb-2"></div>
            <ProjectsList projects={projectList} />
          </UiPanel>
          <ProjectsSwitcher
            projectsStartIndex={projectsStartIndex}
            projectsLastIndex={projectsLastIndex}
            projectsListLength={projectsListLength}
            previousSlide={previousSlide}
            nextSlide={nextSlide}
            isLeftButtonDisabled={isLeftButtonDisabled}
            isRightButtonDisabled={isRightButtonDisabled}
          />
        </div>

        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
