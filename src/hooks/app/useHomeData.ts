// src/hooks/useHomeData.ts
import { useEffect, useState } from "react";
import { getHomeData } from "../../api/graphql";

export function useHomeData(token: string | null) {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (!token) {
      setDashboardData(null);
      setLoading(false);
      return;
    }

    async function fetchDashboardData() {
      try {
        setLoading(true);
        const data = await getHomeData(token);
        setDashboardData(data?.dashboardData ?? null);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, [token]);

  return { dashboardData, loading, error };
}
