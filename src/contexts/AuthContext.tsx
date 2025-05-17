import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginService, logoutService, authService } from "../api/services/auth/authService";

// Tipos para los valores del contexto
interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
  login: (dni: string, password: string) => Promise<void>;
  loginWithPassword: (password: string) => Promise<void>;
  logout: () => Promise<void>;
  bioAuth: () => Promise<boolean>;
  eliminarStorage: () => Promise<void>;
  enableBiometrics: () => Promise<void>;
  disableBiometricsForever: () => Promise<void>;
  hasSeenOnboarding: boolean;
  setHasSeenOnboarding: (seen: boolean) => void;
  biometricEnabled: boolean | "never" | null;
  loading: boolean;
}

// Crear contexto con valor inicial nulo
const AuthContext = createContext<AuthContextType | null>(null);

// Props para el proveedor del contexto
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState<boolean | "never" | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const [seenOnboarding, userToken, biometric] = await Promise.all([
          AsyncStorage.getItem("hasSeenOnboarding"),
          AsyncStorage.getItem("userToken"),
          AsyncStorage.getItem("biometricEnabled"),
        ]);

        setHasSeenOnboarding(!!seenOnboarding);
        setIsAuthenticated(!!userToken);
        setBiometricEnabled(
          biometric === "true" ? true : biometric === "never" ? "never" : false
        );
      } catch (error) {
        console.error("Error loading auth status:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (dni: string, password: string) => {
    const data = await loginService(dni, password);
    await AsyncStorage.setItem("userToken", data.token);
    await AsyncStorage.setItem("dni", dni);
    setIsAuthenticated(true);
  };

  const loginWithPassword = async (password: string) => {
    try {
      const dni = await AsyncStorage.getItem("dni");
      if (!dni) throw new Error("DNI no encontrado en almacenamiento.");

      const data = await loginService(dni, password);
      await AsyncStorage.setItem("userToken", data.token);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error en loginWithPassword:", error);
      throw error;
    }
  };

  const bioAuth = async (): Promise<boolean> => {
    try {
      const biometricToken = await AsyncStorage.getItem("userToken");
      if (!biometricToken) throw new Error("No hay token guardado");

      const user = await authService(biometricToken);
      if (user) {
        setIsAuthenticated(true);
        return true;
      } else {
        throw new Error("Usuario inválido");
      }
    } catch (error) {
      console.error("Error en bioAuth:", error);
      setIsAuthenticated(false);
      return false;
    }
  };

  const logout = async () => {
    await logoutService();
    await AsyncStorage.multiRemove(["userToken", "biometricEnabled", "dni"]);
    setIsAuthenticated(false);
    setBiometricEnabled(false);
  };

  const eliminarStorage = async () => {
    await AsyncStorage.multiRemove(["userToken", "biometricEnabled", "dni"]);
    setIsAuthenticated(false);
    setHasSeenOnboarding(false);
    setBiometricEnabled(null);
  };

  const enableBiometrics = async () => {
    await AsyncStorage.setItem("biometricEnabled", "true");
    setBiometricEnabled(true);
  };

  const disableBiometricsForever = async () => {
    await AsyncStorage.setItem("biometricEnabled", "never");
    setBiometricEnabled("never");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        login,
        loginWithPassword,
        logout,
        bioAuth,
        eliminarStorage,
        enableBiometrics,
        disableBiometricsForever,
        hasSeenOnboarding,
        setHasSeenOnboarding,
        biometricEnabled,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
};
