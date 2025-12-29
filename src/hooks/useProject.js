import { useEffect, useState } from "react";
import { getProject } from "../api/getProject";
import { getProjectMembers } from "../api/getProjectMembers";

export function useProject(id) {
  const [project, setProject] = useState([]);
  const [projectLoading, setProjectLoading] = useState(true);
  const [projectError, setProjectError] = useState(null);
  const [projectMembers, setProjectMembers] = useState([]);

  const token = sessionStorage.getItem("authToken");

  const projectInfo = async () => {
    try {
      setProjectLoading(true);
      const data = await getProject({ token, id });
      setProject(data);
    } catch (err) {
      setProjectError(err.message);
    } finally {
      setProjectLoading(false);
    }
  };

  const projectMembersData = async () => {
    try {
      const data = await getProjectMembers({ token, id });
      setProjectMembers(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    projectInfo();
    projectMembersData();
  }, [id]);

  return {
    project,
    projectMembers,
    projectLoading,
    projectError,
  };
}
