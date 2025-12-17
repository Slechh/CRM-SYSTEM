import { useEffect, useState } from "react";
import { fetchSpecializations } from "../api/specializationId";

export function useSpecializations() {
  const [specializations, setSpecializations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = sessionStorage.getItem("authToken");

  useEffect(() => {
    fetchSpecializations({ token })
      .then(setSpecializations)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { specializations, loading, error };
}
