// src/hooks/useUserReservations.ts
import { useEffect, useState } from 'react';
import { getUserReservations } from '../../api/graphql';
import { useAuth } from "../../contexts";

export function useUserReservations() {
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [reservations, setReservations] = useState<any[]>([]);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    async function fetchReservations() {
      try {
        setLoading(true);
        if (!token) throw new Error('Datos de autenticación faltantes');
        
        const data = await getUserReservations(token);
        const reservations = data?.me?.reservations || [];

        // Extraemos los trips directamente desde cada reserva
        const trips = reservations.map((r: any) => r.trip);

        setReservations(trips);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }   

    if (token) fetchReservations();
  }, [token]);

  return { loading, reservations, error };
}