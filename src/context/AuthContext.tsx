import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginService, logoutService, authService } from "../api/services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [loading, setLoading] = useState(true); // 👈 Estado de carga inicial

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
        setBiometricEnabled(biometric === "true");
      } catch (error) {
        console.error("Error loading auth status:", error);
      } finally {
        setLoading(false); // 👈 Se terminó de cargar
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (dni, password) => {
    const data = await loginService(dni, password);
    await AsyncStorage.setItem("userToken", data.token);
    setIsAuthenticated(true);
  };

  
  const bioAuth = async () => {
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
    await AsyncStorage.multiRemove(["userToken", "biometricEnabled"]);
    setIsAuthenticated(false);
    setBiometricEnabled(false);
  };

  const eliminarStorage = async () => {
    await AsyncStorage.removeItem("userToken");
    setIsAuthenticated(false);
  };

  const enableBiometrics = async () => {
    await AsyncStorage.setItem("biometricEnabled", "true");
    setBiometricEnabled(true);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        login,
        logout,
        bioAuth,
        eliminarStorage,
        enableBiometrics,
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

export const useAuth = () => useContext(AuthContext);
