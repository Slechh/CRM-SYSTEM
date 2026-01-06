import { Outlet, useParams, useNavigate } from "react-router-dom";
import { ProjectsHeader } from "../components/projects/ProjectsHeader";
import { UiPanel } from "../uikit/UiPanel";
import clsx from "clsx";
import { useProjects } from "../hooks/useProjects";
import { Spinner } from "../components/Spinner";
import { ProjectsList } from "../components/projects/ProjectsList";
import { Icon } from "../components/Icon";
import { useState, useEffect } from "react";
import { ProjectsSwitcher } from "../components/projects/ProjectsSwitcher";
import { UiDeleteModal } from "../uikit/UiDeleteModal";
import { deleteProject } from "../api/deleteProject";

export function ProjectsPage({ className }) {
  const navigate = useNavigate();
  const { slug } = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  const { projects, projectsLoading, projectsError, getProjects } =
    useProjects();
  const token = sessionStorage.getItem("authToken");

  useEffect(() => {
    if (projectsLoading) return;

    if (projects.length === 0) return;

    const exists = projects.some((p) => slug?.endsWith(`-${p.id}`));

    if (!slug || !exists) {
      const first = projects[0];
      const firstSlug = `${first.projectName
        .toLowerCase()
        .replace(/\s+/g, "-")}-${first.id}`;

      navigate(firstSlug, { replace: true });
    }
  }, [projects, projectsLoading, slug, navigate]);

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

  const handleOpenModal = (project) => {
    setProjectToDelete(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setProjectToDelete(null);
  };

  const handleDelete = async () => {
    if (!projectToDelete) return;

    await deleteProject({ token, projectId: projectToDelete.id });

    const updatedProjects = await getProjects();

    setIsModalOpen(false);
    setProjectToDelete(null);

    if (updatedProjects?.length > 0) {
      const first = updatedProjects[0];
      const firstSlug = `${first.projectName
        .toLowerCase()
        .replace(/\s+/g, "-")}-${first.id}`;

      navigate(`/projects/${firstSlug}`, { replace: true });
    } else {
      navigate("/projects", { replace: true });
    }
  };

  if (projectsLoading) {
    return (
      <div className="flex items-center justify-center">
        <Spinner className="h-screen" />
      </div>
    );
  }

  return (
    <div className={clsx(className, "flex flex-col flex-1")}>
      <ProjectsHeader getProjects={getProjects} />
      <div className="flex mt-7 gap-8 flex-1">
        <div className="flex flex-col gap-2 self-start">
          <UiPanel className="pt-7 pb-3">
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
            {projectList.length > 0 ? (
              <ProjectsList
                projects={projectList}
                onDeleteClick={handleOpenModal}
              />
            ) : (
              <p className="text-cardText text-center py-4">
                No projects found
              </p>
            )}
          </UiPanel>
          {projectList.length > 0 && (
            <ProjectsSwitcher
              projectsStartIndex={projectsStartIndex}
              projectsLastIndex={projectsLastIndex}
              projectsListLength={projectsListLength}
              previousSlide={previousSlide}
              nextSlide={nextSlide}
              isLeftButtonDisabled={isLeftButtonDisabled}
              isRightButtonDisabled={isRightButtonDisabled}
              className="mt-7"
            />
          )}
        </div>

        <div className="flex flex-1 flex-col">
          {projects.length > 0 ? (
            <Outlet key={slug} />
          ) : (
            <div className="flex items-center justify-center flex-1">
              <p className="text-cardText">No projects available</p>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && projectToDelete && (
        <UiDeleteModal
          label="Project"
          userName={projectToDelete.projectName}
          handleCloseModal={handleCloseModal}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
