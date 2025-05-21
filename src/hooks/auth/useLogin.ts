import { useMutation } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginService } from '../../api/rest/auth/authService';
import { useAuth } from '../../contexts/AuthContext';

type LoginVars = { dni: string; password: string };

export const useLogin = () => {
  const { setIsAuthenticated } = useAuth();

  return useMutation({
    mutationFn: ({ dni, password }: LoginVars) =>
      loginService(dni, password),

    onSuccess: async (data, { dni }) => {
      // ✅ Guarda token y dni
      await AsyncStorage.multiSet([
        ['token', data.token],
        ['user_id', data.user_id.toString()]
      ]);

      setIsAuthenticated(true);
    },

    onError: (error: unknown) => {
      // React Query ya pasa el error arriba; aquí podrías
      // lanzar toasts, enviar logs, etc.
      console.error('Login error:', error);
    },
  });  
};