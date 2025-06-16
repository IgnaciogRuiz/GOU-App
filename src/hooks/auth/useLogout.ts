// src/hooks/useLogout.ts
import { useMutation } from '@tanstack/react-query';
import { logoutService } from '../../api/rest';
import { useAuth } from '../../contexts';

export const useLogout = () => {
  const { setIsAuthenticated, setToken } = useAuth();

  return useMutation({
    mutationFn: logoutService,
    onSuccess: async () => {
      setToken(null);
      setIsAuthenticated(false);
    },
    onError: (error) => {
      console.error("Logout error:", error);
    },
  });
};