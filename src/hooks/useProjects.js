import { useEffect, useState } from "react";
import { getAllProjects } from "../api/getAllProjects";
import { addEmployeeToProject } from "../api/addEmployeeToProject";

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

  const addEmployee = async (data) => {
    try {
      const token = sessionStorage.getItem("authToken");
      const result = await addEmployeeToProject({ token, data });
      console.log("Employee added:", result);
      return result; 
    } catch (err) {
      console.error("Failed to add employee:", err.message);
      throw err; 
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
    addEmployee,
  };
}
