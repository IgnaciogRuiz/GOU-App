// src/hooks/useUserTrips.ts
import { useEffect, useState } from 'react';
import { getUserTrips } from '../../api/graphql';
import { useAuth } from "../../contexts";

export function useUserTrips() {
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [trips, setTrips] = useState<any[]>([]);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    async function fetchTrips() {
      try {
        setLoading(true);
        if (!token) throw new Error('Datos de autenticación faltantes');
        const data = await getUserTrips(token);
        const vehicles = data?.me?.vehicles || [];
        const allTrips = vehicles.flatMap((v: any) => v.trips);
        setTrips(allTrips);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }   

    if (token) fetchTrips();
  }, [token]);

  return { loading, trips, error };
}