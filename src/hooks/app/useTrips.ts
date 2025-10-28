// hooks/useTrips.ts
import { useEffect, useState } from 'react';
import { getMyVehicles, getAllTags, createTrip } from '../../api/graphql';
import { useAuth } from '../../contexts';

export function useGetVehicles() {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  const fetchVehicles = async () => {
    try {
      if (!token) return;
      setLoading(true);
      const res = await getMyVehicles(token);
      console.log('Vehículos obtenidos:', res);
      setVehicles(res);
    } catch (err) {
      console.error('Error obteniendo vehículos:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchVehicles();
  }, [token]);

  return { vehicles, loading, refetch: fetchVehicles };
}

export function useGetTags() {
  const [tags, setTags] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  const fetchTags = async () => {
    try {
      if (!token) return;
      setLoading(true);
      const res = await getAllTags(token);
      setTags(res);
    } catch (err) {
      console.error('Error obteniendo tags:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchTags();
  }, [token]);

  return { tags, loading, refetch: fetchTags };
}

export function useCreateTrip() {
  const [loading, setLoading] = useState(false);
  const [trip, setTrip] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const { token } = useAuth();

  const publishTrip = async (input: any) => {
    try {
      if (!token) throw new Error('Token no encontrado');
      setLoading(true);
      const res = await createTrip(input, token);
      setTrip(res);
      return res;
    } catch (err) {
      console.error('Error publicando viaje:', err);
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { publishTrip, trip, loading, error };
}
