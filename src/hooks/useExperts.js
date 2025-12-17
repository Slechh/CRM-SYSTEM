import { useEffect, useState } from "react";
import { fetchExperts } from "../api/experts";

export function useExperts() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = sessionStorage.getItem("authToken");
  const fetchList = async () => {
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
  useEffect(() => {
    fetchList();
  }, []);

  return { users, loading, error, refetchExperts: fetchList };
}
