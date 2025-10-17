import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authService } from "../api/rest";
import { useHomeData } from "../hooks";
import { Loader } from "../components";

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
  token: string | null;
  setToken: (token: string | null) => Promise<void>;
  user: any | null;
  setUser: (user: any | null) => void;
  eliminarStorage: () => Promise<void>;
  loading: boolean;
  hasSeenOnboarding: boolean;
  completeOnboarding: () => Promise<void>;
  setHasSeenOnboarding: (seen: boolean) => void;
  dashboardData: any | null;
  homeError: any | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, _setToken] = useState<string | null>(null);
  const [user, _setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);

  // Hook independiente que obtiene datos de home/dashboard
  const { dashboardData, loading: homeLoading, error: homeError } = useHomeData(token);

  // Setter de token que guarda en AsyncStorage
  const setToken = async (newToken: string | null) => {
    if (newToken) {
      await AsyncStorage.setItem("token", newToken);
    } else {
      await AsyncStorage.removeItem("token");
    }
    _setToken(newToken);
  };

  // Setter de user que guarda también en AsyncStorage
  const setUser = async (newUser: any | null) => {
    if (newUser) {
      await AsyncStorage.setItem("user", JSON.stringify(newUser));
    } else {
      await AsyncStorage.removeItem("user");
    }
    _setUser(newUser);
  };

  // Inicializar auth y user desde AsyncStorage
  useEffect(() => {
    const initAuth = async () => {
      try {
        const [storedToken, storedUser, seenOnboarding] = await Promise.all([
          AsyncStorage.getItem("token"),
          AsyncStorage.getItem("user"),
          AsyncStorage.getItem("hasSeenOnboarding"),
        ]);

        setHasSeenOnboarding(!!seenOnboarding);

        if (storedToken) {
          await setToken(storedToken);

          let parsedUser = storedUser ? JSON.parse(storedUser) : null;

          if (!parsedUser) {
            // Si no tenemos user guardado, pedir al backend /me
            const response = await authService(storedToken);
            parsedUser = response.data.user;
          }

          await setUser(parsedUser);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.log("Error iniciando auth:", error);
        await AsyncStorage.multiRemove(["token", "user"]);
        _setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const eliminarStorage = async () => {
    await AsyncStorage.multiRemove(["token", "user"]);
    setIsAuthenticated(false);
    await setToken(null);
    await setUser(null);
    setHasSeenOnboarding(false);
  };

  const completeOnboarding = async () => {
    await AsyncStorage.setItem("hasSeenOnboarding", "true");
    setHasSeenOnboarding(true);
  };

  const stillLoading = loading || (isAuthenticated && homeLoading);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        token,
        setToken,
        user,
        setUser,
        eliminarStorage,
        loading: stillLoading,
        hasSeenOnboarding,
        completeOnboarding,
        setHasSeenOnboarding,
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
