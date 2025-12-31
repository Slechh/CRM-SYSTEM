import { useEffect, useState } from "react";
import { getAllProjects } from "../api/getAllProjects";

export function useProjects() {
  const [projects, setProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [projectsError, setProjectsError] = useState(null);

  const token = sessionStorage.getItem("authToken");

  const getProjects = async () => {
    try {
      setProjectsLoading(true);
      const data = await getAllProjects({ token });
      setProjects(data);
    } catch (err) {
      setProjectsError(err.message);
    } finally {
      setProjectsLoading(false);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  return {
    projects,
    projectsLoading,
    projectsError,
    getProjects,
  };
}
