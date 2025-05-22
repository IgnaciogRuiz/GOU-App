// src/hooks/useLogout.ts
import { useMutation } from '@tanstack/react-query';
import { logoutService } from '../../api/rest';
import { useAuth } from '../../contexts';

export const useLogout = () => {
  const { eliminarStorage, setIsAuthenticated, setToken, setUserId } = useAuth();

  return useMutation({
    mutationFn: logoutService,
    onSuccess: async () => {
      setToken(null);
      setUserId(null);
      setIsAuthenticated(false);
    },
    onError: (error) => {
      console.error("Logout error:", error);
    },
  });
};