import { useEffect, useState, useCallback } from "react";
import { getAllProjects } from "../api/getAllProjects";
import { addEmployeeToProject } from "../api/addEmployeeToProject";
import { deleteProjectMember } from "../api/deleteProjectMember";
import { getProject } from "../api/getProject";

export function useProjects() {
  const [projects, setProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [projectsError, setProjectsError] = useState(null);

  const token = sessionStorage.getItem("authToken");

  const getProjects = useCallback(async () => {
    try {
      setProjectsLoading(true);
      const data = await getAllProjects({ token });
      setProjects(data);
      return data; // ← ДОБАВЛЕНО
    } catch (err) {
      setProjectsError(err.message);
      return []; // ← ДОБАВЛЕНО
    } finally {
      setProjectsLoading(false);
    }
  }, [token]);

  const addEmployee = useCallback(async (data) => {
    try {
      const token = sessionStorage.getItem("authToken");
      const result = await addEmployeeToProject({ token, data });
      console.log("Employee added:", result);
      return result;
    } catch (err) {
      console.error("Failed to add employee:", err.message);
      throw err;
    }
  }, []);

  const deleteEmployee = useCallback(async (idProject, idUser) => {
    try {
      const token = sessionStorage.getItem("authToken");
      const result = await deleteProjectMember({ token, idProject, idUser });
      console.log("Employee delete:", result);
      return result;
    } catch (err) {
      console.error("Failed to delete employee:", err.message);
      throw err;
    }
  }, []);

  const fetchProject = useCallback(async (id) => {
    try {
      const token = sessionStorage.getItem("authToken");
      const result = await getProject({ token, id });
      console.log("Project fetched:", result);
      return result;
    } catch (err) {
      console.error("Failed to fetch project:", err.message);
      throw err;
    }
  }, []);

  useEffect(() => {
    getProjects();
  }, [getProjects]);

  return {
    projects,
    projectsLoading,
    projectsError,
    getProjects,
    addEmployee,
    deleteEmployee,
    fetchProject,
  };
}
