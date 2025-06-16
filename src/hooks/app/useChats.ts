// src/hooks/useChats.ts
// te trae todos los chats del usuario autenticado
import { useEffect, useState } from 'react';
import { getChats } from '../../api/graphql';
import { useAuth } from '../../contexts';

export function useChats() {
  const { token } = useAuth();
  const [chats, setChats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (!token) return;

    async function fetchChats() {
      try {
        setLoading(true);

        const data = await getChats(token);
        //console.log('Chats Data:', data?.me?.chats);
        setChats(data?.me?.chats ?? null);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchChats();
  }, [token]);

  return { chats, loading, error };
}
 