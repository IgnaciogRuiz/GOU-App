import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
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
  token: string | null;
  setToken: (token: string | null) => Promise<void>;
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
  const [token, _setToken] = useState<string | null>(null);

  // Setter que guarda y elimina en AsyncStorage automáticamente
  const setToken = async (newToken: string | null) => {
    if (newToken) {
      await AsyncStorage.setItem("token", newToken);
    } else {
      await AsyncStorage.removeItem("token");
    }
    _setToken(newToken);
  };

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
          await authService(storedToken); // si falla, va al catch
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
        } else {
          console.error("Error al verificar autenticación:", (error as any).message);
        }

        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const eliminarStorage = async () => {
    await AsyncStorage.multiRemove(["token", "user_id", "dni"]);
    setIsAuthenticated(false);
    setHasSeenOnboarding(false);
    await setToken(null);
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
        token,
        setToken,
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
