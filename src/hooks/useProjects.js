import { useEffect, useState } from "react";
import { getAllProjects } from "../api/getAllProjects";

export function useProjects() {
  const [projects, setProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [projectsError, setProjectsError] = useState(null);

  const token = sessionStorage.getItem("authToken");

  const getExperts = async () => {
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
    getExperts();
  }, []);

  //   useEffect(() => {
  //     setLoading(true);
  //     getAllProjects({ token })
  //       .then((data) => setProjects(data))
  //       .catch((err) => setError(err))
  //       .finally(setLoading(false));
  //   }, []);
  console.log(projects);

  //   const deleteExpert = async (id) => {
  //     await fetchDeleteExpert({ token, id });
  //     refetchExperts();
  //   };

  //   useEffect(() => {
  //     let isMounted = true;

  //     const fetchData = async () => {
  //       try {
  //         setLoading(true);
  //         const data = await fetchExperts({ token });
  //         if (isMounted) setUsers(data);
  //       } catch (err) {
  //         if (isMounted) setError(err.message);
  //       } finally {
  //         if (isMounted) setLoading(false);
  //       }
  //     };

  //     fetchData();

  //     return () => {
  //       isMounted = false;
  //     };
  //   }, [token]);

  return {
    projects,
    projectsLoading,
    projectsError,
  };
}
