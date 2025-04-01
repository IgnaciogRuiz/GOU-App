import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login } from "../api/services/authService";
import * as LocalAuthentication from "expo-local-authentication";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
    const [biometricEnabled, setBiometricEnabled] = useState(false);

    useEffect(() => {
        const checkAuthStatus = async () => {
            const seenOnboarding = await AsyncStorage.getItem("hasSeenOnboarding");
            setHasSeenOnboarding(!!seenOnboarding);

            const userToken = await AsyncStorage.getItem("userToken");
            setIsAuthenticated(!!userToken);

            const biometric = await AsyncStorage.getItem("biometricEnabled");
            setBiometricEnabled(biometric === "true");
        };
        checkAuthStatus();
    }, []);

    const loginUser = async (dni: string, password: string) => {
        try {
            const data = await login(dni, password);
            await AsyncStorage.setItem("userToken", data.token);
            setIsAuthenticated(true);
        } catch (error) {
            throw error; // Permite manejar el error en el componente
        }
    };

    const logout = async () => {
        await AsyncStorage.removeItem("userToken");
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, hasSeenOnboarding, setHasSeenOnboarding, biometricEnabled }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);