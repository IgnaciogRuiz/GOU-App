import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

export const ClearStorageOnStart = () => {
  const { eliminarStorage } = useAuth();

  useEffect(() => {
    eliminarStorage();
  }, []);

  return null;
};
