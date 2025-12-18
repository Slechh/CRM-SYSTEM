import { useEffect, useState } from "react";
import { fetchExperts } from "../api/experts";
import { fetchDeleteExpert } from "../api/deleteExperts";

export function useExperts() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = sessionStorage.getItem("authToken");

  const refetchExperts = async () => {
    try {
      setLoading(true);
      const data = await fetchExperts({ token });
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteExpert = async (id) => {
    await fetchDeleteExpert({ token, id });
    refetchExperts();
  };

  useEffect(() => {
    refetchExperts();
  }, []);

  return {
    users,
    loading,
    error,
    refetchExperts, 
    deleteExpert,   
  };
}