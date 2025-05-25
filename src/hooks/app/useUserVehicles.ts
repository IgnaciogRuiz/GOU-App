
import { useEffect, useState } from 'react';
import { getUserVehicles } from '../../api/graphql';
import { useAuth } from "../../contexts";

export function useUserVehicles() {
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    async function fetchVehicles() {
      try {
        setLoading(true);
        if (!token) throw new Error('Datos de autenticación faltantes');
        const data = await getUserVehicles(token);
        const userVehicles = data?.me?.vehicles || [];
        setVehicles(userVehicles);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    if (token) fetchVehicles();
  }, [token]);

  return { loading, vehicles, error };
}