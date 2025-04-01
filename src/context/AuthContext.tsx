import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginService, logoutService } from "../api/services/authService";
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

    const login = async (dni: string, password: string) => {
        try {
            const data = await loginService(dni, password);
            await AsyncStorage.setItem("userToken", data.token);
            setIsAuthenticated(true);
        } catch (error) {
            throw error; 
        }
    };

    const logout = async () => {
        try {
            const data = await logoutService();
            await AsyncStorage.removeItem("userToken");
            setIsAuthenticated(false);
            await AsyncStorage.removeItem("biometricEnabled");
            setBiometricEnabled(false);
        } catch (error) {
            throw error; 
        }

    };

    const eliminarStorage = async () => {
        try {
            await AsyncStorage.removeItem("userToken");
            setIsAuthenticated(false);
        } catch (error) {
            throw error; 
        }

    };

    const enableBiometrics = async () => {
        await AsyncStorage.setItem("biometricEnabled", "true");
        setBiometricEnabled(true);
    };
    
    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, eliminarStorage, enableBiometrics, hasSeenOnboarding, setHasSeenOnboarding, biometricEnabled }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);