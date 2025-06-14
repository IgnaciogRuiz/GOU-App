// src/hooks/useHomeData.ts
import { useEffect, useState } from 'react';
import { getHomeData } from '../../api/graphql';
import { useAuth } from '../../contexts';

export function useHomeData() {
  const { token } = useAuth();
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true);
        if (!token) throw new Error('Token faltante');

        const data = await getHomeData(token);
        console.log('Datos del dashboard obtenidos:', data?.dashboardData);
        setDashboardData(data?.dashboardData ?? null);
      } catch (err) {
        console.error('Error al obtener datos del dashboard:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, [token]);

  return { dashboardData, loading, error };
}
 