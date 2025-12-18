import { useEffect, useState } from "react";
import { fetchSpecializations } from "../api/specializationId";

export function useSpecializations() {
  const [specializations, setSpecializations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = sessionStorage.getItem("authToken");

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        if (isMounted) setLoading(true);
        const data = await fetchSpecializations({ token });
        if (isMounted) setSpecializations(data);
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [token]);

  return { specializations, loading, error };
}
