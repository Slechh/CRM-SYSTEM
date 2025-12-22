import { useEffect, useState } from "react";
import { fetchOverviewExpert } from "../api/overviewExpert";

export function useOverview(id) {
  const [userInfo, setUserInfo] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const [userError, setUserError] = useState(null);

  const token = sessionStorage.getItem("authToken");

  useEffect(() => {
    if (!id) return;

    const loadUser = async () => {
      try {
        setUserLoading(true);
        const data = await fetchOverviewExpert({ token, id });
        setUserInfo(data);
      } catch (err) {
        setUserError(err);
      } finally {
        setUserLoading(false);
      }
    };

    loadUser();
  }, [id, token]);

  return { userInfo, userLoading, userError, setUserInfo };
}
