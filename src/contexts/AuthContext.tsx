import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authService } from "../api/rest";

// Tipos para los valores del contexto
interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
  eliminarStorage: () => Promise<void>;
  hasSeenOnboarding: boolean;
  setHasSeenOnboarding: (seen: boolean) => void;
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const checkAuthStatus = async () => {
    try {
      const [seenOnboarding, token] = await Promise.all([
        AsyncStorage.getItem("hasSeenOnboarding"),
        AsyncStorage.getItem("token"),
      ]);

      setHasSeenOnboarding(!!seenOnboarding);

      if (token) {
        await authService(token); // ← si falla, va al catch
        console.log('token valido');
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
        if (error.message === "UNAUTHORIZED") {
          console.log("Token inválido o expirado");
          await AsyncStorage.removeItem("token");
        } else {
          console.error("Error al verificar autenticación:", error.message);
        }

      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  checkAuthStatus();
}, []);

  const eliminarStorage = async () => {
    await AsyncStorage.multiRemove(["token", "dni"]);
    setIsAuthenticated(false);
    setHasSeenOnboarding(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        eliminarStorage,
        hasSeenOnboarding,
        setHasSeenOnboarding,
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
