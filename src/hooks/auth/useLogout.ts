// src/hooks/useLogout.ts
import { useMutation } from '@tanstack/react-query';
import { logoutService } from '../../api/rest';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../contexts/AuthContext';

export const useLogout = () => {
  const { setIsAuthenticated, setHasSeenOnboarding } = useAuth();

  return useMutation({
    mutationFn: logoutService,
    onSuccess: async () => {
      await AsyncStorage.multiRemove(['userToken', 'biometricEnabled', 'dni']);
      setIsAuthenticated(false);
    },
    onError: (error) => {
      console.error("Logout error:", error);
    },
  });
};