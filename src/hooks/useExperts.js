import { useEffect, useState } from "react";
import { fetchExperts } from "../api/experts";

export function useExperts() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = sessionStorage.getItem("authToken");
  const handleUpdateList = (users) => {
    setUsers(users);
  };
  useEffect(() => {
    fetchExperts({ token })
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { users, loading, error, handleUpdateList };
}
