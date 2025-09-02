// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authService } from "../api/rest";
import { useHomeData } from "../hooks";
import { Loader } from "../components";

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
  eliminarStorage: () => Promise<void>;
  hasSeenOnboarding: boolean;
  completeOnboarding: () => Promise<void>;  // 👈 nuevo
  setHasSeenOnboarding: (seen: boolean) => void;
  loading: boolean;
  token: string | null;
  setToken: (token: string | null) => Promise<void>;
  dashboardData: any | null;
  homeError: any | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
  const [loading, setLoading] = useState(true);
  const [token, _setToken] = useState<string | null>(null);

  const setToken = async (newToken: string | null) => {
    if (newToken) {
      await AsyncStorage.setItem("token", newToken);
    } else {
      await AsyncStorage.removeItem("token");
    }
    _setToken(newToken);
  };

  // ✅ hook independiente que ahora podemos usar sin ciclo
  const { dashboardData, loading: homeLoading, error: homeError } = useHomeData(token);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const [seenOnboarding, storedToken] = await Promise.all([
          AsyncStorage.getItem("hasSeenOnboarding"),
          AsyncStorage.getItem("token"),
        ]);

        setHasSeenOnboarding(!!seenOnboarding);
        await setToken(storedToken);

        if (storedToken) {
          await authService(storedToken);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        if (
          (error as any).message?.includes("UNAUTHORIZED") ||
          (error as any).status === 401
        ) {
          console.log("Token inválido o expirado");
          await AsyncStorage.removeItem("token");
        }
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const eliminarStorage = async () => {
    await AsyncStorage.multiRemove(["token"]);
    setIsAuthenticated(false);
    setHasSeenOnboarding(false);
    await setToken(null);
  };

  const completeOnboarding = async () => {
  await AsyncStorage.setItem("hasSeenOnboarding", "true");
  setHasSeenOnboarding(true);
};


  // 👇 Loader global: espera auth + home
  const stillLoading = loading || (isAuthenticated && homeLoading);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        eliminarStorage,
        hasSeenOnboarding,
        completeOnboarding,
        setHasSeenOnboarding,
        loading: stillLoading,
        token,
        setToken,
        dashboardData,
        homeError,
      }}
    >
      {stillLoading ? <Loader /> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
};
