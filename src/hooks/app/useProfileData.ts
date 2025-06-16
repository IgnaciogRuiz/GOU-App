// src/hooks/useProfile.ts
// te trae todos los datos del usuario autenticado
import { useEffect, useState } from 'react';
import { getProfileData } from '../../api/graphql';
import { useAuth } from '../../contexts';

export function useProfileData() {
  const { token } = useAuth();
  const [profileData, setprofileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (!token) return;

    async function fetchProfileData() {
      try {
        setLoading(true);

        const data = await getProfileData(token);
        //console.log('profile Data:', data?.me?.profile);
        setprofileData(data?.me ?? null);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProfileData();
  }, [token]);

  return { profileData, loading, error };
}
 