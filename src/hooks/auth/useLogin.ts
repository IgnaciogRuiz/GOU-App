import { useMutation } from '@tanstack/react-query';
import { loginService } from '../../api/rest';
import { useAuth } from '../../contexts/AuthContext';

type LoginVars = { dni: string; password: string };

export const useLogin = () => {
  const { setUser, setIsAuthenticated, setToken } = useAuth();

  return useMutation({
    mutationFn: ({ dni, password }: LoginVars) =>
      loginService(dni, password),

    onSuccess: async (data) => {
      //  Guardar datos en el contexto
      setToken(data.data.token);
      setUser(data.data.user); 
      setIsAuthenticated(true);
    },

    onError: (error: unknown) => {
      console.error('Login error:', error);
    },
  });
};
